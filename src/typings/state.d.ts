/**
 * ===========================
 * ParadigmCore: Blind Star
 * @name state.d.ts
 * @module src/typings
 * ===========================
 *
 * @author Henry Harder
 * @date (initial)  14-November-2018
 * @date (modified) 20-December-2018
 *
 * Type definitions for ParadigmCore's state.
 */

/**
 * Outer level datastructure representing the state of the network, including
 * poster staked balances, poster rate limit, validator set, etc.
 * /
interface State {
    round:              RoundInfo;
    events:             Events;
    balances:           Balances;
    limits:             Limits;
    lastEvent:          EventInfo
    validators:         Validators;
    consensusParams:    ConsensusParams;
    orderCounter:       number;
    lastBlockHeight:    number;
    lastBlockAppHash:   string;
}*/

interface State {
    round:              RoundInfo;
    events:             Events;
    posters:            PosterInfo;
    validators:         ValidatorInfo;
    lastEvent:          EventInfo;
    consensusParams:    ConsensusParams;
    orderCounter:       bigint;
    lastBlockHeight:    bigint;
    lastBlockAppHash:   string;
}

interface PosterInfo {
    [key: string]: Poster
}

interface Poster {
    balance:        bigint;
    orderLimit:     number;
    streamLimit:    number;
}

/**
 * key is nodeID
 */
interface ValidatorInfo {
    [key: string]: Validator;
}

/**
 * new validator state object
 */
interface Validator {
    balance:        bigint; // balance in registry contract
    power:          bigint; // vote power on tendermint chain
    publicKey:      string; // should be string?
    ethAccount:     string; // should be string?
    lastVoted:      bigint;
    lastProposed:   bigint;
    totalVotes:     bigint;
    genesis?:       boolean; // true if val was in genesis.json
}

/**
 * Represents the status and parameters of the poster staking rounds. Block
 * numbers here refer to the height of the Ethereum blockchain.  
 */
interface RoundInfo {
    number:     number;
    startsAt:   number;
    endsAt:     number;
    limit:      number;
}

/**
 * The `state.events` mapping stores witness accounts of Ethereum events 
 * reported by validators, indexed by block number. `EventObjects` are stored 
 * here until sufficient validators submit witness accounts for that event, at 
 * which point the corresponding state-transition for the event is applied to 
 * the `state.balances` mapping.
 */
interface Events {
    [block: string]:  BlockEventObject;
}

/**
 * The inner-level mapping in `state.events` corresponding to each block number
 * index contains mappings (`EventObject`) indexed by the Ethereum address that
 * triggered the event, containing parameters of the event.
 */
interface BlockEventObject {
    [id: string]:  WitnessEvent;
}

/**
 * A `RawStakeEvent` is simply an event object that has not been added to the 
 * in-state `state.events` mapping.
 * /
interface RawStakeEvent {
    type:   string;
    staker: string;
    amount: bigint;
    block:  number;
}*/

/**
 * `StakeEvents` are (currently) the only Ethereum event type implemented. The
 * data within `StakeEvents` is the information contained with the event emitted
 * by the Ethereum `PosterStaking` contract.
 */
interface WitnessEvent {
    subject:    string;
    type:       string;
    amount:     bigint;
    address:    string;
    publicKey:  string;
    conf:       number;
}

/**
 * The `state.balances` mapping contains the most updated and final balances of
 * stakers. The mapping is generated from events within `state.events` once each
 * event recieves sufficient witness confirmations.
 */
interface PosterBalances {
    [key: string]:  bigint;
}

/**
 * Rate limits are computed according to a bandwidth model based on each stakers
 * balance within the contract, and the total amount staked. `LimitObjects` are
 * stored in `state.limits`, with stakers Ethereum address as the keys.
 */
interface Limits {
    [key: string]:  LimitObject;
}

/**
 * Each staker is allocated a network throughput limit (for Order transactions)
 * proportional to stake size, and all stakers are allocated one (1) Stream
 * transaction per period, regardless of stake size.  
 */
interface LimitObject {
    orderLimit:     number;
    streamLimit:    number;
}

/**
 * The network must keep track of the Ethereum height of the latest event that
 * was applied to the networks state, to avoid replaying events already adopted
 * in-state. 
 */
interface EventInfo {
    add:    number;
    remove: number;
}

/**
 * Representation of the validator set in-state includes historical validators,
 * including validators that have been kicked off the network. The active
 * validator set is a computable sub-set of `state.validators`.
 * /
interface Validators {
    [key: string]:  ValidatorInfo;
}*/

/**
 * For each validator, parameters regarding their historical activity is stored.
 * This allows interested parties to derive the active validator set, and audit
 * the historical actions of active and former validators.
 * /
interface ValidatorInfo {
    lastProposed:   number;
    lastVoted:      number;
    totalVotes:     number;
    votePower:      number;
    active?:        boolean;    // @TODO: implement in state-machine
}*/

/**
 * Parameters required for validators within a network to reach consensus on
 * valid transactions.
 */
interface ConsensusParams {
    finalityThreshold:      number;
    periodLimit:            number;
    periodLength:           number;
    maxOrderBytes:          number;
    confirmationThreshold?:  number;
}