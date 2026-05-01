FROM node:alpine as builder

# Define the build argument
ARG VITE_API_BASE_URL

# Set it as an environment variable for the build process
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Vite will now 'bake' the value of VITE_API_BASE_URL into the JS bundle
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
