FROM node:16.17-alpine
WORKDIR /cleolist_frontend
COPY . .
RUN npm run build