# --- Stage 1: Build the app ---
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Declare ARG and map to ENV for Vite
ARG VITE_CONTACTFORM_API_URL
ENV VITE_CONTACTFORM_API_URL=$VITE_CONTACTFORM_API_URL

# Build the app for production
RUN npm run build

# --- Stage 2: Serve the app 
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
