const playerIdentities = [
    "You are a Lil Baby Skibidi 👶🏼🚽",
    "You are a Small Skibidi 🧑🚽",
    "You are an Average Skibidi ⬆️🧑🚽⬆️",
    "You are a Big Skibidi 👨🏻🚽😎😎",
    "You are a Giant Skibidi 🔥🔥💥👨🏻🚽😎😎",
    "You are a Mega Skibidi Toilet 💥💥💥👿🚽💥💥💥",
    "You are a Giga Skibidi Toilet 💥💥⬆️👿🚽🚽🚽⬆️💥💥",
    "You are an Enormous Skibidi Toilet 💥💥🧑🚽⬆️⬆️👹🚽🚽🚽⬆️⬆️🧑🚽💥💥",
];
const playerIdentityMilestones = [
    0,
    1e4,
    1e7,
    1e9,
    1e12,
    1e14,
    1e16,
    1e18,
    Infinity,
];
let skibidi = 0;
let upgrades = 0;
let upgradeCost = 50;
let skibidiPerClick = 1;
let skibidiBoosts = 0;
let skibidiBoostCost = 10000;
let skibidiBoostMult = 1;
let passiveModeOn = true;
let netSkibidiWorth = 0;
let activeEffects = [];

const skibidiCountElement = document.getElementById('skibidi-count');
const skibidiButton = document.getElementById('increment-skibidi-button');
const upgradeButton = document.getElementById('upgrade-button');
const upgradeInfoElement = document.getElementById('upgrade-info');
const skibidiBoostButton = document.getElementById('skibidi-boost-button');
const boostInfoCostElement = document.getElementById('skibidi-boost-info-1');
const boostInfoMultElement = document.getElementById('skibidi-boost-info-2');
const playerIdentity = document.getElementById('playerIdentity');

function saveGame() {
    const gameState = {
        skibidi,
        upgrades,
        upgradeCost,
        skibidiPerClick,
        skibidiBoosts,
        skibidiBoostCost,
        skibidiBoostMult,
        passiveModeOn,
        couponAmount,
        couponEffectWeights,
        currentWeightSum,
        netSkibidiWorth,
        activeEffects,
    };
    localStorage.setItem('skibidiGame', JSON.stringify(gameState));
}

function loadGame() {
    let gameState = localStorage.getItem('skibidiGame');
    if (gameState) {
        gameState = JSON.parse(gameState);
        skibidi = gameState.skibidi;
        upgrades = gameState.upgrades;
        upgradeCost = gameState.upgradeCost;
        skibidiPerClick = gameState.skibidiPerClick;
        skibidiBoosts = gameState.skibidiBoosts;
        skibidiBoostCost = gameState.skibidiBoostCost;
        skibidiBoostMult = gameState.skibidiBoostMult;
        passiveModeOn = gameState.passiveModeOn;
        couponAmount = gameState.couponAmount;
        couponEffectWeights = gameState.couponEffectWeights;
        currentWeightSum = gameState.currentWeightSum;
        netSkibidiWorth = gameState.netSkibidiWorth;
        activeEffects = []; //TODO: preserve timers
    }
    updateUI();
}

function resetGame() {
    skibidi = 0;
    upgrades = 0;
    upgradeCost = 50;
    skibidiPerClick = 1;
    skibidiBoosts = 0;
    skibidiBoostCost = 10000;
    skibidiBoostMult = 1;
    passiveModeOn = true;
    couponAmount = 0;
    couponEffectWeights = {
        getSkibidi:3.5,
        cheaperUpgrades:1.5,
        crits:2,
        productionBoost:2,
        moreCoupons:1,
    };
    currentWeightSum = 10;
    netSkibidiWorth = 0;
    activeEffects = [];
    updateUI();
}

function updateUI() {
    skibidiCountElement.textContent = `Skibidi: ${normFormat(skibidi, 3, 1)}`;
    upgradeInfoElement.textContent = `Upgrade cost: ${normFormat(upgradeCost, 3, 1)} | Power: ${normFormat(upgrades+1, 3, 1)}`;
    upgradeButton.disabled = skibidi < upgradeCost;
    boostInfoCostElement.textContent = `Cost: ${normFormat(skibidiBoostCost, 3, 1)}`;
    boostInfoMultElement.textContent = `Skibidi multiplier: x${normFormat(skibidiBoostMult, 3, 1)} | Next: x${normFormat(skibidiBoostMult + 0.3 + skibidiBoosts / 10, 3, 1)}`;
    skibidiBoostButton.disabled = skibidi < skibidiBoostCost;
    skibidiCouponButton.disabled = (couponAmount == 0);
    skibidiCouponInfoElement.textContent = `Current amount: ${couponAmount}/1`;
    playerIdentity.textContent = `${getPlayerIdentity()}`;
    checkLockedFeatures();
}

function getPlayerIdentity() {
    let identity = playerIdentities[0];
    for (i = 0; i < playerIdentityMilestones.length; i++) {
        if (netSkibidiWorth < playerIdentityMilestones[i]) {
            identity = playerIdentities[i-1];
            break;
        }
    };
    return identity;
}

function checkLockedFeatures() {
    if (netSkibidiWorth >= 10000) {
        document.getElementById('skibidi-boost').style.display = 'inline-block';
        document.getElementById('skibidi-boost-locked').style.display = 'none';
    } else {
        document.getElementById('skibidi-boost').style.display = 'none';
        document.getElementById('skibidi-boost-locked').style.display = 'inline-block';
    }
    if (netSkibidiWorth >= 1e9) {
        document.getElementById('skibidi-coupon').style.display = 'inline-block';
        document.getElementById('skibidi-coupon-locked').style.display = 'none';
    } else {
        document.getElementById('skibidi-coupon').style.display = 'none';
        document.getElementById('skibidi-coupon-locked').style.display = 'inline-block';
    }
}

function incrementSkibidi(multiplier = 1, manual = 0) {
    skibidi += skibidiPerClick * skibidiBoostMult * multiplier * skibidiMultEffect;
    netSkibidiWorth += skibidiPerClick * skibidiBoostMult * multiplier * skibidiMultEffect;
    for (i = 0; i < multiplier; i++) {
        if (netSkibidiWorth >= 1e9 && couponAmount < 1 && manual == 1 && Math.random() <= 0.003) {
            couponAmount++;
            showNotification('You found a Coupon!', 'yellow');
        } 
    }
    updateUI();
}

function buySkibidiPower() {
    if (skibidi >= upgradeCost) {
        skibidi -= upgradeCost;
        upgradeCost += 50 + upgrades;
        upgrades++;
        skibidiPerClick++;
        updateUI();
    }
}

function buySkibidiBoost() {
    if (skibidi >= skibidiBoostCost) {
        skibidi -= skibidiBoostCost;
        skibidiBoostCost += 10000 * (skibidiBoosts ** 1.2 + 1);
        skibidiBoostMult += 0.3 + 0.1 * skibidiBoosts;
        skibidiBoosts++;
        updateUI();
    }
}

function moreSkibidi() {incrementSkibidi(100, 0)};

skibidiButton.addEventListener('click', () => {
    incrementSkibidi(1, 1);
});

upgradeButton.addEventListener('click', () => {
    buySkibidiPower();
});

skibidiBoostButton.addEventListener('click', () => {
    buySkibidiBoost();
});

skibidiCouponButton.addEventListener('click', () => {
    doSkibidiCouponRoll();
});

setInterval(() => {
    if (passiveModeOn) {
        incrementSkibidi(1, 0);
    }
    saveGame();
}, 1000);

loadGame();
updateUI(); 