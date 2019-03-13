/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name log.ts
 * @module common
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  15-October-2018
 * @date (modified) 13-March-2019
 *
 * Log functions.
**/

// local and remote imports
import * as c from "ansi-colors";
import * as _ from "lodash";
import { levels, modules as defs } from "./log.json";

// parse log level and version
const level = process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL, 10) : 0;
const version = process.env.npm_package_version;

/**
 * Creates a pretty timestamp string.
 */
function ts(): string {
    let dt = new Date().toISOString().split("T");
    return c.bold.black(`${dt[0]} ${dt[1].split("Z")[0]}`);
}

/**
 * Output log message (formatted) to stdout.
 *
 * @param msg message to write to stdout
 * @param lvl log level of message
 */
function print(msg, lvl) {
    if (lvl === -1) {  console.log(`\n${ts()} ${msg}\n`); return; }
    if (level > lvl || _.isUndefined(levels[lvl])) { return; }
    console.log(`${ts()} ${msg}`);
}

/**
 * Logger used during startup, with special case for very first message.
 *
 * @param msg startup message
 */
export function logStart(msg?) {
    if (msg) {
        print(
            `${c.gray("lvl:")} ${c.bold("info")}\t` +
            `${c.gray("mod:")} ${c.bold.grey("startup")}\t` +
            `${c.gray("msg:")} ${msg}`,
            2
        );
        return;
    }

    // special welcome message
    print(
        `${c.gray("lvl:")} ${c.bold("info")}\twelcome :)\t` +
        `starting ${c.bold.greenBright("paradigm core")}` +
        ` v${version}`,
        -1
    );
}

/**
 * General info log function.
 *
 * @param mod module reporting information
 * @param msg the reported information message
 * @param height optional block height for core messages
 * @param hash optional appHash for commit messages
 */
export function log(mod: string, msg: string, height?: number, hash?: string) {
    // return if invalid function call
    if (_.isUndefined(defs[mod]) || !_.isString(msg)) { return; }

    // special cases for state machine ("core") module and TM blockchain
    const ifHeight = height ? `${c.gray("height: ")} ${height}\t` : "";
    const ifHash = hash ? `${c.gray("appHash: ")} ${hash}` : "";

    // write to stdout with log level 0 (info/all)
    print(
        `${c.gray("lvl:")} ${c.bold("info")}\t` +
        `${c.gray("mod:")} ${c.bold[(defs[mod].color)](defs[mod].label)}\t` +
        `${c.gray("msg:")} ${msg}\t` + ifHeight + ifHash,
        0
    );
}

/**
 * General warning log function.
 *
 * @param mod module reporting warning
 * @param msg warning message
 */
export function warn(mod: string, msg: string) {
    // return if invalid function call
    if (_.isUndefined(defs[mod]) || !_.isString(msg)) { return; }

    // write to stdout with log level 1 (warnings)
    print(
        `${c.gray("lvl:")} ${c.bold.yellow("warn")}\t` +
        `${c.gray("mod:")} ${c.bold[(defs[mod].color)](defs[mod].label)}\t` +
        `${c.gray("msg:")} ${msg}`,
        1
    );
}

/**
 * General error log function.
 *
 * @param mod module reporting error
 * @param msg error message
 */
export function err(mod: string, msg: string) {
    // return if invalid function call
    if (_.isUndefined(defs[mod]) || !_.isString(msg)) { return; }

    // write to stdout with log level 2 (errors)
    print(
        `${c.gray("lvl:")} ${c.bold.red("error")}\t` +
        `${c.gray("mod:")} ${c.bold[(defs[mod].color)](defs[mod].label)}\t` +
        `${c.gray("msg:")} ${msg}`,
        2
    );
}
