FROM node:10 as build-stage

# Create app directory
WORKDIR /app

# Copy source code to image
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

RUN npm run build



FROM nginx:1.15-alpine
WORKDIR /app
EXPOSE 80
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
