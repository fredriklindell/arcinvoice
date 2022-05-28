FROM node:14-alpine AS builder
ENV NODE_ENV production

ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_API
ARG REACT_APP_URL
ENV REACT_APP_GOOGLE_CLIENT_ID=${REACT_APP_GOOGLE_CLIENT_ID}
ENV REACT_APP_API=${REACT_APP_API}
ENV REACT_APP_URL=${REACT_APP_URL}

WORKDIR /app

COPY client/package.json .
COPY client/package-lock.json .
RUN npm ci

COPY client .

RUN npm run build


FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html

COPY ./client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
