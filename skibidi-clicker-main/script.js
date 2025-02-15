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

// const game_const_var_defaults = {
//     game_skibidi: 0,
//     game_currentUpgradeCost: 50,
//     game_baseUpgradeCost: 50,
//     game_baseSkibidiPerClick: 1,
//     game_skibidiBoosts: 0,
//     game_baseSkibidiBoostCost: 10000,
//     game_currentSkibidiBoostCost: 10000,
//     game_skibidiBoostMult: 1,
//     game_passiveModeOn: true,
//     game_effs_couponEffectWeights: {
//         getSkibidi:3.5,
//         cheaperUpgrades:1.5,
//         crits:2,
//         productionBoost:2,
//         moreCoupons:1,
//     },
//     game_effs_couponAmount: 0,
//     game_effs_currentWeightSum: 10,
//     game_scrap_skibidiScrap: 0,
//     game_netSkibidiWorth: game_skibidi + game_upgrades * game_baseUpgradeCost / 2 + game_skibidiBoosts * game_baseUpgradeCost / 2, //estimation. why am i doing this no one will ever have this problem
//     game_scrap_skibidiGainSU: new ScrapUpgrade(4, 4, 0, (x) => (x+2)),
//     game_scrap_maxCouponsSU: new ScrapUpgrade(6, 6, 0, (x) => (x+3)),
//     game_scrap_upgradeBulkSU: new ScrapUpgrade(6, 6, 0, (x) => (x+2)),
//     game_scrap_boostBulkSU: new ScrapUpgrade(6, 6, 0, (x) => (x+2)),
// }

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
    Effect.updateMults();
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
                new Notification('You found a Coupon!', 'yellow');
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