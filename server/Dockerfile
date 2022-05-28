FROM node:14-alpine
ENV NODE_ENV production

# https://stackoverflow.com/a/66795351
RUN npm i -g nodemon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY server/package.json .
COPY server/package-lock.json .
RUN npm ci
COPY server/ .

# html-pdf and phantomjs error
# https://github.com/marcbachmann/node-html-pdf/issues/612#issuecomment-854249720
# ghostscript-fonts needed to render text
# https://github.com/marcbachmann/node-html-pdf/issues/76#issuecomment-413094726
ENV PHANTOMJS_VERSION=2.1.1
ENV PHANTOMJS_PATH=/usr/local/bin/phantomjs
RUN apk update && apk add --no-cache fontconfig curl curl-dev ghostscript-fonts && \
  cd /tmp && curl -Ls https://github.com/dustinblackman/phantomized/releases/download/${PHANTOMJS_VERSION}/dockerized-phantomjs.tar.gz | tar xz && \
  cp -R lib lib64 / && \
  cp -R usr/lib/x86_64-linux-gnu /usr/lib && \
  cp -R usr/share /usr/share && \
  cp -R etc/fonts /etc && \
  curl -k -Ls https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-${PHANTOMJS_VERSION}-linux-x86_64.tar.bz2 | tar -jxf - && \
  cp phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs

EXPOSE 5000
CMD ["npm", "run", "start"]
