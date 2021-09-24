FROM python:latest
USER root

ENV APP_PATH=/flask-app
ENV TEMPLATES_PATH=/flask-app/templates
RUN mkdir $APP_PATH
RUN mkdir $TEMPLATES_PATH
ADD ./docker/flask/requirements.txt $APP_PATH
ADD ./sample $APP_PATH
WORKDIR $APP_PATH

RUN pip install -r requirements.txt