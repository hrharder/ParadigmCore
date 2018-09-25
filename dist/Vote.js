"use strict";
/*
  =========================
  Blind Star - codename (developent)
  Vote.ts @ {server}
  =========================
  @date_inital 24 September 2018
  @date_modified 24 September 2018
  @author Henry Harder

  A class to represent a vote based on the logic in
  checkTx() and deliverTx().
*/
Object.defineProperty(exports, "__esModule", { value: true });
class Vote {
    /*
        This class will be expanded with more errors for the
        different failure points in checkTx (and deliverTx).
    */
    static valid(message) {
        return {
            code: 0,
            log: message
        };
    }
    static invalid(message) {
        return {
            code: 1,
            log: message
        };
    }
}
exports.Vote = Vote;
