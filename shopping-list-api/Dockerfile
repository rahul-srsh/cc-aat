FROM node

# RUN mkdir -p /usr/src/app
WORKDIR /app

# Install Dependencies
COPY package.json .

RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]