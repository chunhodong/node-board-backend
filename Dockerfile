FROM node:12.13.1

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

ENV NODE_ENV devolopment

EXPOSE 3000 80

CMD ["npm","start"]