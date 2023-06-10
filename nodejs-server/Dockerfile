FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install --force

EXPOSE 3307

CMD ["npm", "run", "start"]
