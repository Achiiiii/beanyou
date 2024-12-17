FROM ubuntu:22.04
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
  apt-get dist-upgrade -y && \
  apt-get install -y software-properties-common && \
  apt-get update && \
  apt-get install -y tzdata nginx

RUN TZ=Asia/Taipei \
  && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone \
  && dpkg-reconfigure -f noninteractive tzdata


RUN mkdir /app
WORKDIR /app


COPY app.conf /etc/nginx/conf.d/
COPY ./dist/spa /app

ENTRYPOINT bash -c "nginx -g 'daemon off;'"






