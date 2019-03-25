# using latest node, v11.x
FROM node:latest

# tendermint version (duh)
ENV TENDERMINT_VERSION=0.29.0

# set homedir
WORKDIR /usr/src/paradigmcore

# copy source
COPY . .

# copy blind-star test-net genesis file and seed node config
COPY docker/testnet/genesis.json ./lib/tendermint/config/genesis.json
COPY docker/testnet/seed.config.toml ./lib/tendermint/config/config.toml
COPY docker/testnet/seed.env ./.env
    
# install global and package deps
RUN yarn global add node-gyp scrypt typescript
RUN yarn

# build source to executable js
RUN yarn build

# allow API traffic
EXPOSE 4242
EXPOSE 4243

# normal start command
CMD ["yarn", "launch"]