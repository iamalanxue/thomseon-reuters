from flask import Flask, render_template, send_file, flash, request, redirect, url_for, send_from_directory
from datetime import datetime
import platform
import os
import csv 
import json
from flask_cors import CORS

app = Flask(__name__) 
SECRET_KEY = 'super_secret_key'
app.config['SECRET_KEY'] = SECRET_KEY

@app.route("/")
def index():
  return "Hello World"

@app.route("/about")
def about():
  return "<h1> About </h1>"

@app.route("/upload", methods=['GET', 'POST'])
def upload_file():
  print('its working')
  if request.method == 'POST':
    print(request.files['fileName'])
    # check if the post request has the file part
    if 'fileName' not in request.files:
      print('NO FILES')
      flash('No file part')
      return redirect(request.url)
    file = request.files['fileName']
    print("FILENAME BBY", file.filename)
  return "YOLO"

if __name__ == "__main__":
  app.run(debug=True)