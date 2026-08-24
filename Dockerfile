FROM node:20-alpine

WORKDIR /app

# Copy package configuration and install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema & generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy all source code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
