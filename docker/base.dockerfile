# using latest node, v11.x
FROM node:latest

# tendermint version (duh)
ENV TENDERMINT_VERSION=0.29.0

# set homedir
WORKDIR /usr/src/paradigmcore

# copy source
COPY . .

# install global and package deps
RUN yarn global add node-gyp scrypt typescript
RUN yarn

# copy template environment file (optional)
COPY docker/base.env ./.env

# build source to executable js
RUN yarn build

# allow API traffic
EXPOSE 4242
EXPOSE 4243

# normal start command
CMD ["yarn", "launch"]