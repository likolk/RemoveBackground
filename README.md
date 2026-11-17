# RemoveBackground

A small web app that removes the background from any image. Upload a picture and get back a transparent PNG.

## How it works

- **Flask** serves the pages and the upload endpoint.
- **rembg** does the background removal, with **Pillow** handling the image files.
- Processed images are saved under `static/output_images/` and shown next to the originals.

## Run it locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

Then open http://localhost:5000.

## Run it with Docker

```bash
docker build -t remove-background .
docker run -p 5000:5000 remove-background
```

## Project structure

| Path | What it holds |
| --- | --- |
| `app.py` | Flask routes: home, upload, image list, about, pricing, contact |
| `templates/` | HTML pages |
| `static/` | CSS, JavaScript, sample input and output images |
| `Dockerfile` | Container setup |
