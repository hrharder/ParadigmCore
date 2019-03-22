---
title: Rebalance overview
---

# ParadigmCore `rebalance` overview

This document exists to outline and explain the `rebalance` transaction, its purpose within ParadigmCore, and the mechanism of it's implementation.

In this future, this may be adapted into more formal documentation about the subject.

## Background

Some processes and assertions that must be understood prior to `rebalance` transactions making any sense.

1. As part of the Paradigm contract system, there exists the `PosterRegistry` contract which implements the following functionalities:
    - Any valid Ethereum address (a "poster") may "lock" DIGM tokens into the registry at any time.
    - That same address may "unlock" any amount of tokens at any time, up to their total "locked" balance.
    - Upon a "lock" and "unlock" transaction, a `PosterRegistryUpdate` event is emitted with the poster's address, and their balance.
    - A mapping (`address a => uint balance`) is kept in-state in the `PosterRegistry` contract.
  
1. The desired functionality (on the OrderStream side) is as follows:
    - Write access to the network - the ability to post orders - is allocated in periods called "rebalance periods".
    - At the beginning of each period, a mapping is generated (`address a => uint limit`) by the OrderStream
    - This mapping allocates each "poster" with a number of transactions they are allowed in the period
    - This per-period allowance should be proportional to their "lock" size (their locked balance / total locked balance * `NUM_ORDERS`)
    - `NUM_ORDERS` (not the real name) is a consensus parameter that determines the number of order TXs accepted per rebalance period
    - For the rest of this document, assume `NUM_ORDERS = 1000` and a rebalance period is 10 Ethereum blocks
    
1. Keeping the above in mind, the goals of the `rebalance` transaction and mechanic are as follows:
    - Deterministically replicate the state of the `PosterRegistry` in the OrderStream's state (handled by the `Witness` mechanic)
    - At validator-determined intervals based on the Ethereum block height, "snapshot" the `PosterRegistry` mapping, and allocate throughput to posters proportionally (using bandwidth model) based on token "balance" - the amount locked in the registry.
    - Ensure all validators agree upon the limit mapping before it becomes active.
    
1. A Tendermint consensus round consists of the following steps (functions called by each validator), resulting in the creation of a new block. This assumes no invalid transactions, for simplicity.
    - Call `beginBlock()` with received block from proposer. Perform pre-block processing, etc.
    - Call `deliverTx()` on each transaction within the block.
    - Call `endBlock()` upon finishing transaction processing
    - Call `commit()` and persist new state to disk.
 
### Data structure(s) reference

Some data structures referenced below, to keep in mind.

```js
// rebalance transaction (un-encoded, un-compressed)
// accurate as of ParadigmCore v0.8. Subject to change

let rebalanceTx = {
    type: "rebalance",          // tx type identifier
    data: {                     // tx data hash-map
        round: {                // rebalance round info
            number: 2,          // proposal round number this tx is for
            startsAt: 7121050,  // proposed start block (Ethereum)
            endsAt: 7121060,    // proposed end block (Ethereum)
            limit: 75000,       // proposed order limit for this period
        },
        limits: {               // arbitrary length "address => limit" mapping
            "0x123...32": 10000,
            "0x4f7...a1": 3100,
            // ...
        }
    }
}
```

## Description

For details about the `Witness` mechanic discussed below, see [this document.](https://github.com/paradigmfoundation/paradigmcore/blob/dev/docs/ethereum-peg-spec.md)

1. In order to make point #3 from above possible, the "limit" mapping used to allocate `order` type transactions (and `stream`, eventually) must **be generated deterministically, only from ABCI transactions**.

1. The solution is the `rebalance` transaction type, which only validators can submit. Discussed below. 

1. While a `Witness` process is running by validator, it listens to events from the Paradigm contract system on Ethereum.
    - (In addition to other actions) the `Witness` maintains an in-memory mapping of `PosterRegistry` raw balances (# of tokens)
    - When a certain Ethereum block is found (see [notes](#notes)) they submit a `rebalance` transaction with their proposal (see next point). 
    - Keep in mind that **each validator does this** - they all submit `rebalance` transactions at the same (ish) time. 
    
1. When it is time to submit a `rebalance` transaction (previous `endsAt` Ethereum block has been found) perform the following:
    - Iterate over the in-memory (in Witness process) poster balances. See [here.](https://github.com/ParadigmFoundation/ParadigmCore/blob/tags/src/witness/Witness.ts#L89)
    - Calculate the total amount "locked" in the contract (sum of all balances)
    - For each account with a balance, compute and round `(balance / total) * limit` where `balance` is the accounts balance, `total` is the sum of all balances, and `limit` is the order limit agreed upon by validators. 
    - Generate a new `rebalance` transaction (see above data structure) with the computed mapping, as well as some round meta-data
    - Submit `rebalance` transaction to the network.
    
1. Based on the mechanics of Tendermint (one block = one proposer) and the rules of the `rebalance` transaction type (see `delverTx` implementation for `rebalance`), we can be sure **only one `rebalance` proposal gets accepted per period.**
    - Usually, the proposer will get to select their `rebalance` proposal, since it will be the first one in their mempool.
    - This fact (only one proposal accepted per period) is additionally enforced by the `ROUNDSTEP` cycle, where the ordering of transactions within a block - and the subsequent order `deliverTx()` gets called, and the contents of a block received from a proposer are the same for all validators on the network.
    
## Notes

1. The processes described above are true for rounds where `n > 0`, there is a special case for round `n = 0`. Without going into too-much specificity, upon network genesis, the first validator to report and attest to an Ethereum block being found sets the parameters for the first rebalance period. 

1. Based on the parameters (start and end block) of the first round, all subsequent `rebalance` period parameters can be computed deterministically, if the period increment is known (which it should be, as a consensus parameter). 

1. View the `rebalance` transaction state-transition rules [here.](https://github.com/ParadigmFoundation/ParadigmCore/blob/tags/src/core/handlers/rebalance.ts)
