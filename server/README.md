# Tutorin Server

## Getting Started
1. Get SDK Ready https://cloud.google.com/sdk/docs
2. Install Dependencies: pip install -r requirements.txt

## Running locally
To run locally, you need to use gunicorn with the ``flask_socket`` worker:

    $ gunicorn --worker-class eventlet -w 1 main:app

## Deployment
- gcloud app deploy
- To increase the timeout do cloud config set app/cloud_build_timeout [NUMBER OF SECONDS]
