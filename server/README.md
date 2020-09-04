# Tutorin Server

## Getting Started
1. Get SDK Ready https://cloud.google.com/sdk/docs
2. Install Dependencies: pip install -r requirements.txt

## Running locally
To run locally, you need to use gunicorn with the ``flask_socket`` worker:

    $ gunicorn -b 127.0.0.1:8080 -k flask_sockets.worker main:app
