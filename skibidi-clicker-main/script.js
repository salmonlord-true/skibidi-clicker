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
let game_upgradeCostsMult = 1;
let game_currentSkibidiBoostCost = 10000;
let game_skibidiBoostMult = 1;
let game_passiveModeOn = true;
let game_netSkibidiWorth = 0;
let game_upgradeBulk = 1;
let game_boostBulk = 1;
let game_SU1SkibidiMult = 1;
let time;

const game_const_upgradeCostFunc = (x) => (0.5*x**2 + 48.5*x + 1);
const game_const_cumUpgradeCostFunc = (x) => (1/6 * x**3 + 24.5 * x**2 + 76/3 * x);
const game_const_boostCostFunc = (x) => (x==1? 10000 : 10000*(0.045 + x + (x-2)**2.2/2.2 + (x-2)**1.2/2))
const game_const_cumBoostCostFunc = (x) => (10000*(0.045*x + x*(x+1)/2 + 0.5*((x-2)**2.2/2.2 + (x-2)**1.2/2 + 0.045) + 1/2.2*((x-2)**3.2/3.2 + (x-2)**2.2/2 + 0.019*x**1.2)));

const game_const_skibidiCountElement = document.getElementById('skibidi-count');
const game_const_skibidiButton = document.getElementById('increment-skibidi-button');
const game_const_upgradeButton = document.getElementById('upgrade-button');
const game_const_upgradeInfoElement = document.getElementById('upgrade-info');
const game_const_skibidiBoostButton = document.getElementById('skibidi-boost-button');
const game_const_boostInfoCostElement = document.getElementById('skibidi-boost-info-1');
const game_const_boostInfoMultElement = document.getElementById('skibidi-boost-info-2');
const game_const_playerIdentity = document.getElementById('playerIdentity');

function game_updateUI() {
    game_upgradeCostsMult = 1 / Effect.upgradeCostMult;
    game_currentUpgradeCost = game_baseUpgradeCost * game_upgradeCostsMult;
    game_currentSkibidiBoostCost = game_baseSkibidiBoostCost * game_upgradeCostsMult;
    game_scrap_skibidiScrapCost = 1e9 * 1.5**game_scrap_skibidiScrap;
    game_upgradeBulk = Math.round(1 + game_scrap_upgradeBulkSU.amount * 1.3**game_scrap_upgradeBulkSU.amount);
    game_boostBulk = Math.round(1 + game_scrap_boostBulkSU.amount * 1.25**game_scrap_boostBulkSU.amount);
    game_SU1SkibidiMult = 1.2**game_scrap_skibidiGainSU.amount;
    game_effs_maxCoupons = 1 + game_scrap_maxCouponsSU.amount;

    game_const_skibidiCountElement.textContent = `Skibidi: ${normFormat(game_skibidi, 3, 1)}`;
    game_const_upgradeInfoElement.textContent = `Upgrade cost: ${normFormat(game_currentUpgradeCost, 3, 1)} | Power: ${normFormat(game_upgrades+1, 3, 1)}`;
    game_const_upgradeButton.disabled = game_skibidi < game_currentUpgradeCost;
    game_const_boostInfoCostElement.textContent = `Cost: ${normFormat(game_currentSkibidiBoostCost, 3, 1)}`;
    game_const_boostInfoMultElement.textContent = `Skibidi multiplier: x${normFormat(game_skibidiBoostMult, 3, 1)} | Next: x${normFormat(game_skibidiBoostMult + 0.3 + game_skibidiBoosts / 10, 3, 1)}`;
    game_const_skibidiBoostButton.disabled = game_skibidi < game_currentSkibidiBoostCost;
    game_const_skibidiCouponButton.disabled = (game_effs_couponAmount <= 0);
    game_const_skibidiCouponInfoElement.textContent = `Current amount: ${game_effs_couponAmount}/${game_effs_maxCoupons}`;
    game_const_playerIdentity.textContent = `${game_getPlayerIdentity()}`;
    game_const_skibidiScrapButton.disabled = game_skibidi < game_scrap_skibidiScrapCost;
    game_const_skibidiScrapInfoElement.textContent = `You have ${game_scrap_skibidiScrap} Skibidi Scrap.`;
    game_const_skibidiScrapCostElement.textContent = `(Cost: ${normFormat(game_scrap_skibidiScrapCost, 3, 1)})`;
    game_const_SU1InfoElement.textContent = `Cost: ${game_scrap_skibidiGainSU.cost} Scrap | Bought: ${game_scrap_skibidiGainSU.amount} (Effect: x${normFormat(1.2**game_scrap_skibidiGainSU.amount, 3, 1)})`;
    game_const_SU2InfoElement.textContent = `Cost: ${game_scrap_maxCouponsSU.cost} Scrap | Bought: ${game_scrap_maxCouponsSU.amount}`;
    game_const_SU3InfoElement.textContent = `Cost: ${game_scrap_upgradeBulkSU.cost} Scrap | Bought: ${game_scrap_upgradeBulkSU.amount} (Effect: ${normFormat(game_upgradeBulk, 3, 1)})`;
    game_const_SU4InfoElement.textContent = `Cost: ${game_scrap_boostBulkSU.cost} Scrap | Bought: ${game_scrap_boostBulkSU.amount} (Effect: ${normFormat(game_boostBulk, 3, 1)})`;
    game_const_SU1Button.disabled = game_scrap_skibidiScrap < game_scrap_skibidiGainSU.cost;
    game_const_SU2Button.disabled = game_scrap_skibidiScrap < game_scrap_maxCouponsSU.cost;
    game_const_SU3Button.disabled = game_scrap_skibidiScrap < game_scrap_upgradeBulkSU.cost;
    game_const_SU4Button.disabled = game_scrap_skibidiScrap < game_scrap_boostBulkSU.cost;
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
    const isCrit = (manual == 1 && Math.random() <= Effect.critChance)
    game_skibidi += game_getSkibidiGain(multiplier, isCrit);
    game_netSkibidiWorth += game_getSkibidiGain(multiplier, isCrit);
    if (manual == 1) {
        for (i = 0; i < multiplier; i++) {
            if (game_netSkibidiWorth >= 1e9 && game_effs_couponAmount < game_effs_maxCoupons && Math.random() <= Effect.couponChance) {
                game_effs_couponAmount++;
                new Notification('You found a Coupon!', 'yellow');
            } 
        }
    };
    //if (critMult != 1) {showNotification('Critical hit!', 'blue')};
    game_updateUI();
}

