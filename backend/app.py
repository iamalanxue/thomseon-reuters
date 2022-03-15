from flask import Flask, render_template, send_file, flash, request, redirect, url_for, send_from_directory
from datetime import datetime
import platform
import os
import csv 
import json
from flask_cors import CORS

app = Flask(__name__, instance_relative_config=True)
CORS(app) 
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
  if request.method == 'POST':
    print(request.files)
    # check if the post request has the file part
    if 'file' not in request.files:
      print('NO FILES')
      # flash('No file part')
      return redirect(request.url)
    file = request.files['file']
    # print("FILENAME BBY", file.filename)
    # print(os.getcwd())
    join_to_static_dir = lambda x: os.path.join("static", x)
    download_filename = join_to_static_dir(file.filename)
    with open(download_filename, 'w', newline="") as f:
        f.write(file.read().decode("utf-8"))
            
    output_filepath = join_to_static_dir("out.csv")
  return "YOLO"

if __name__ == "__main__":
  app.run(debug=True)