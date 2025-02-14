const save_notif = document.getElementById('save-notification');

function updateAllVariables(info = {}, mode = 'default') {
    switch (mode) {                                                                     //game_skibidi
        case 'default': game_skibidi = info[game_skibidi] ?? 0;
        case 'reset': game_skibidi = 0;
        case 'force': game_skibidi = info[game_skibidi];}
    switch (mode) {                                                                      //game_baseUpgradeCost
        case 'default': game_baseUpgradeCost = info[game_baseUpgradeCost] ?? 50;
        case 'reset': game_baseUpgradeCost = 50;
        case 'force': game_baseUpgradeCost = info[game_baseUpgradeCost];}
    switch (mode) {                                                                      //game_baseSkibidiPerClick
        case 'default': game_baseSkibidiPerClick = info[game_baseSkibidiPerClick] ?? 1;
        case 'reset': game_baseSkibidiPerClick = 1;
        case 'force': game_baseSkibidiPerClick = info[game_baseSkibidiPerClick];}
    switch (mode) {                                                                      //game_skibidiBoosts
        case 'default': game_skibidiBoosts = info[game_skibidiBoosts] ?? 0;
        case 'reset': game_skibidiBoosts = 0;
        case 'force': game_skibidiBoosts = info[game_skibidiBoosts];}
    switch (mode) {                                                                      //game_baseSkibidiBoostCost
        case 'default': game_baseSkibidiBoostCost = info[game_baseSkibidiBoostCost] ?? 10000;
        case 'reset': game_baseSkibidiBoostCost = 10000;
        case 'force': game_baseSkibidiBoostCost = info[game_baseSkibidiBoostCost];}
    switch (mode) {                                                                          //game_passiveModeOn
        case 'default': game_skibidiBoostMult = info[game_skibidiBoostMult] ?? 1;
        case 'reset': game_skibidiBoostMult = 1;
        case 'force': game_skibidiBoostMult = info[game_skibidiBoostMult];}
    switch (mode) {                                                                          //game_passiveModeOn
        case 'default': game_passiveModeOn = info[game_passiveModeOn] ?? true;
        case 'reset': game_passiveModeOn = true;
        case 'force': game_passiveModeOn = info[game_passiveModeOn];}
    switch (mode) {                                                                          //game_effs_couponEffectWeights
        case 'default': game_effs_couponEffectWeights = info[game_effs_couponEffectWeights] ?? {getSkibidi:3.5,cheaperUpgrades:1.5,crits:2,productionBoost:2,moreCoupons:1};
        case 'reset': game_effs_couponEffectWeights = {getSkibidi:3.5,cheaperUpgrades:1.5,crits:2,productionBoost:2,moreCoupons:1};
        case 'force': game_effs_couponEffectWeights = info[game_effs_couponEffectWeights];}
    switch (mode) {                                                                          //game_effs_couponAmount
        case 'default': game_effs_couponAmount = info[game_effs_couponAmount] ?? 0;
        case 'reset': game_effs_couponAmount = 0;
        case 'force': game_effs_couponAmount = info[game_effs_couponAmount];}
    switch (mode) {                                                                          //game_effs_currentWeightSum
        case 'default': game_effs_currentWeightSum = info[game_effs_currentWeightSum] ?? 10;
        case 'reset': game_effs_currentWeightSum = 10;
        case 'force': game_effs_currentWeightSum = info[game_effs_currentWeightSum];}
    switch (mode) {                                                                          //game_scrap_skibidiScrap
        case 'default': game_scrap_skibidiScrap = info[game_scrap_skibidiScrap] ?? 0;
        case 'reset': game_scrap_skibidiScrap = 0;
        case 'force': game_scrap_skibidiScrap = info[game_scrap_skibidiScrap];}
    switch (mode) {                                                                          //game_netSkibidiWorth
        case 'default': game_netSkibidiWorth = info[game_netSkibidiWorth] ?? 0;
        case 'reset': game_netSkibidiWorth = 0;
        case 'force': game_netSkibidiWorth = info[game_netSkibidiWorth];}
    switch (mode) {                                                                          //game_scrap_skibidiGainSU
        case 'default': game_scrap_skibidiGainSU = info[game_scrap_skibidiGainSU] ?? new ScrapUpgrade(4, 4, 0, (x) => (x+2));
        case 'reset': game_scrap_skibidiGainSU = new ScrapUpgrade(4, 4, 0, (x) => (x+2));
        case 'force': game_scrap_skibidiGainSU = info[game_scrap_skibidiGainSU];}
    switch (mode) {                                                                          //game_scrap_maxCouponsSU
        case 'default': game_scrap_maxCouponsSU = info[game_scrap_maxCouponsSU] ?? new ScrapUpgrade(6, 6, 0, (x) => (x+3));
        case 'reset': game_scrap_maxCouponsSU = new ScrapUpgrade(6, 6, 0, (x) => (x+3));
        case 'force': game_scrap_maxCouponsSU = info[game_scrap_maxCouponsSU];}
    switch (mode) {                                                                          //game_scrap_skibidiGainSU
        case 'default': game_scrap_upgradeBulkSU = info[game_scrap_upgradeBulkSU] ?? new ScrapUpgrade(6, 6, 0, (x) => (x+2));
        case 'reset': game_scrap_upgradeBulkSU = new ScrapUpgrade(6, 6, 0, (x) => (x+2));
        case 'force': game_scrap_upgradeBulkSU = info[game_scrap_upgradeBulkSU];}
    switch (mode) {                                                                          //game_scrap_skibidiGainSU
        case 'default': game_scrap_boostBulkSU = info[game_scrap_boostBulkSU] ?? new ScrapUpgrade(6, 6, 0, (x) => (x+2));
        case 'reset': game_scrap_boostBulkSU = new ScrapUpgrade(6, 6, 0, (x) => (x+2));
        case 'force': game_scrap_boostBulkSU = info[game_scrap_boostBulkSU];}
}

