"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vote {
    static valid(log, tags) {
        const res = { code: 0, log, };
        if (tags && tags.length > 0)
            res["tags"] = tags;
        return res;
    }
    static invalid(log, tags) {
        const res = { code: 1, log, };
        return res;
    }
}
exports.Vote = Vote;
