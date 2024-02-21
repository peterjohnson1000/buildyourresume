FROM node

WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]