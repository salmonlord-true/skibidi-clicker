let game_effs_couponAmount = 0;
let game_effs_couponEffectWeights = {
    getSkibidi:3.5,
    cheaperUpgrades:1.5,
    crits:2,
    productionBoost:2,
    moreCoupons:1,
};
let game_effs_currentWeightSum = 10;

const game_const_point1 = (game_effs_couponEffectWeights['getSkibidi'])/game_effs_currentWeightSum;
const game_const_point2 = (game_effs_couponEffectWeights['getSkibidi']+game_effs_couponEffectWeights['cheaperUpgrades'])/game_effs_currentWeightSum;
const game_const_point3 = (game_effs_couponEffectWeights['getSkibidi']+game_effs_couponEffectWeights['cheaperUpgrades']+game_effs_couponEffectWeights['crits'])/game_effs_currentWeightSum;
const game_const_point4 = (game_effs_couponEffectWeights['getSkibidi']+game_effs_couponEffectWeights['cheaperUpgrades']+game_effs_couponEffectWeights['crits']+game_effs_couponEffectWeights['productionBoost'])/game_effs_currentWeightSum;

const game_const_skibidiCouponButton = document.getElementById('skibidi-coupon-button');
const game_const_skibidiCouponInfoElement = document.getElementById('skibidi-coupon-info-1');

function game_effs_getCouponEffectWeightSum() {
    let sum = 0;
    for (let key of Object.keys(game_effs_couponEffectWeights)) {
        sum += game_effs_couponEffectWeights[key];
    }
    return sum;
}

function game_effs_doSkibidiCouponRoll() {
    if (game_effs_couponAmount > 0) {
        game_updateUI();
        game_effs_currentWeightSum = game_effs_getCouponEffectWeightSum();
        game_effs_couponAmount--;
        let random = Math.random();
        if (0 < random && random < game_const_point1) {
            new Effect('skibidiGain', Effect.baseFreeSkibidi, 0, true);
        } else if (game_const_point1 < random && random < game_const_point2) {
            new Effect('upgradeCostReduction', Effect.baseSkibidiProductionMult, 10000, true);
        } else if (game_const_point2 < random && random < game_const_point3) {
            new Effect('critChance', Effect.baseCritPower, 30000, true, Effect.baseCritChance);
        } else if (game_const_point3 < random && random < game_const_point4) {
            new Effect('skibidiGainBoost', Effect.baseSkibidiProductionMult, 30000, true);
        } else if (game_const_point4 < random && random < 1) {
            new Effect('couponChanceBoost', Effect.baseCouponChance, 30000, true);
        };
    }
}

/**
 * Handles temporary effects (also momentary skibidi gain as an edge case).
 * 
 * usage: new Effect($type, $power, $duration, $announce?, $power2)
 * 
 * type:   'skibidiGainBoost' | 'upgradeCostReduction' | 'critChance' | 'couponChanceBoost' | 'skibidiGain'
 * 
 * power2 only neccessary for critChance - power1 encodes the crit strength, power2 - the chance.
 */
class Effect {

    static effects = [];

    static baseFreeSkibidi = 100;
    static baseSkibidiProductionMult = 1.3;
    static baseUpgradeCostMult = 1.1765;
    static baseCritClickMult = 2;
    static baseCritChance = 0.1;
    static baseCouponChance = 0.006;
    static freeSkibidi = Effect.baseFreeSkibidi;
    static skibidiProductionMult = Effect.baseSkibidiProductionMult;
    static upgradeCostMult = Effect.baseUpgradeCostMult;
    static critChance = Effect.baseCritClickMult;
    static critClickMult = Effect.baseCritChance;
    static couponChance = Effect.baseCouponChance;

    constructor(type, power, duration, announce = false, power2 = 1) {
        const effect = {
            type: type,
            power: power,
            power2: power2,
            duration: duration,
            id: Math.random(),
        };
        if (effect.type == 'skibidiGain') {
            game_incrementSkibidi(power, 0);
            if (announce) {new Notification('Effect: +100sec worth of Skibidi production!', 'green')};
            return;
        }
        Effect.effects.push(effect);
        if (announce) {
            if (effect.type == 'skibidiGainBoost') {new Notification('Effect: Skibidi gain +30% for 30sec!', 'green')};
            if (effect.type == 'upgradeCostReduction') {new Notification('Effect: Upgrade costs reduced by 15% for 10sec!', 'green')};
            if (effect.type == 'critChance') {new Notification('Effect: 10% chance to get +100% skibidi/click for 30sec!', 'green')};
            if (effect.type == 'couponChanceBoost') {new Notification('Effect: 2x chance to get a coupon for 30sec!', 'green')};
        };
        setTimeout(() => {
            Effect.effects.splice(Effect.effects.findIndex((element) => {element === effect}), 1);
            if (effect.type == 'skibidiGainBoost') {new Notification('Skibidi production multiplier is over!', 'red')};
            if (effect.type == 'upgradeCostReduction') {new Notification('Upgrade cost reduction is over!', 'red')};
            if (effect.type == 'critChance') {new Notification('Crit chance is over!', 'red')};
            if (effect.type == 'couponChanceBoost') {new Notification('Coupon chance increase is over!', 'red')};
            Effect.updateMults();
        }, duration)
        Effect.updateMults();
    }

    static resetMults() {
        Effect.skibidiProductionMult = 1;
        Effect.upgradeCostMult = 1;
        Effect.critChance = 0;
        Effect.critClickMult = 1;
        Effect.couponChance = 0.003;
    }

    static updateMults() {
        Effect.resetMults();
        Effect.effects.forEach((element) => {
            if (element.type == 'skibidiGainBoost' && element.power > Effect.skibidiProductionMult) {
                Effect.skibidiProductionMult = element.power;
            } else if (element.type == 'upgradeCostReduction' && element.power > Effect.upgradeCostMult) {
                Effect.upgradeCostMult = element.power;
            } else if (element.type == 'critChance' && element.power > Effect.critClickMult) {
                Effect.critClickMult = element.power;
                Effect.critChance = element.power2;
            } else if (element.type == 'couponChanceBoost' && element.power > Effect.couponChance) {
                Effect.couponChance = element.power;
            }
        });
    }
}