FROM node:17
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install bcrypt
RUN npm install -g esm
COPY . /app
CMD ["node", "src/server.js"]
