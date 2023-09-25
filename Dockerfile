FROM node:14
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install
EXPOSE 8000
CMD ["npm","start"]