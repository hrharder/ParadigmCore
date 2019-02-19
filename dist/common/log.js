"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const c = require("ansi-colors");
const _ = require("lodash");
const log_json_1 = require("./log.json");
const level = process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL, 10) : 0;
const version = process.env.npm_package_version;
function ts() {
    let dt = new Date().toISOString().split("T");
    return c.bold.black(`${dt[0]} ${dt[1].split("Z")[0]}`);
}
function print(msg, lvl) {
    if (lvl === -1) {
        console.log(`\n${ts()} ${msg}\n`);
        return;
    }
    if (level > lvl || _.isUndefined(log_json_1.levels[lvl])) {
        return;
    }
    console.log(`${ts()} ${msg}`);
}
function logStart(msg) {
    if (msg) {
        print(`${c.gray("lvl:")} ${c.bold("info")}\t` +
            `${c.gray("mod:")} ${c.bold.grey("startup")}\t` +
            `${c.gray("msg:")} ${msg}`, 2);
        return;
    }
    print(`${c.gray("lvl:")} ${c.bold("info")}\twelcome :)\t` +
        `starting ${c.bold.greenBright("paradigm core")}` +
        ` v${version}`, -1);
}
exports.logStart = logStart;
function log(mod, msg, height, hash) {
    if (_.isUndefined(log_json_1.modules[mod]) || !_.isString(msg)) {
        return;
    }
    const ifHeight = height ? `${c.gray("height: ")} ${height}\t` : "";
    const ifHash = hash ? `${c.gray("appHash: ")} ${hash}` : "";
    print(`${c.gray("lvl:")} ${c.bold("info")}\t` +
        `${c.gray("mod:")} ${c.bold[(log_json_1.modules[mod].color)](log_json_1.modules[mod].label)}\t` +
        `${c.gray("msg:")} ${msg}\t` + ifHeight + ifHash, 0);
}
exports.log = log;
function warn(mod, msg) {
    if (_.isUndefined(log_json_1.modules[mod]) || !_.isString(msg)) {
        return;
    }
    print(`${c.gray("lvl:")} ${c.bold.yellow("warn")}\t` +
        `${c.gray("mod:")} ${c.bold[(log_json_1.modules[mod].color)](log_json_1.modules[mod].label)}\t` +
        `${c.gray("msg:")} ${msg}`, 1);
}
exports.warn = warn;
function err(mod, msg) {
    if (_.isUndefined(log_json_1.modules[mod]) || !_.isString(msg)) {
        return;
    }
    print(`${c.gray("lvl:")} ${c.bold.red("error")}\t` +
        `${c.gray("mod:")} ${c.bold[(log_json_1.modules[mod].color)](log_json_1.modules[mod].label)}\t` +
        `${c.gray("msg:")} ${msg}`, 2);
}
exports.err = err;
