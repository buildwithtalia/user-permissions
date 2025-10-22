# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from backend directory
COPY backend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the backend application code
COPY backend/ .

# Expose port 4000
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]
