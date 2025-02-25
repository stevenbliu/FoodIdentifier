package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search"

type USDAResponse struct {
	Foods []struct {
		Description   string `json:"description"`
		FoodNutrients []struct {
			NutrientName string  `json:"nutrientName"`
			Value        float64 `json:"value"`
			UnitName     string  `json:"unitName"`
		} `json:"foodNutrients"`
	} `json:"foods"`
}

type NutritionalData struct {
	FoodName      string
	Calories      float64
	Carbohydrates float64
	Proteins      float64
	Fats          float64
}

func fetchFoodNutrition(foodName string) (*USDAResponse, error) {
	// Load the .env file
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	// Fetch USDA API Key from the .env file
	apiKey := os.Getenv("USDA_API_KEY")
	if apiKey == "" {
		log.Fatal("USDA API key is not set in .env file")
	}

	url := fmt.Sprintf("%s?query=%s&api_key=%s", USDA_API_URL, foodName, apiKey)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result USDAResponse
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func getNutritionHandler(c *gin.Context) {
	foodName := c.Param("food")
	data, err := fetchFoodNutrition(foodName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch data"})
		return
	}

	if len(data.Foods) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No food data found"})
		return
	}

	// Extract the first food item (assuming we are only interested in the first result)
	foodItem := data.Foods[0]

	// Map the USDA data to the struct for template rendering
	nutritionalData := NutritionalData{
		FoodName:      foodItem.Description,
		Calories:      0, // Find and set real values based on your USDA API response
		Carbohydrates: 0, // Set values
		Proteins:      0, // Set values
		Fats:          0, // Set values
	}

	// Populate nutritionalData based on the USDA response
	for _, nutrient := range foodItem.FoodNutrients {
		switch nutrient.NutrientName {
		case "Energy":
			nutritionalData.Calories = nutrient.Value
		case "Carbohydrate, by difference":
			nutritionalData.Carbohydrates = nutrient.Value
		case "Protein":
			nutritionalData.Proteins = nutrient.Value
		case "Total lipid (fat)":
			nutritionalData.Fats = nutrient.Value
		}
	}

	dir, err := os.Getwd()
	if err != nil {
		log.Fatal("Error getting current working directory: ", err)
	}
	log.Println("Current working directory:", dir)

	// Parse and render the template with the nutritional data
	tmpl, err := template.ParseFiles("templates/nutritional_data.html")
	if err != nil {
		log.Println("Template parse error:", err) // Print the detailed error
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error parsing template"})
		return
	}
	// Execute the template and send the HTML response
	err = tmpl.Execute(c.Writer, nutritionalData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error rendering template"})
	}
}

func main() {
	// Set up Gin router
	router := gin.Default()

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "OK"})
	})

	// Nutrition data endpoint
	router.GET("/nutrition/:food", getNutritionHandler)

	// Run the Gin server on port 8080
	router.Run(":8080")
}
