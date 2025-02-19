import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Image,
  Container,
  Grid,
} from "@chakra-ui/react";
import UploadImage from "../../business/FileUpload";
import TestButtons from "../../business/TestButtons";
import FetchPhoto from "../../business/FetchPhoto";
import { useUser } from "../../context/UserContext";
// import SubscribeNotifications from "../SubscribeNotification";
import DashboardCard from "./DashboardCard"; // New component for sections

import { subscribeToNotifications } from "../../business/SubscribeNotification"; // Import function
import { classifyPhoto } from "../../business/ClassifyPhoto"; // Import function
import FileInput from "../Photos/InputFile";

function Dashboard() {
  const { user, logout } = useUser();
  const [imageUrl, setImageUrl] = useState("");
  const [foodInfo, setFoodInfo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // New state to hold selected image
  const [imagePreview, setImagePreview] = useState(null); // To store the preview URL of the image
  const [predictionMessage, setPredictionMessage] = useState("");

  const items = [
    {
      title: "Identify Image",
      component: <FileInput onFileChange={setSelectedImage} predictionMessage={predictionMessage} />,
      onButtonClick: async () => {
        if (selectedImage) {
          const prediction = await classifyPhoto(selectedImage);
          setPredictionMessage(prediction.prediction);
        }
      },
    },
    {
      title: "Upload Your Image",
      component: (
        <UploadImage setImageUrl={setImageUrl} setFoodInfo={setFoodInfo} />
      ),
    },
    {
      title: "Subscribe to Notifications",
      onButtonClick: () => {
        subscribeToNotifications();
      },
    },
    { title: "Test Functions", component: () => <TestButtons /> },
    {
      title: "Fetch Food Info",
      component: () => <FetchPhoto setFoodInfo={setFoodInfo} />,
    },
  ];

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, blue.500, teal.500, cyan.500)"
      borderRadius="xl" // Medium smooth corners
    >
      <Container maxW="7xl" py={10}>
        {/* Header Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={12}
          color="white"
        >
          <VStack align="start">
            <Heading size="xl" textDecoration="underline">
              Hello, {user.username}
            </Heading>
            <Text fontSize="lg">Welcome to your dashboard</Text>
          </VStack>
          <Button colorScheme="gray" size="lg" onClick={logout}>
            Logout
          </Button>
        </Box>

        {/* Main Dashboard Grid */}
        <Box p={6} bg="yellow.500" borderRadius="lg">
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
            gap={6}
          >
            {/* Box Wrapper method */}
            {items.map((item, index) => (
              <Box key={index} borderRadius="lg" boxShadow="md" p={6}>
                <DashboardCard
                  title={item.title}
                  onButtonClick={item.onButtonClick}
                >
                  {item.component}
                </DashboardCard>
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Uploaded Image Display */}
        {selectedImage && (
          <DashboardCard title="Uploaded Image">
            <FileInput />
          </DashboardCard>
        )}

        {/* Food Information Display */}
        {foodInfo && (
          <DashboardCard title="Food Information">
            <Text>
              <strong>Name:</strong> {foodInfo.name}
            </Text>
            <Text>
              <strong>Description:</strong> {foodInfo.description}
            </Text>
          </DashboardCard>
        )}


      </Container>
    </Box>
  );
}

export default Dashboard;
