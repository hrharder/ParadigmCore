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

# copy template environment file
COPY docker/testnet/testnet.env ./.env

# copy blind-star test-net genesis file and seed node config
COPY docker/testnet/genesis.json ./lib/config/genesis.json
COPY docker/testnet/testnet.config.toml ./lib/config/config.toml

# build source to executable js
RUN yarn build

######

# config
ENV VERSION="0.31.1\n"
ENV SHASUMS="969be4b40652ae5b2b89269ebd6e5528327b86a52ee72f7a90cf57d8c7ecec09 tendermint_0.31.1_linux_amd64.zip\n454b6c02b1c21e63d69129ed4936b6f6875171a213c28dd98d8d7c5bcec77969 tendermint_0.31.1_darwin_amd64.zip\n7ada3b24624363472cbc0743f1ab88fdd0e21f8d3085e324c332bd66fb7d6c44 tendermint_0.31.1_windows_amd64.zip\n"

# remove old files in tendermint-node/bin
RUN rm node_modules/tendermint-node/bin/version
RUN rm node_modules/tendermint-node/bin/SHA256SUMS

# create new files with updated info
RUN bash -c 'echo -e $VERSION > node_modules/tendermint-node/bin/version'
RUN bash -c 'echo -e $SHASUMS > node_modules/tendermint-node/bin/SHA256SUMS'

# update tendermint, assumes root directory of node project with ./node_modules present
RUN /usr/bin/env node node_modules/tendermint-node/bin/download.js $VERSION

######

# allow API traffic
EXPOSE 4242
EXPOSE 4243

# normal start command
CMD ["yarn", "launch"]