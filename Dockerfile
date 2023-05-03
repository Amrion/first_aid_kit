FROM ubuntu:latest
LABEL authors="ubuntu"

WORKDIR /home

COPY . .

RUN apt update
RUN apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt install -y nodejs
RUN apt install -y aptitude
RUN aptitude install -y npm

RUN npm install
EXPOSE 8080/tcp
CMD ["npm", "start"]