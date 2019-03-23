#!/usr/local/bin/node
/**
 * ParadigmCore (optional) initialize/setup script
 * 
 * Use only with Tendermint v0.29.x
 * 
 * Can perform the following:
 * - verifies node version
 * - sets required environment variable
 * - download tendermint binary
 * - set up tendermint config and data-store
 * - generate validator keypair and node_id
 * - copy new keys from tendermint config to environment
 * - validates environment config file
 * - validates copied keys
**/

// imports, scope, etc.
const { execSync } = require("child_process");
const { readdirSync, appendFileSync, readFileSync } = require('fs');
const env = require("dotenv").config().parsed;
const c = require("ansi-colors");
let tendermint, pchome, tmhome, privValidator, priv_key, pub_key, address, n = 0;

// stdout formatter functions, etc
const write = m => console.log(`\n\t${c.bold(`${++n}.`)}\t${m}`);
const err = m => console.log(`\n\t${c.red.bold(m)}`);

// initially required variables
const reqVars = [
    "NODE_TYPE", "WEB3_PROVIDER", "POST_PORT", "STREAM_PORT", "WINDOW_MS", "WINDOW_MAX",
    "ABCI_HOST", "ABCI_PORT", "PERIOD_LENGTH", "PERIOD_LIMIT", "FINALITY_THRESHOLD",
    "MAX_ORDER_SIZE", "SIG_ENC", "MONIKER", "TENDERMINT_PORT", "TENDERMINT_HOST"
]

// setup tendermint config/data dir
function setupValidator() {
    write("Configuring and setting up tendermint...");
    try {
        tendermint = require("tendermint-node");
    } catch (error) {
        fail("Missing tendermint driver... check /lib and try again.", error);
    }

    // check if there is already a data and/or config dir
    write("Checking for existing node configuration...");
    let tmConts = readdirSync(tmhome);
    if (tmConts.indexOf("data") !== -1 && tmConts.indexOf("config") !== -1) {
        write("Detected existing node config directory.");
        write("Skipping node config initialization...");
        copyKeysToEnv();
        // moveGenesisFile();
        return;
    }

    // create tendermint home directory
    write("No existing configuration detected.");
    write("Creating new tendermint configuration...");
    try {
        tendermint.initSync(tmhome);
    } catch (error) {
        fail("Failed to setup tendermint config and data directories.", error);
    }
    write(`Created tendermint config in '${pchome}/lib'`);
    copyKeysToEnv();
}

// validate keys (purely based on structure) from priv_validator.json only
function validateKeys() {
    write("Loading validator keys...");
    try {
        const pathstr = `${tmhome}/config/priv_validator_key.json`;
        privValidator = require(pathstr);
    } catch (error) {
        fail("Failed to load keypair, try removing 'NODE_ID', ... from .env", error);
    }

    write("Validating keys...");
    address = privValidator.address;
    priv_key = privValidator.priv_key.value;
    pub_key = privValidator.pub_key.value;

    if (
        Buffer.from(address, "hex").length !== 20 ||
        Buffer.from(priv_key, "base64").length !== 64 ||
        Buffer.from(pub_key, "base64").length !== 32
    ) {
        fail("Current keys invalid, check keys or regenerate.");
    }
    return;
}

// copy keys from priv_validator.json 
function copyKeysToEnv() {
    write("Validating tendermint keys...");
    validateKeys();
    write("Copying keys to environment file...");
    try {
        appendFileSync(".env", `PRIV_KEY="${priv_key}"\n`);
        appendFileSync(".env", `PUB_KEY="${pub_key}"\n`);
        appendFileSync(".env", `NODE_ID="${address}"\n`);
    } catch (error) {
        fail("Failed to copy keys to environment.", error);
    }
    return;
}

