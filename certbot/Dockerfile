FROM ubuntu:22.04

EXPOSE 6000:80

ARG DOMAIN_NAME
ARG DOMAIN_URL

ENV DOMAIN_NAME=$DOMAIN_NAME
ENV DOMAIN_URL=$DOMAIN_URL

WORKDIR /certbot
COPY . /certbot
WORKDIR /certbot

RUN apt-get update
RUN apt-get -y install certbot

CMD ["sh", "generate-certificate.sh"]