function showBadSaveNotif() {
    save_notif.style = 'display: inline-block';
}

function badSaveReset() {
    game_resetGame();
    game_saveGame();
    save_notif.style = 'display: none';
    game_loadGame();
}

function badSaveDefault() {
    for(i of Object.keys(game_const_var_defaults)) {
        if (eval(i) === undefined || eval(i) === NaN || eval(i) === null) { // witchery (it dosn't even work)
            eval(i = game_const_var_defaults[i]);
        }
    }
    game_saveGame();
    save_notif.style = 'display: none';
    game_loadGame();
}

function badSaveContinue() {
    save_notif.style = 'display: none';
}


function game_saveGame() {
    const gameState = {};
    for (i of Object.keys(game_const_var_defaults)) {
        gameState[i] = eval(i); // sure hope it works
    };
    localStorage.setItem('skibidiGame', JSON.stringify(gameState));
}

function game_loadGame() {
    let gameState = localStorage.getItem('skibidiGame');
    if (gameState) {
        gameState = JSON.parse(gameState);
        for (value of Object.keys(game_const_var_defaults)) {
            if (gameState[value] === undefined || gameState[value] === NaN || gameState[value] === null) {
                console.log(gameState[value], value);
                showBadSaveNotif();
            }
        }
        game_skibidi = gameState.game_skibidi;
        game_upgrades = gameState.game_upgrades;
        game_baseUpgradeCost = gameState.game_baseUpgradeCost;
        game_baseSkibidiPerClick = gameState.game_baseSkibidiPerClick;
        game_skibidiBoosts = gameState.game_skibidiBoosts;
        game_baseSkibidiBoostCost = gameState.game_baseSkibidiBoostCost;
        game_skibidiBoostMult = gameState.game_skibidiBoostMult;
        game_passiveModeOn = gameState.game_passiveModeOn;
        game_effs_couponAmount = gameState.game_effs_couponAmount;
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
    game_scrap_skibidiGainSU = new ScrapUpgrade(4, 4, 0, (x) => (x+2));
    game_scrap_maxCouponsSU = new ScrapUpgrade(6, 6, 0, (x) => (x+3));
    game_scrap_upgradeBulkSU = new ScrapUpgrade(6, 6, 0, (x) => (x+2));
    game_scrap_boostBulkSU = new ScrapUpgrade(6, 6, 0, (x) => (x+2));
}