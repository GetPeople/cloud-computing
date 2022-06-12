# from base image node
FROM node:14-alpine

WORKDIR /usr/src/app

# copy oter files as well
COPY . .

# run
RUN npm install

#expose the port
EXPOSE 8080

# command to run when intantiate an image
CMD ["node", "index.js"]