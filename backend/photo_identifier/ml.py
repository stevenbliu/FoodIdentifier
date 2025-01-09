# food_identifier/ml.py
import random
import os

CLARIFAI_PAT = os.getenv("CLARIFAI_PAT")

def run_food_model(image_path):
    """
    Mock ML function to simulate food identification.
    Replace this with your actual ML model inference logic.
    """
    labels = ['Pizza', 'Burger', 'Salad', 'Pasta', 'Sushi']
    prediction = {
        'label': random.choice(labels),
        'confidence': random.uniform(0.6, 0.99)
    }
    return prediction

def run_food_api(image):
    from clarifai.client.model import Model

    # Your PAT (Personal Access Token) can be found in the Account's Security section
    # Specify the correct user_id/app_id pairings
    # Since you're making inferences outside your app's scope
    #USER_ID = "clarifai"
    #APP_ID = "main"

    # You can set the model using model URL or model ID.
    # Change these to whatever model you want to use
    # eg : MODEL_ID = "general-english-image-caption-blip"
    # You can also set a particular model version by specifying the  version ID
    # eg: MODEL_VERSION_ID = "cdb690f13e62470ea6723642044f95e4"
    #  Model class objects can be inititalised by providing its URL or also by defining respective user_id, app_id and model_id

    # eg : model = Model(user_id="clarifai", app_id="main", model_id=MODEL_ID)

    model_url = (
        "https://clarifai.com/clarifai/main/models/food-item-recognition"
    )
    image_url = "https://s3.amazonaws.com/samples.clarifai.com/featured-models/image-captioning-statue-of-liberty.jpeg"

    # The Predict API also accepts data through URL, Filepath & Bytes.
    # Example for predict by filepath:
    # model_prediction = Model(model_url).predict_by_filepath(filepath, input_type="text")

    # Example for predict by bytes:
    # model_prediction = Model(model_url).predict_by_bytes(image_bytes, input_type="text")

    model_prediction = Model(url=model_url, pat=CLARIFAI_PAT).predict_by_url(
        image_url, input_type="image"
    )

    # Get the output
    return (model_prediction.outputs[0].data.concepts)


