FROM python:3.12

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install rembg
RUN pip install flask
RUN pip install Pillow

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]

