# using latest node, v11.x
FROM node:latest

# tendermint version (duh)
ENV TENDERMINT_VERSION=0.29.0

# set homedir
WORKDIR /usr/src/paradigmcore

# copy source
COPY package.json ./
COPY yarn.lock ./
COPY . .
COPY docker/testnet.env ./.env
    
# install global and package deps
RUN yarn global add node-gyp scrypt typescript
RUN yarn

# copy blind-star test-net genesis file and node config
COPY docker/testnet.config.toml ./lib/tendermint/config/config.toml
COPY docker/testnet.genesis.json ./lib/tendermint/config/genesis.json

# build source to executable js
RUN yarn build

# log the node's public key 
RUN echo && echo "~~~~~~~~ NODE KEY BELOW ~~~~~~~~" && \
    cat ./lib/tendermint/config/priv_validator_key.json && \
    echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" && echo 

# allow API traffic
EXPOSE 4242
EXPOSE 4243

# normal start command
CMD ["yarn", "start"]