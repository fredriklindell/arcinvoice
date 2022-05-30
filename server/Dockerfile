FROM node:14-alpine
ENV NODE_ENV production

# https://stackoverflow.com/a/66795351
RUN npm i -g nodemon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install headless chrom(e/ium) dependencies
# https://www.koyeb.com/tutorials/deploy-a-web-scraper-using-puppeteer-node-and-docker
RUN apk update && apk add --no-cache nmap && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
  echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
  apk update && \
  apk add --no-cache \
  chromium \
  harfbuzz \
  "freetype>2.8" \
  ttf-freefont \
  nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV IS_DOCKER=true

COPY server/package.json .
COPY server/package-lock.json .
RUN npm ci
COPY server/ .

EXPOSE 5000
CMD ["npm", "run", "start"]
