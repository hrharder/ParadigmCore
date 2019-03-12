/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name Hasher.ts
 * @module src/crypto
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  19-August-2018
 * @date (modified) 21-January-2019
 *
 * Hashing class to allow creation of state hashes. Also used to generate
 * ID's (orderID) for valid orders.
 *
 * @todo create better method of hashing state/orders
 */

// Object hashing library (3rd party)
import * as hash from "object-hash";

// ParadigmCore utility
import { bigIntReplacer } from "../common/static/bigIntUtils";

export class Hasher {

  /**
   * Generate the hash of an order to be used as the OrderID.
   *
   * @param order {paradigm.Order} A Paradigm order object to be hashed
   */
  public static hashOrder(order: Order): string {
    let orderHash: string;
    const hashPrep: object = {
      makerValues: order.makerValues,
      posterSignature: order.posterSignature,
      subContract: order.subContract,
    };

    try {
      orderHash = hash(hashPrep);
    } catch (error) {
      throw new Error(`failed generating order hash: ${error.message}`);
    }

    // return computed hash
    return orderHash;
  }
}
