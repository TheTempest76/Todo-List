FROM node:14
WORKDIR /backend/
RUN npm install
EXPOSE 3000
CMD [ "npm","run","start"]
