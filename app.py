from flask import Flask, render_template, request, jsonify
from rembg import remove
from PIL import Image
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'static/input_images'
OUTPUT_FOLDER = 'static/output_images'

@app.route('/')
def index():
    return render_template('website.html')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'})
        if file:
            input_image = os.path.join(UPLOAD_FOLDER, file.filename)
            output_image = os.path.join(OUTPUT_FOLDER, file.filename)
            file.save(input_image)  
            input_img = Image.open(input_image)
            output_img = remove(input_img)
            output_img = output_img.convert("RGB")
            output_img.save(output_image)
            output_image_url = 'static/output_images/' + file.filename
            return jsonify({'output_image': output_image_url, 'message': 'File uploaded successfully'})
    return jsonify({'error': 'Error occurred during file upload'})


@app.route('/images', methods=['GET'])
def get_images():
    input_images = os.listdir(UPLOAD_FOLDER)
    output_images = os.listdir(OUTPUT_FOLDER)
    input_images_url = ['static/input_images/' + img for img in input_images]
    output_images_url = ['static/output_images/' + img for img in output_images]
    return jsonify({'input_images': input_images_url, 'output_images': output_images_url})

if __name__ == '__main__':
    app.run(debug=True)
