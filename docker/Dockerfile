# using latest node, v11.x
FROM node:latest

# tendermint version (duh)
ENV TENDERMINT_VERSION=0.29.0

# set homedir
WORKDIR /usr/src/paradigmcore

# copy source
COPY package.json ./
COPY yarn.lock ./
COPY Docker.env .env
COPY . .

# install deps
RUN yarn global add node-gyp scrypt typescript
RUN yarn

# build source to executable js
RUN yarn build

# update tendermint binary for correct architecture
RUN node ./lib/tendermint/bin/download.js ${TENDERMINT_VERSION}

# ensure chain is in genesis state
RUN yarn reset

# allow API traffic
EXPOSE 4242
EXPOSE 4243

# normal start command
CMD ["yarn", "start"]