"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue extends Array {
    constructor() {
        if (arguments.length) {
            throw Error("constructor accepts no arguments");
        }
        super();
    }
    add(item) { this.push(item); return; }
    remove() { if (this.isEmpty()) {
        return;
    } return this.shift(); }
    front() { if (this.isEmpty()) {
        return null;
    } return this[0]; }
    allItems() { return JSON.stringify(this); }
    isEmpty() { return this.length === 0; }
}
exports.Queue = Queue;