function game_getSkibidiGain(multiplier = 1, isCrit = false) {
    let gain = 1;
    gain *= game_baseSkibidiPerClick;
    gain *= game_skibidiBoostMult;
    gain *= multiplier;
    gain *= Effect.skibidiProductionMult;
    gain *= game_SU1SkibidiMult;
    isCrit? gain *= Effect.critClickMult : gain;
    return gain;
}

function game_buySkibidiPower(amount = 1) {
    let tryToBuy = (x) => {   //the buying function
        let step = Math.max(1, x/100), num;    //the step is either 1 or bulk/100, whatever's larger
        // console.log(`x = ${x}`)
        // console.log(`step = ${step}`)
        for (i = 1; i <= 100 && i <= x; i++) {
            num = Math.floor(step*(i+1)) - Math.floor(step*i); //amount purchased in each step
            // console.log(`num = ${num}`)
            if (game_skibidi >= num*game_const_upgradeCostFunc(game_upgrades + num/2 + 0.5)*game_upgradeCostsMult) {  // step cost = average cost * step size
                game_skibidi -= num*game_const_upgradeCostFunc(game_upgrades + num/2 + 0.5)*game_upgradeCostsMult;
                game_upgrades += num;
                game_baseSkibidiPerClick += num;
                game_baseUpgradeCost = game_const_upgradeCostFunc(game_upgrades + 1);
            } else {
                if (x > 1 && step > game_upgrades / 1e7) {tryToBuy(x/100); return} // recursive buying
                else {
                    game_updateUI();
                    return;
                }
            }
            };
        }
    tryToBuy(amount);
    game_updateUI();
}


