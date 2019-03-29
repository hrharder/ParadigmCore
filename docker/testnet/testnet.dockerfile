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

RUN bash <(curl https://gist.githubusercontent.com/hrharder/ff46b732f4978d5dd1323c857419a212/raw/be3b4126f1a5eded6a9cc104dd49aceaff6060b3/update-tendermint.sh)

# allow API traffic
EXPOSE 4242
EXPOSE 4243

# normal start command
CMD ["yarn", "launch"]