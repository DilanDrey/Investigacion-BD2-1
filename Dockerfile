FROM node:22

WORKDIR /api
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000

CMD ["npm", "run","dev"]


