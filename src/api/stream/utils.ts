/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name utils.ts
 * @module api/stream
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  19-February-2019
 * @date (modified) 24-February-2019
 * 
 * Utility functions for the ParadigmCore JSONRPC server.
**/

// local imports
import { Request as Req } from "./Request";
import { Response as Res } from "./Response";

// third party and stdlib
import * as WebSocket from "ws";
import * as _ from "lodash";

/**
 * Validate an incoming client message
 * 
 * If the function returns an empty array, assume the input is a valid and 
 * parsable JSON string. Use `createRequest` to create a rich Request object.
 * 
 * @param message data from the WebSocket client connection
 */
export function validateMessage(message: WebSocket.Data): ValidationError {
    // scope eventual response/request objects
    let res: Res, req: Req, error: ValidationError;

    // create request object and validate
    req = new Req(message);
    error = req.validate();

    // return validation error object, if any
    return _.isNull(error) ? null : error;
}

/**
 * Build a JSONRPC validation object.
 * 
 * @todo pull error message from code -> message mapping
 * 
 * @param code the JSONRPC error code (see JSONRPC-2.0 specification)
 * @param message the error message to be included in the error object
 */
export function createValError(code: number, message: string): ValidationError {
    if (!_.isNumber(code) || !_.isString(message)) {
        throw Error("Invalid types for validator error.");
    }

    return { code, message }
}

/**
 * Generate a JSONRPC response.
 * 
 * Builds a successful (or failure) JSONRPC server -> client response object based
 * on the provided inputs. If a code is provided, and the `id` is `null`, the
 * response will be an error response. If an `id` and `result` are provided, with
 * no error code, a successful response object will be generated. 
 * 
 * @param result an error message or successful API request result
 * @param id the client-provided ID string, only included for non-errors
 * @param code an error code if the response indicates a failed request
 */
export function createResponse(result?: any, id?: string, error?: ValidationError): Res {
    // will be a response object
    let res: Res;

    // create response object based on input
    if (!result && error) {
        res =  new Res({ error });
    } else if (id && !error && result) {
        res = new Res({ id, result });
    } else if (id && !error && !result) {
        res = new Res({ id, result: {}});
    } else {
        throw Error("Invalid input for response generator.");
    }

    // return constructed result object
    return res;
}

export function parseOrdersForSubscription(txs: string[]): OrderData[] {
    const orders = [];
    txs.forEach(tx => {
        const objTx = JSON.parse(tx);
        const { type, data } = objTx;
        if (type === "order") {
            orders.push(data);
        }
    });
    return orders;
}