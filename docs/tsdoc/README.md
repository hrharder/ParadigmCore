
ParadigmCore [`v0.9.0-rc-3`](https://github.com/ParadigmFoundation/ParadigmCore/)
=================================================================================

ParadigmCore is (currently) the reference implementation of the OrderStream, and the first network client. It is built on [Tendermint](https://www.tendermint.com/), which is used for networking and BFT consensus.

This software is in development. While we consider ParadigmCore to be reasonably stable, it should be used with caution in production environments. Paradigm's [core protocol contracts](https://github.com/ParadigmFoundation/ParadigmContracts) are currently only deployed on the Ropsten test-network. No date for a main-net launch of the network has been set.

**Note:** this version of ParadigmCore supports Tendermint versions `v0.31.1`, which it automatically configures on installation.

Jump to...
----------

*   [Reference and documentation](#reference-and-documentation)
*   [Quick start](#quick-start)
    *   [Prerequisites](#prerequisites)
    *   [Clone](#clone)
    *   [Set up environment](#set-up-environment)
    *   [Install dependencies](#install-dependencies)
    *   [Build from source](#build-from-source)
    *   [Start](#start)
    *   [Reset blockchain and state](#reset-blockchain-and-state)
*   [Test](#test)
*   [Run with Docker](#run-with-docker)
*   [Issues and proposals](#issues-and-proposals)
*   [Contributing](#contributing)

Reference and Documentation
---------------------------

For more information about ParadigmCore and the protocol as a whole:

*   Protocol introduction can be [found here](https://docs.paradigm.market/overview)
*   Full documentation [hosted here](https://docs.paradigm.market/paradigmcore), built from [`./docs`](./docs)
*   Client specification documents at [`./spec`](./spec)
*   Hosted version of the [Paradigm whitepaper](https://paradigm.market/whitepaper.pdf) ([source](https://github.com/ParadigmFoundation/whitepaper))
*   Full developers portal coming soon

Quick Start
-----------

Complete install instructions can be found [here](./docs/install.md), and a more in-depth tutorial can be found [here](./docs/tutorial.md).

### Prerequisites

*   [Node.js](https://nodejs.com/) `v10.4` or greater (`bigint` support required)
    *   Grab a recent binary from the official website, or install via package manager.
    *   Make sure you have a recent version of `npm` or `yarn` as well.
*   C/C++ build tools and compiler tool-chain
    *   For macOS, the required tools are [included with XCode](https://developer.apple.com/xcode/features/), or try:
        
        ```shell
        $ xcode-select --install
        ```
        
    *   For GNU/Linux, install `make` and a C++ tool-chain via your package manager. On Darwin-base distros:
        
        ```shell
        $ sudo apt-get update && sudo apt-get upgrade -y
        $ sudo apt-get install -y build-essential
        ```
        
*   Global `node_modules` (issues arise when `package.json` is relied on for these modules)
    
    ```shell
    # npm shown, you can use yarn if you prefer 
    
    $ npm install --global node-gyp
    $ npm install --global scrypt
    ```
    
*   Access to a local (or remote, if necessary) `web3` provider

### Clone

Clone the repository via SSH or HTTPS (specify target directory as well):

```shell
# clone via https
$ git clone https://github.com/ParadigmFoundation/ParadigmCore

# clone via ssh
$ git clone git@github.com:ParadigmFoundation/ParadigmCore 
```

### Set up environment

ParadigmCore is configured though its runtime environment (local environment variables). You can load configuration by `export`ing the required variables to your environment, or create a `.env` file placed at the project root.

A template environment file can be found at [`./lib/template.env`](./lib/template.env).

For details about what variables are required and how to choose a configuration, [click here](./docs/tutorial.md#set-environment-variables).

### Install dependencies

After setting the proper environment variables, run the following to install JavaScript dependencies, as well as run the [`init.js`](./init.js) setup script.

```shell
# with npm
$ npm install

# with yarn
$ yarn install
```

### Build from source

Build the TypeScript source files into executable JS (by default placed at `./dist`) by running the following command.

```shell
# build with npm
npm run build

# build with yarn
yarn build
```

If needed, modify [`tsconfig.json`](./tsconfig.json) to set compiler options.

### Start

Start ParadigmCore by running one of the following. ParadigmCore will intentionally exit if initiated by executing the startup script (`src/index.ts`) directly. If this behavior is desired, you can remove that check from the startup procedure.

```shell
# with npm
$ npm run start

# with yarn
$ yarn start
```

### Reset blockchain and state

Occasionally, you will need to reset the blockchain history. To do so, run the following command.

```shell
# with npm
$ npm run reset

# with yarn
$ yarn reset
```

Test
----

Run the current test suite (only unit tests, currently) with the following command.

```shell
# with npm
$ npm run test

# with yarn
$ yarn test
```

Run with Docker
---------------

A `Dockerfile` is included for convenience. To run ParadigmCore as a docker container, create a `docker.env` file at the repositories root directory, with any normal configuration. Build the image with (run from ParadigmCore directory):

```shell
$ docker build -t paradigmcore .
```

Run the container with one of the following:

```shell
# run in foreground (view log output)
$ docker run paradigmcore

# detach process
$ docker run -d paradigmcore
```

If you wish to use a dockerized ParadigmCore as a production node, you will manually need to manage network ports inside and outside the container to ensure it can communicate with the rest of the network.

Issues and proposals
--------------------

ParadigmCore is under active development, and at this point should not be considered stable. If you find a bug, inconsistency, or vulnerability please open an [issue](https://github.com/paradigmfoundation/paradigmcore/issues).

If you encounter errors setting up or running setting up ParadigmCore, feel free to reach out on [our chat server](https://chat.paradigm.market/).

Contributing
------------

ParadigmCore is open source software, and we encourage the suggestion of improvements and enhancements to the protocol. If you have a suggestion or specification, please submit a [Paradigm Improvement Proposal](https://github.com/paradigmfoundation/pips) (PIP).

Additionally, feel free to open issues and pull requests with bug fixes or enhancements to the ParadigmCore implementation.

## Index

### External modules

* ["api/post/HttpMessage"](modules/_api_post_httpmessage_.md)
* ["api/post/HttpServer"](modules/_api_post_httpserver_.md)
* ["api/stream/Request"](modules/_api_stream_request_.md)
* ["api/stream/Response"](modules/_api_stream_response_.md)
* ["api/stream/StreamServer"](modules/_api_stream_streamserver_.md)
* ["api/stream/errors"](modules/_api_stream_errors_.md)
* ["api/stream/methods"](modules/_api_stream_methods_.md)
* ["api/stream/schema"](modules/_api_stream_schema_.md)
* ["api/stream/utils"](modules/_api_stream_utils_.md)
* ["common/Codes"](modules/_common_codes_.md)
* ["common/Queue"](modules/_common_queue_.md)
* ["common/TendermintRPC"](modules/_common_tendermintrpc_.md)
* ["common/index"](modules/_common_index_.md)
* ["common/log"](modules/_common_log_.md)
* ["common/log"](modules/_common_log_.md)
* ["common/static/bigIntUtils"](modules/_common_static_bigintutils_.md)
* ["common/static/messages"](modules/_common_static_messages_.md)
* ["common/utils"](modules/_common_utils_.md)
* ["core/beginBlock"](modules/_core_beginblock_.md)
* ["core/checkTx"](modules/_core_checktx_.md)
* ["core/commit"](modules/_core_commit_.md)
* ["core/deliverTx"](modules/_core_delivertx_.md)
* ["core/endBlock"](modules/_core_endblock_.md)
* ["core/handlers/order"](modules/_core_handlers_order_.md)
* ["core/handlers/rebalance"](modules/_core_handlers_rebalance_.md)
* ["core/handlers/witness"](modules/_core_handlers_witness_.md)
* ["core/info"](modules/_core_info_.md)
* ["core/initChain"](modules/_core_initchain_.md)
* ["core/main"](modules/_core_main_.md)
* ["core/query"](modules/_core_query_.md)
* ["core/util/KVPair"](modules/_core_util_kvpair_.md)
* ["core/util/TxGenerator"](modules/_core_util_txgenerator_.md)
* ["core/util/utils"](modules/_core_util_utils_.md)
* ["core/util/valFunctions"](modules/_core_util_valfunctions_.md)
* ["crypto/Hasher"](modules/_crypto_hasher_.md)
* ["index"](modules/_index_.md)
* ["state/State"](modules/_state_state_.md)
* ["witness/Witness"](modules/_witness_witness_.md)

---

