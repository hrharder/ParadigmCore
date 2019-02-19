"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpMessage {
    static staticSendError(res, message, error) {
        const json = {
            error,
            message,
            processed: new Date().toLocaleString(),
        };
        try {
            res.status(error).send(json);
        }
        catch (err) {
            throw new Error("error sending express message");
        }
    }
    static staticSend(res, message) {
        const json = {
            message,
            processed: new Date().toLocaleString(),
        };
        try {
            res.status(200).send(json);
        }
        catch (err) {
            throw new Error("error sending express message");
        }
    }
    constructor(response, message, error) {
        if (error != null) {
            this.err = error;
        }
        else {
            this.err = 200;
        }
        this.res = response;
        this.msg = message;
        this.json = this.toJSON();
    }
    send() {
        try {
            this.res.status(this.err).send(this.json);
        }
        catch (err) {
            throw new Error("error sending express message");
        }
    }
    toJSON() {
        if (this.err !== 200) {
            return {
                error: this.err,
                message: this.msg,
                processed: new Date().toLocaleString(),
            };
        }
        else {
            return {
                message: this.msg,
                processed: new Date().toLocaleString(),
            };
        }
    }
}
exports.HttpMessage = HttpMessage;
