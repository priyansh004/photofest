# Use an official Node.js runtime as the base image
FROM node:18

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN pnpm install

# Copy the rest of the project files to the container
COPY . .

# Build the React app
RUN pnpm run build

# Expose the port that the app will run on
EXPOSE 5173

# Define the command to run the app when the container starts
CMD ["pnpm", "run", "dev"]
