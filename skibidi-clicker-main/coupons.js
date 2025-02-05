let couponAmount = 0;
let couponEffectWeights = {
    getSkibidi:3.5,
    cheaperUpgrades:1.5,
    crits:2,
    productionBoost:2,
    moreCoupons:1,
};
let currentWeightSum = 10;
let skibidiMultEffect = 1;
let upgradeCostReductionEffect = 1;

const skibidiCouponButton = document.getElementById('skibidi-coupon-button');
const skibidiCouponInfoElement = document.getElementById('skibidi-coupon-info-1');

function getCouponEffectWeightSum() {
    let sum = 0;
    for (let key of Object.keys(couponEffectWeights)) {
        sum += couponEffectWeights[key];
    }
    return sum;
}

function doSkibidiCouponRoll() {
    if (couponAmount >= 0) {
        currentWeightSum = getCouponEffectWeightSum();
        couponAmount--;
        let random = Math.random();
        if (0 < random && random < couponEffectWeights['getSkibidi']/currentWeightSum) {
            moreSkibidi();
            showNotification('Effect: +100sec worth of Skibidi production!', 'green');
        } else if (couponEffectWeights['getSkibidi']/currentWeightSum < random && random < (couponEffectWeights['getSkibidi']+couponEffectWeights['cheaperUpgrades'])/currentWeightSum) {
            boostSkibidiGain(1.3, 30000);
            showNotification('Effect: Skibidi gain +30% for 30sec!', 'green');
        } else if ((couponEffectWeights['getSkibidi']+couponEffectWeights['cheaperUpgrades'])/currentWeightSum < random && random < (couponEffectWeights['getSkibidi']+couponEffectWeights['cheaperUpgrades']+couponEffectWeights['crits'])/currentWeightSum) {
            reduceUpgradeCosts(1.1765, 10000);
            showNotification('Effect: Upgrade costs reduced by 15% for 10sec!', 'green');
        } else if ((couponEffectWeights['getSkibidi']+couponEffectWeights['cheaperUpgrades']+couponEffectWeights['crits'])/currentWeightSum < random && random < (couponEffectWeights['getSkibidi']+couponEffectWeights['cheaperUpgrades']+couponEffectWeights['crits']+couponEffectWeights['productionBoost'])/currentWeightSum) {
            showNotification('Effect: 10% chance to get +50% skibidi/click for 30sec!', 'green');
        }
        updateUI();
    }
}

function applyEffect(effect) {
    activeEffects.push(effect);
    updateEffectMults();
    setTimeout(() => {
        activeEffects = activeEffects.filter(e => e !== effect);
        updateEffectMults();
        if (effect.type == 'skibidiGainBoost') {showNotification('Skibidi production multiplier is over!', 'red')};
        if (effect.type == 'upgradeCostReduction') {showNotification('Upgrade cost reduction is over!', 'red')} 
    }, effect.duration);
}

function boostSkibidiGain(mult, duration) {
    const effect = {
        type: 'skibidiGainBoost',
        power: mult,
        duration: duration, // in ms
        id: Math.random(),
    };
    applyEffect(effect);
}

function reduceUpgradeCosts(mult, duration) {
    const effect = {
        type: 'upgradeCostReduction',
        power: mult,
        duration: duration, // in ms
        id: Math.random(),
    };
    applyEffect(effect);
}

function getSkibidiGainEffectMult() {
    let mult = 1;
    if (activeEffects.length == 0) {return 1};
    activeEffects.forEach((element) => {
        if (element.type == 'skibidiGainBoost' && element.power > mult) {
            mult = element.power;
        }
    });
    return mult;
}

function getUpgradeCostEffectReduction() {
    let mult = 1;
    if (activeEffects.length == 0) {return 1};
    activeEffects.forEach((element) => {
        if (element.type == 'upgradeCostReduction' && element.power > mult) {
            mult = element.power;
        }
    });
    return mult;
}

function updateEffectMults() {
    skibidiMultEffect = getSkibidiGainEffectMult();
}