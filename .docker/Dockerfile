
FROM node:fermium-buster as node
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build
# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/get-it /usr/share/nginx/html
