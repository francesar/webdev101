from flask import Flask, request, jsonify
import requests as r
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
  return 'hello'

@app.route('/meme', methods=['POST'])
@cross_origin()
def handleMemeCreate():

  data = request.json
  print("This is the data that we're getting from the frontend", data)

  # URL that we are going to hit with a post request
  REQUEST_URL = "https://api.imgflip.com/caption_image"

  # Imgflip API says that we have to use an account
  data['username'] = "imgflip_hubot"
  data['password'] = "imgflip_hubot"
  
  # python package that lets us post stuff really easily 
  resp = r.post(REQUEST_URL, data=data)

  # return the response from Imgflip to our front end
  return jsonify(resp.json())


if __name__ == '__main__':
  app.run(port=8000)