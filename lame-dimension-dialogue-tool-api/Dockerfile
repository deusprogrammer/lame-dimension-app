FROM node:17
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install bcrypt
RUN npm install -g nodemon esm
COPY . /app
CMD ["nodemon", "-r", "esm", "src/server.js"]