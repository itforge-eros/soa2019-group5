FROM node:10.12.0-alpine

WORKDIR /app
# https://stackoverflow.com/a/32785014/232619
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000

CMD ["npm", "run", "prod"]