function approximateRoots(equName, rhs, steps, spent=undefined, guess=undefined) { // equation name out of 'skibipower' and 'skibiboost'; right-hand side; approximation steps (Newton method)
    let costFunc, costFuncDeriv;         // 7 steps for skibipower, 9 steps for skibiboost.
    if (equName == 'skibipower') {
        spent = (spent ?? game_const_cumUpgradeCostFunc(game_upgrades));
        costFunc = game_const_cumUpgradeCostFunc;
        costFuncDeriv = (x) => (1/2 * x**2 + 49 * x + 76/3);
        guess = guess ?? Math.cbrt(6*rhs);
    }
    if (equName == 'skibiboost') {
        //costFunc = (x) => 10000*((x-2)**2.2/2.2 + (x-2)**1.2/2 + 0.045 + x); // cost of n'th skibiboost
        spent = spent ?? 10000*game_const_cumBoostCostFunc(game_skibidiBoosts);
        costFunc = (x) => game_const_cumBoostCostFunc; // cumulative cost of first n skibiboosts
        costFuncDeriv = (x) => (10000*(0.045 + x+0.5 + 0.5*((x-2)**1.2/2.2*2.2 + (x-2)**0.2/2*1.2) + 1/2.2*((x-2)**2.2/3.2*3.2 + (x-2)*1.2/2*2.2 + 0.019*x**0.2*1.2)));
        guess = guess ?? rhs**(1/3.2)/10;   //note: can return NaN if trying to purchase a very small amount of boosts
    }
    for (i = 0; i < steps; i++) {
        console.log(guess);
        guess = guess - (costFunc(guess) - (rhs + spent))/costFuncDeriv(guess); // the NaN check doesn't work :(
    }
    return guess;
}

function game_buySkibidiBoost(amount = 1) {
    let tryToBuy = (x) => {   //look at upgrade bulk buy function for comments
        let step = Math.max(1, x/100), num;
        for (i = 1; i <= 100 && i <= x; i++) {
            num = Math.floor(step*(i+1)) - Math.floor(step*i);
            if (game_skibidi >= num*game_const_boostCostFunc(game_skibidiBoosts + num/2 + 0.5)*game_upgradeCostsMult) {
                game_skibidi -= num*game_const_boostCostFunc(game_skibidiBoosts + num/2 + 0.5)*game_upgradeCostsMult;
                game_skibidiBoosts += num;
                game_skibidiBoostMult = 1 + 0.25*game_skibidiBoosts + 0.05*game_skibidiBoosts**2;
                game_baseSkibidiBoostCost = game_const_boostCostFunc(game_skibidiBoosts + 1);
            } else {
                if (x > 1 && step > game_skibidiBoosts / 1e7) {tryToBuy(x/100); return}
                else {
                    game_updateUI();
                    return;
                }
            }
            };
        }
    tryToBuy(amount);
    game_updateUI();
}

game_const_skibidiButton.addEventListener('click', () => {
    game_incrementSkibidi(1, 1);
});

game_const_upgradeButton.addEventListener('click', () => {
    game_buySkibidiPower(game_upgradeBulk);
});

game_const_skibidiBoostButton.addEventListener('click', () => {
    game_buySkibidiBoost(game_boostBulk);
});

game_const_skibidiCouponButton.addEventListener('click', () => {
    game_effs_doSkibidiCouponRoll();
});

game_const_skibidiScrapButton.addEventListener('click', () => {
    game_scrap_buySkibidiScrap();
});

game_const_SU1Button.addEventListener('click', () => {
    game_scrap_skibidiGainSU.buyUpgrade(1);
    game_updateUI();
});

game_const_SU2Button.addEventListener('click', () => {
    game_scrap_maxCouponsSU.buyUpgrade(1);
    game_updateUI();
});

game_const_SU3Button.addEventListener('click', () => {
    game_scrap_upgradeBulkSU.buyUpgrade(1);
    game_updateUI();
});

game_const_SU4Button.addEventListener('click', () => {
    game_scrap_boostBulkSU.buyUpgrade(1);
    game_updateUI();
});

setInterval(() => {
    if (time != undefined && Date.now() - time >= 10000) {game_offlineProgress(Date.now() - time)}
    time = Date.now();
    if (game_passiveModeOn) {
        game_incrementSkibidi(1, 0);
    }
    game_saveGame();
}, 1000);

if (time != undefined && Date.now() - time >= 10000) {game_offlineProgress(Date.now() - time)}
game_loadGame();
game_updateUI(); 