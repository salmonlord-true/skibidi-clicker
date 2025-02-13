const game_const_vars = [
    game_skibidi,
    game_upgrades,
    game_upgradeCost,
    game_skibidiPerClick,
    game_skibidiBoosts,
    game_skibidiBoostCost,
    game_baseSkibidiBoostCost,
    game_skibidiBoostMult,
    game_passiveModeOn,
    game_effs_couponEffectWeights,
    game_effs_couponAmount,
    game_effs_currentWeightSum,
    game_netSkibidiWorth,
    game_scrap_skibidiScrap,
    game_scrap_skibidiGainSU,
    game_scrap_maxCouponsSU,
    game_scrap_upgradeBulkSU,
    game_scrap_boostBulkSU,
]

function showBadSaveNotification() {
    
}

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

async function game_loadGame() {
    let gameState = localStorage.getItem('skibidiGame');
    if (gameState) {
        gameState = JSON.parse(gameState);
        for (value of game_const_vars) {
            if (gameState[value] === undefined || gameState[value] === NaN || gameState[value] === null) {
                await showBadSaveNotification();
            }
        }
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
        const sgSU = gameState.game_scrap_skibidiGainSU;
        const mcSU = gameState.game_scrap_maxCouponsSU;
        const ubSU = gameState.game_scrap_upgradeBulkSU;
        const bbSU = gameState.game_scrap_boostBulkSU;
        game_scrap_skibidiGainSU = new ScrapUpgrade(sgSU['baseCost'], sgSU['cost'], sgSU['amount'], (x) => (x+2));
        game_scrap_maxCouponsSU = new ScrapUpgrade(mcSU['baseCost'], mcSU['cost'], mcSU['amount'], (x) => (x+3));
        game_scrap_upgradeBulkSU = new ScrapUpgrade(ubSU['baseCost'], ubSU['cost'], ubSU['amount'], (x) => (x+2));
        game_scrap_boostBulkSU = new ScrapUpgrade(bbSU['baseCost'], bbSU['cost'], bbSU['amount'], (x) => (x+2));
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
    game_scrap_skibidiGainSU.reset();
    game_scrap_maxCouponsSU.reset();
    game_scrap_upgradeBulkSU.reset();
    game_scrap_boostBulkSU.reset();
}