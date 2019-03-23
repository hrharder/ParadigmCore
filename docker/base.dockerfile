# using latest node, v11.x
FROM node:latest

# tendermint version (duh)
ENV TENDERMINT_VERSION=0.29.0

# set homedir
WORKDIR /usr/src/paradigmcore

# copy source
COPY . .

# copy default environment config for docker container
COPY docker/base.env ./.env
    
# install global and package deps
RUN yarn global add node-gyp scrypt typescript
RUN yarn

# compile source files
RUN yarn build

# allow API traffic
EXPOSE 4242
EXPOSE 4243

CMD ["yarn", "launch"]