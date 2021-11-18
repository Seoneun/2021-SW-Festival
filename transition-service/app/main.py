import uvicorn
from fastapi import FastAPI
import tensorflow_hub as hub
import tensorflow as tf
from matplotlib import pyplot as plt
import numpy as np
import cv2


app = FastAPI()

def load_image(img_path):
    img = tf.io.read_file(img_path)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    img = img[tf.newaxis, :]
    return img 

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api/transition")
def read_root():
    return {"Hello": "nginx success"}



@app.get("/api/transition")
async def root():

    # https://stackoverflow.com/questions/53450466/how-tensorflow-read-file-from-s3-bytestream 
    # content_image, style_image 를 s3 버킷 주소로
    model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2') 
    content_image = load_image('./img/original.jpeg')
    style_image = load_image('./img/style.jpg')
    plt.imshow(np.squeeze(style_image))
    stylized_image = model(tf.constant(content_image),tf.constant(style_image))[0]
    plt.imshow(np.squeeze(stylized_image))
    cv2.imwrite('./styled.png', cv2.cvtColor(np.squeeze(stylized_image)*255, cv2.COLOR_BGR2RGB))
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)