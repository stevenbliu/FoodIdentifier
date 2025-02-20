# food_identifier/ml.py
import random
import os
# from clarifai.rest import Image as ClImage
# from clarifai.rest import ClarifaiApp
# from clarifai.client.model import Model
from io import BytesIO
import logging

logger = logging.getLogger(__name__)

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
    logger.info(f"Running food API with image: {image}")
    # Initialize ClarifaiApp with your Personal Access Token
    logger.info(f"CLARIFAI_PAT: {CLARIFAI_PAT}")
    
    if not CLARIFAI_PAT:
        raise ValueError("Clarifai Personal Access Token (CLARIFAI_PAT) is not set.")
    clarifai_app = ClarifaiApp(api_key=str(CLARIFAI_PAT))
    logger.info(f"ClarifaiApp: {clarifai_app}")
    # Use the Food Model from Clarifai
    model = clarifai_app.public_models.food_model
    logger.info(f"Model: {model}")
    # Read image bytes and wrap it in a BytesIO object for Clarifai
    image_bytes = image.read()
    clarifai_image = ClImage(file_obj=BytesIO(image_bytes))  # Wrap image bytes in a BytesIO object
    logger.info(f"Image: {clarifai_image}")
    # Run prediction
    model_prediction = model.predict([clarifai_image])
    logger.info(f"Prediction: {model_prediction}")
    # Return the prediction results (concepts)
    # return model_prediction['outputs'][0]['data']['concepts']
    return 'dog'

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
    # image_url = "https://s3.amazonaws.com/samples.clarifai.com/featured-models/image-captioning-statue-of-liberty.jpeg"

    # The Predict API also accepts data through URL, Filepath & Bytes.
    # Example for predict by filepath:
    # model_prediction = Model(model_url).predict_by_filepath(filepath, input_type="text")

    # Example for predict by bytes:
    model_prediction = Model(url=model_url, pat=CLARIFAI_PAT).predict_by_bytes(image.read(), input_type="image")

    # model_prediction = Model(url=model_url, pat="CLARIFAI_PAT).predict_by_url(
    #     image_url, input_type="image"
    # )

    # Get the output 
    logger.info([(concept.name, concept.value) for concept in model_prediction.outputs[0].data.concepts[:10]])
    return (model_prediction.outputs[0].data.concepts)[0]


