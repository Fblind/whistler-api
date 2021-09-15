# Start with node12 image
FROM node:12-slim
# Expose the port 3000 from the container to the host
EXPOSE 3001
# create a folder app and add permissions to the user node (already created by the image)
RUN mkdir /app && chown -R node:node /app
# set the working directory
WORKDIR /app
# set the user that will be used in the following lines
USER node
# copy package related files from host to the container adding permissions to the node user
COPY --chown=node:node package.json package-lock*.json ./
# run npm things
RUN npm install && npm cache clean --force
# copy all the host's files into the container
COPY --chown=node:node . .
# start the image running the following command
CMD ["npm", "run", "start:production"]


# How to run:
# Build the image => docker build -t kdb-image .
# Run the image => docker run -d --rm -p 3001:3001 --name kdb-api kdb-image
# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongo4.4

