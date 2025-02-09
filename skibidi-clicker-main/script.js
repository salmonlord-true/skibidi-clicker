const game_const_playerIdentities = [
    "You are a Lil Baby Skibidi 👶🏼🚽",
    "You are a Small Skibidi 🧑🚽",
    "You are an Average Skibidi ⬆️🧑🚽⬆️",
    "You are a Big Skibidi 👨🏻🚽😎😎",
    "You are a Giant Skibidi 🔥🔥💥👨🏻🚽😎😎",
    "You are a Mega Skibidi Toilet 💥💥💥👿🚽💥💥💥",
    "You are a Giga Skibidi Toilet 💥💥⬆️👿🚽🚽🚽⬆️💥💥",
    "You are an Enormous Skibidi Toilet 💥💥🧑🚽⬆️⬆️👹🚽🚽🚽⬆️⬆️🧑🚽💥💥",
];
const game_const_playerIdentityMilestones = [
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
let game_skibidi = 0;
let game_upgrades = 0;
let game_baseUpgradeCost = 50;
let game_currentUpgradeCost = 50;
let game_baseSkibidiPerClick = 1;
let game_skibidiBoosts = 0;
let game_baseSkibidiBoostCost = 10000;
let game_currentSkibidiBoostCost = 10000;
let game_skibidiBoostMult = 1;
let game_passiveModeOn = true;
let game_netSkibidiWorth = 0;

const game_const_skibidiCountElement = document.getElementById('skibidi-count');
const game_const_skibidiButton = document.getElementById('increment-skibidi-button');
const game_const_upgradeButton = document.getElementById('upgrade-button');
const game_const_upgradeInfoElement = document.getElementById('upgrade-info');
const game_const_skibidiBoostButton = document.getElementById('skibidi-boost-button');
const game_const_boostInfoCostElement = document.getElementById('skibidi-boost-info-1');
const game_const_boostInfoMultElement = document.getElementById('skibidi-boost-info-2');
const game_const_playerIdentity = document.getElementById('playerIdentity');

function game_saveGame() {
    const gameState = {
        game_skibidi: game_skibidi,
        game_upgrades: game_upgrades,
        game_upgradeCost: game_baseUpgradeCost,
        game_skibidiPerClick: game_baseSkibidiPerClick,
        game_skibidiBoosts: game_skibidiBoosts,
        game_skibidiBoostCost: game_baseSkibidiBoostCost,
        game_baseSkibidiBoostCost: game_baseSkibidiBoostCost,
        game_skibidiBoostMult: game_skibidiBoostMult,
        game_passiveModeOn: game_passiveModeOn,
        game_effs_couponEffectWeights: game_effs_couponEffectWeights,
        game_effs_couponAmount: game_effs_couponAmount,
        game_effs_currentWeightSum: game_effs_currentWeightSum,
        game_netSkibidiWorth: game_netSkibidiWorth,
        game_scrap_skibidiScrap: game_scrap_skibidiScrap,
        game_scrap_skibidiGainSU: game_scrap_skibidiGainSU,
        game_scrap_maxCouponsSU: game_scrap_maxCouponsSU,
        game_scrap_upgradeBulkSU: game_scrap_upgradeBulkSU,
        game_scrap_boostBulkSU: game_scrap_boostBulkSU,
    };
    localStorage.setItem('skibidiGame', JSON.stringify(gameState));
}

function game_loadGame() {
    let gameState = localStorage.getItem('skibidiGame');
    if (gameState) {
        gameState = JSON.parse(gameState);
        game_skibidi = gameState.game_skibidi;
        game_upgrades = gameState.game_upgrades;
        game_baseUpgradeCost = gameState.game_upgradeCost;
        game_baseSkibidiPerClick = gameState.game_skibidiPerClick;
        game_skibidiBoosts = gameState.game_skibidiBoosts;
        game_baseSkibidiBoostCost = gameState.game_baseSkibidiBoostCost;
        game_skibidiBoostMult = gameState.game_skibidiBoostMult;
        game_passiveModeOn = gameState.game_passiveModeOn;
        game_effs_couponAmount = gameState.game_couponAmount;
        game_effs_couponEffectWeights = gameState.game_effs_couponEffectWeights;
        game_effs_currentWeightSum = gameState.game_effs_currentWeightSum;
        game_netSkibidiWorth = gameState.game_netSkibidiWorth;
        game_scrap_skibidiScrap = gameState.game_scrap_skibidiScrap;
        game_scrap_skibidiGainSU = gameState.game_scrap_skibidiGainSU;
        game_scrap_maxCouponsSU = gameState.game_scrap_maxCouponsSU;
        game_scrap_upgradeBulkSU = gameState.game_scrap_upgradeBulkSU;
        game_scrap_boostBulkSU = gameState.game_scrap_boostBulkSU;
        Effect.effects = []; //TODO: preserve timers. or not.
        Effect.updateMults();
    }
    game_updateUI();
}

function game_resetGame() {
    game_skibidi = 0;
    game_upgrades = 0;
    game_baseUpgradeCost = 50;
    game_baseSkibidiPerClick = 1;
    game_skibidiBoosts = 0;
    game_baseSkibidiBoostCost = 10000;
    game_skibidiBoostMult = 1;
    game_passiveModeOn = true;
    game_effs_couponAmount = 0;
    game_effs_couponEffectWeights = {
        getSkibidi:3.5,
        cheaperUpgrades:1.5,
        crits:2,
        productionBoost:2,
        moreCoupons:1,
    };
    game_effs_currentWeightSum = 10;
    game_netSkibidiWorth = 0;
    game_scrap_skibidiScrap = 0;
    Effect.effects = [];
    //game_scrap_skibidiGainSU.reset();
    //game_scrap_maxCouponsSU.reset();
    //game_scrap_upgradeBulkSU.reset();
    //game_scrap_boostBulkSU.reset();
}

function game_updateUI() {
    game_currentUpgradeCost = game_baseUpgradeCost / Effect.upgradeCostMult;
    game_currentSkibidiBoostCost = game_baseSkibidiBoostCost / Effect.upgradeCostMult;
    game_scrap_skibidiScrapCost = 1e9 * 1.5**game_scrap_skibidiScrap

    game_const_skibidiCountElement.textContent = `Skibidi: ${normFormat(game_skibidi, 3, 1)}`;
    game_const_upgradeInfoElement.textContent = `Upgrade cost: ${normFormat(game_currentUpgradeCost, 3, 1)} | Power: ${normFormat(game_upgrades+1, 3, 1)}`;
    game_const_upgradeButton.disabled = game_skibidi < game_currentUpgradeCost;
    game_const_boostInfoCostElement.textContent = `Cost: ${normFormat(game_currentSkibidiBoostCost, 3, 1)}`;
    game_const_boostInfoMultElement.textContent = `Skibidi multiplier: x${normFormat(game_skibidiBoostMult, 3, 1)} | Next: x${normFormat(game_skibidiBoostMult + 0.3 + game_skibidiBoosts / 10, 3, 1)}`;
    game_const_skibidiBoostButton.disabled = game_skibidi < game_currentSkibidiBoostCost;
    game_const_skibidiCouponButton.disabled = (game_effs_couponAmount <= 0);
    game_const_skibidiCouponInfoElement.textContent = `Current amount: ${game_effs_couponAmount}/1`;
    game_const_playerIdentity.textContent = `${game_getPlayerIdentity()}`;
    game_const_skibidiScrapButton.disabled = game_skibidi < game_scrap_skibidiScrapCost;
    game_const_skibidiScrapInfoElement.textContent = `You have ${game_scrap_skibidiScrap} Skibidi Scrap.`;
    game_const_skibidiScrapCostElement.textContent = `(Cost: ${normFormat(game_scrap_skibidiScrapCost, 3, 1)})`;
    game_checkLockedFeatures();
}

function game_getPlayerIdentity() {
    let identity = game_const_playerIdentities[0];
    for (i = 0; i < game_const_playerIdentityMilestones.length; i++) {
        if (game_netSkibidiWorth < game_const_playerIdentityMilestones[i]) {
            identity = game_const_playerIdentities[i-1];
            break;
        }
    };
    return identity;
}

function game_checkLockedFeatures() {
    document.getElementById('skibidi-boost-locked').style.display = 'none';
    document.getElementById('skibidi-boost').style.display = 'none';
    document.getElementById('skibidi-coupon-locked').style.display = 'none';
    document.getElementById('skibidi-coupon').style.display = 'none';
    document.getElementById('skibidi-scrap-locked').style.display = 'none';
    document.getElementById('skibidi-scrap-artifacts').style.display = 'none';

    if (game_netSkibidiWorth < 10000) {
        document.getElementById('skibidi-boost-locked').style.display = 'inline-block';
        document.getElementById('skibidi-coupon-locked').style.display = 'inline-block';
    } else if (game_netSkibidiWorth >= 10000 && game_netSkibidiWorth < 1e9) {
        document.getElementById('skibidi-boost').style.display = 'inline-block';
        document.getElementById('skibidi-coupon-locked').style.display = 'inline-block';
    } else if (game_netSkibidiWorth >= 1e9 && game_netSkibidiWorth < 5e9) {
        document.getElementById('skibidi-boost').style.display = 'inline-block';
        document.getElementById('skibidi-coupon').style.display = 'inline-block';
        document.getElementById('skibidi-scrap-locked').style.display = 'inline-block';
    } else if (game_netSkibidiWorth >= 5e9) {
        document.getElementById('skibidi-boost').style.display = 'inline-block';
        document.getElementById('skibidi-coupon').style.display = 'inline-block';
        document.getElementById('skibidi-scrap-artifacts').style.display = 'inline-block';
    }
}

function game_incrementSkibidi(multiplier = 1, manual = 0) {
    const critMult = 1 + (Effect.critClickMult-1)*(manual == 1 && Math.random() <= Effect.critChance)
    game_skibidi += game_baseSkibidiPerClick * game_skibidiBoostMult * multiplier * Effect.skibidiProductionMult * critMult;
    game_netSkibidiWorth += game_baseSkibidiPerClick * game_skibidiBoostMult * multiplier * Effect.skibidiProductionMult * critMult;
    if (manual == 1) {
        for (i = 0; i < multiplier; i++) {
            if (game_netSkibidiWorth >= 1e9 && game_effs_couponAmount < 1 && Math.random() <= Effect.couponChance) {
                game_effs_couponAmount++;
                showNotification('You found a Coupon!', 'yellow');
            } 
        }
    };
    //if (critMult != 1) {showNotification('Critical hit!', 'blue')};
    game_updateUI();
}

function game_buySkibidiPower() {
    if (game_skibidi >= game_currentUpgradeCost) {
        game_skibidi -= game_currentUpgradeCost;
        game_baseUpgradeCost += 50 + game_upgrades;
        game_upgrades++;
        game_baseSkibidiPerClick++;
        game_updateUI();
    }
}

function game_buySkibidiBoost() {
    if (game_skibidi >= game_currentSkibidiBoostCost) {
        game_skibidi -= game_currentSkibidiBoostCost;
        game_baseSkibidiBoostCost += 10000 * (game_skibidiBoosts ** 1.2 + 1);
        game_skibidiBoostMult += 0.3 + 0.1 * game_skibidiBoosts;
        game_skibidiBoosts++;
        game_updateUI();
    }
}

function game_moreSkibidi() {game_incrementSkibidi(100, 0)};

game_const_skibidiButton.addEventListener('click', () => {
    game_incrementSkibidi(1, 1);
});

game_const_upgradeButton.addEventListener('click', () => {
    game_buySkibidiPower();
});

game_const_skibidiBoostButton.addEventListener('click', () => {
    game_buySkibidiBoost();
});

game_const_skibidiCouponButton.addEventListener('click', () => {
    game_effs_doSkibidiCouponRoll();
});

game_const_skibidiScrapButton.addEventListener('click', () => {
    game_scrap_buySkibidiScrap();
});

game_const_skibidiScrapUpgrade1Button.addEventListener('click', () => {
    game_scrap_buySkibidiScrap();
});

game_const_skibidiScrapUpgrade2Button.addEventListener('click', () => {
    game_scrap_buySkibidiScrap();
});

game_const_skibidiScrapUpgrade3Button.addEventListener('click', () => {
    game_scrap_buySkibidiScrap();
});

game_const_skibidiScrapUpgrade4Button.addEventListener('click', () => {
    game_scrap_buySkibidiScrap();
});

setInterval(() => {
    if (game_passiveModeOn) {
        game_incrementSkibidi(1, 0);
    }
    game_saveGame();
}, 1000);

game_loadGame();
game_updateUI(); 