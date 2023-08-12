FROM node:17
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install bcrypt
COPY . /app
RUN ls /app
RUN ls /app/src
RUN ls /app/src/config
RUN ls /app/src/routes
CMD ["node", "src/server.js"]
