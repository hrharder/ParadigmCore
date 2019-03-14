# using latest node, v11.x
FROM node:latest

# tendermint version (duh)
ENV TENDERMINT_VERSION=0.29.0

# net path to current genesis file
ENV GENESIS_PATH=https://raw.githubusercontent.com/ParadigmFoundation/blind-star-testnet/master/genesis.json

# set homedir
WORKDIR /usr/src/paradigmcore

# copy source
COPY package.json ./
COPY yarn.lock ./
COPY docker/Docker.testnet.env .env
COPY . .

# install deps
RUN yarn global add node-gyp scrypt typescript
RUN yarn

# build source to executable js
RUN yarn build

# update tendermint binary for correct architecture
RUN node ./lib/tendermint/bin/download.js ${TENDERMINT_VERSION}

# get genesis file for correct test network
RUN curl ${GENESIS_PATH} > ./lib/tendermint/config/genesis.json

# ensure chain is in genesis state
RUN yarn reset

# allow API traffic
EXPOSE 4242
EXPOSE 4243

# normal start command
CMD ["yarn", "start"]