// freshly parse environment vars and priv_validator.json and validate
function validateEnvironment(){
    write("Validating keys in environment file...");
    let newEnv = require("dotenv").config().parsed;
    if (!newEnv) fail("Failed to validate environment file, no file found.");

    // check all reqs, plus keys
    write("Checking for all required config variables...");
    let newReqs = [...reqVars, "TM_HOME", "NODE_ID", "PRIV_KEY", "PUB_KEY"];
    checkReqs(newReqs, newEnv);

    // check env keys match priv_validator.json keys
    write("Checking that config keys match validator keys...");
    try {
        const pathstr = `${tmhome}/config/priv_validator_key.json`;
        const ks = require(pathstr);
        if (
            !pad(ks.address, "hex").equals(pad(newEnv.NODE_ID, "hex")) ||
            !pad(ks.priv_key.value, "base64").equals(pad(newEnv.PRIV_KEY, "base64")) ||
            !pad(ks.pub_key.value, "base64").equals(pad(newEnv.PUB_KEY, "base64"))
        ) {
            fail("Environment verification failed, keys do not match.");
        }
    } catch (error) {
        fail("Key verification failed, please regenerate.", error);
    }
    done();
}

// buffer generator wrapper
function pad(b, enc) {
    return Buffer.from(b, enc);
}

// check environment object for required config vars
function checkReqs(reqs, env){
    let missing = reqs.filter(k => env[k] === undefined || env[k] === "");
    if (missing.length > 0) {
        fail("Missing the following required parameters:", null, missing);
    }
}

// only called if all setup completes
function done() {
    console.log(c.bgWhite.black.bold(`\n\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ IMPORTANT NODE INFO ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`))
    console.log(`\t${c.bgRed.black("PRIVATE KEY: ")}\t${c.redBright(process.env.PRIV_KEY)}\n`)
    console.log(`\t${c.bgBlack.underline.white("PUBLIC KEY: ")}\t${c.greenBright(process.env.PUB_KEY)}\n`)
    console.log(`\t${c.bgBlack.underline.white("NODE ID/ADDR: ")}\t${c.greenBright(process.env.NODE_ID)}`)
    console.log(c.bgWhite.black.bold(`\n\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`))
    console.log(c.green.bold("\n\tParadigmCore setup completed!"));
    console.log(c.green.bold("\n\tStart your node with `yarn launch` or `npm run launch`.\n"));
    process.exit(0);
}

// called on fatal failure
function fail(msg, error, missing) {
    // log error message from stack, if present
    if (error) {
        err(`ParadigmCore setup failed with: ${error.message}`);
    } else {
        err(`ParadigmCore setup failed...`);
    }

    // log additional failure message
    err(`${msg}\n`);

    // log missing environment variables
    if (missing) {
        missing.forEach((k, i) => console.log(`\t${i+1}.\t${k}\n`));
        err("Please fix your environment file and try again.\n");
    }
    process.exit(1);
} 

// main function
(function () {
    semVer = process.version.slice(1).split(".").map(i => parseInt(i));
    semVer[0] > 10 ?
        null : semVer[0] === 10 && semVer[1] >= 4 ? 
        null : fail("Node.JS >=10.4 required.");

    // exit if paradigmcore home directory environment var not set
    if (
        process.env.PCHOME === undefined || 
        process.env.PCHOME.toLocaleLowerCase() !== process.cwd().toLocaleLowerCase()
    ) {
        fail("Environment variable PCHOME is not set, or does not match CWD.");
    } else {
        write("Setting tendermint home directory...")
        pchome = process.env.PCHOME;
        tmhome = `${pchome}/lib`;
        try {
            write("Checking environment file (step 1/2)...");
            if (!env) {
                fail(
                    "Missing or empty environment file (should at be $PCHOME/.env)\n"+
                    "\tTry starting with a template from $PCHOME/lib"
                );
            } else if (!env.TM_HOME || env.TM_HOME === "") {
                appendFileSync(".env", `TM_HOME="${tmhome}"\n`);
                appendFileSync(".env", `PC_HOME="${pchome}"\n`);
            } else {
                write("TM_HOME already set, skipping.");
            }
        } catch (error) {
            fail("Failed to set tendermint home; check /lib and try again.", error);
        }
    }

    // check for missing options
    write("Checking environment file (step 2/2)...");
    checkReqs(reqVars, env);

    if (!env.PRIV_KEY && !env.PUB_KEY && !env.NODE_ID) {
        setupValidator();
        validateEnvironment();
    } else if (!env.PRIV_KEY || !env.PUB_KEY || !env.NODE_ID) {
        fail("Please remove 'NODE_ID', 'PRIV_KEY', and 'PUB_KEY' from .env.");
    } else {
        validateKeys();
        validateEnvironment();
    }
})();