const save_notif = document.getElementById('save-notification');
const offline_notif = document.getElementById('offline-progress-notification');
const offline_notif_time = document.getElementById('offline-notif-time');
const offline_notif_skibidi = document.getElementById('offline-notif-skibidi');

function isEmpty(obj) {
    for (let i in obj) return false;
    return true;
}

function updateAllVariables(info = {}, mode = 'default') {
    const sgSU = info.game_scrap_skibidiGainSU ?? {};
    const mcSU = info.game_scrap_maxCouponsSU ?? {};
    const ubSU = info.game_scrap_upgradeBulkSU ?? {};
    const bbSU = info.game_scrap_boostBulkSU ?? {};
    console.log(sgSU, mcSU, ubSU, bbSU);
    switch (mode) {                                                                     //game_skibidi
        case 'default': game_skibidi = info.game_skibidi ?? 0; break;
        case 'reset': game_skibidi = 0; break;
        case 'force': game_skibidi = info.game_skibidi; break;}
    switch (mode) {                                                                     //game_skibidi
        case 'default': game_upgrades = info.game_upgrades ?? 0; break;
        case 'reset': game_upgrades = 0; break;
        case 'force': game_upgrades = info.game_upgrades; break;}
    switch (mode) {                                                                      //game_baseUpgradeCost
        case 'default': game_baseUpgradeCost = info.game_baseUpgradeCost ?? 50; break;s
        case 'reset': game_baseUpgradeCost = 50; break;
        case 'force': game_baseUpgradeCost = info.game_baseUpgradeCost; break;}
    switch (mode) {                                                                      //game_baseSkibidiPerClick
        case 'default': game_baseSkibidiPerClick = info.game_baseSkibidiPerClick ?? 1; break;
        case 'reset': game_baseSkibidiPerClick = 1; break;
        case 'force': game_baseSkibidiPerClick = info.game_baseSkibidiPerClick; break;}
    switch (mode) {                                                                      //game_skibidiBoosts
        case 'default': game_skibidiBoosts = info.game_skibidiBoosts ?? 0; break;
        case 'reset': game_skibidiBoosts = 0; break;
        case 'force': game_skibidiBoosts = info.game_skibidiBoosts; break;}
    switch (mode) {                                                                      //game_baseSkibidiBoostCost
        case 'default': game_baseSkibidiBoostCost = info.game_baseSkibidiBoostCost ?? 10000; break;
        case 'reset': game_baseSkibidiBoostCost = 10000; break;
        case 'force': game_baseSkibidiBoostCost = info.game_baseSkibidiBoostCost; break;}
    switch (mode) {                                                                          //game_passiveModeOn
        case 'default': game_skibidiBoostMult = info.game_skibidiBoostMult ?? 1; break;
        case 'reset': game_skibidiBoostMult = 1; break;
        case 'force': game_skibidiBoostMult = info.game_skibidiBoostMult; break;}
    switch (mode) {                                                                          //game_passiveModeOn
        case 'default': game_passiveModeOn = info.game_passiveModeOn ?? true; break;
        case 'reset': game_passiveModeOn = true; break;
        case 'force': game_passiveModeOn = info.game_passiveModeOn; break;}
    switch (mode) {                                                                          //game_effs_couponEffectWeights
        case 'default': game_effs_couponEffectWeights = info.game_effs_couponEffectWeights ?? {getSkibidi:3.5,cheaperUpgrades:1.5,crits:2,productionBoost:2,moreCoupons:1}; break;
        case 'reset': game_effs_couponEffectWeights = {getSkibidi:3.5,cheaperUpgrades:1.5,crits:2,productionBoost:2,moreCoupons:1}; break;
        case 'force': game_effs_couponEffectWeights = info.game_effs_couponEffectWeights; break;}
    switch (mode) {                                                                          //game_effs_couponAmount
        case 'default': game_effs_couponAmount = info.game_effs_couponAmount ?? 0; break;
        case 'reset': game_effs_couponAmount = 0; break;
        case 'force': game_effs_couponAmount = info.game_effs_couponAmount; break;}
    switch (mode) {                                                                          //game_effs_currentWeightSum
        case 'default': game_effs_currentWeightSum = info.game_effs_currentWeightSum ?? 10; break;
        case 'reset': game_effs_currentWeightSum = 10; break;
        case 'force': game_effs_currentWeightSum = info.game_effs_currentWeightSum; break;}
    switch (mode) {                                                                          //game_scrap_skibidiScrap
        case 'default': game_scrap_skibidiScrap = info.game_scrap_skibidiScrap ?? 0; break;
        case 'reset': game_scrap_skibidiScrap = 0; break;
        case 'force': game_scrap_skibidiScrap = info.game_scrap_skibidiScrap; break;}
    switch (mode) {                                                                          //game_netSkibidiWorth
        case 'default': game_netSkibidiWorth = info.game_netSkibidiWorth ?? 0; break;
        case 'reset': game_netSkibidiWorth = 0; break;
        case 'force': game_netSkibidiWorth = info.game_netSkibidiWorth; break;}
    switch (mode) {                                                                          //game_scrap_skibidiGainSU
        case 'default': game_scrap_skibidiGainSU = (isEmpty(sgSU)? new ScrapUpgrade(4, 4, 0, (x) => (x+2)) : new ScrapUpgrade(sgSU.baseCost, sgSU.cost, sgSU.amount, (x) => (x+2))); break;
        case 'reset': game_scrap_skibidiGainSU = new ScrapUpgrade(4, 4, 0, (x) => (x+2)); break;
        case 'force': game_scrap_skibidiGainSU = new ScrapUpgrade(sgSU.baseCost, sgSU.cost, sgSU.amount, (x) => (x+2)); break;}
    switch (mode) {                                                                          //game_scrap_maxCouponsSU
        case 'default': game_scrap_maxCouponsSU = (isEmpty(mcSU)? new ScrapUpgrade(6, 6, 0, (x) => (x+3)) : new ScrapUpgrade(mcSU.baseCost, mcSU.cost, mcSU.amount, (x) => (x+3))); break;
        case 'reset': game_scrap_maxCouponsSU = new ScrapUpgrade(6, 6, 0, (x) => (x+3)); break;
        case 'force': game_scrap_maxCouponsSU = new ScrapUpgrade(mcSU.baseCost, mcSU.cost, mcSU.amount, (x) => (x+3)); break;}
    switch (mode) {                                                                          //game_scrap_skibidiGainSU
        case 'default': game_scrap_upgradeBulkSU = (isEmpty(ubSU)? new ScrapUpgrade(6, 6, 0, (x) => (x+2)) : new ScrapUpgrade(ubSU['baseCost'], ubSU['cost'], ubSU['amount'], (x) => (x+2))); break;
        case 'reset': game_scrap_upgradeBulkSU = new ScrapUpgrade(6, 6, 0, (x) => (x+2)); break;
        case 'force': game_scrap_upgradeBulkSU = new ScrapUpgrade(ubSU.baseCost, ubSU.cost, ubSU['amount'], (x) => (x+2)); break;}
    switch (mode) {                                                                          //game_scrap_skibidiGainSU
        case 'default': game_scrap_boostBulkSU = (isEmpty(bbSU)? new ScrapUpgrade(6, 6, 0, (x) => (x+2)) : new ScrapUpgrade(bbSU['baseCost'], bbSU['cost'], bbSU['amount'], (x) => (x+2))); break;
        case 'reset': game_scrap_boostBulkSU = new ScrapUpgrade(6, 6, 0, (x) => (x+2)); break;
        case 'force': game_scrap_boostBulkSU = new ScrapUpgrade(bbSU.baseCost, bbSU.cost, bbSU.amount, (x) => (x+2)); break;}

    const pasArt = info.passiveInventory == undefined? {} : info.passiveInventory.artifacts;  
    switch (mode) {                                                          //passiveInventory
        case 'default': 
            passiveInventory = new ArtifactStorage(3, []);
            for (i in pasArt) {
                passiveInventory.addArtifact(new Artifact(pasArt[i].kind, pasArt[i].effects, pasArt[i].starLevel, pasArt[i].weight, pasArt[i].id));
            }; break;
        case 'reset': passiveInventory = new ArtifactStorage(3, []); break;
        case 'force': 
            passiveInventory = new ArtifactStorage(3, []);
            for (i in info.passiveInventory.artifacts) {
                passiveInventory.artifacts.push(new Artifact(i.kind, i.effects, i.starLevel, i.weight, i.id));
            }; break;}
    const actArt = info.activeInventory == undefined? {} : info.activeInventory.artifacts;  
    switch (mode) {                                                         //activeInventory
        case 'default': 
            activeInventory = new ArtifactStorage(3, []);
            for (i in actArt) {
                activeInventory.addArtifact(new Artifact(actArt[i].kind, actArt[i].effects, actArt[i].starLevel, actArt[i].weight, actArt[i].id));
            }; break;
        case 'reset': activeInventory = new ArtifactStorage(3, []); break;
        case 'force': 
        activeInventory = new ArtifactStorage(3, []);
            for (i in info.activeInventory.artifacts) {
                activeInventory.artifacts.push(new Artifact(i.kind, i.effects, i.starLevel, i.weight, i.id));
            }; break;}
    switch (mode) {                                                                          //game_netSkibidiWorth
        case 'default': time = info.time ?? Date.now(); break;
        case 'reset': time = Date.now(); break;
        case 'force': time = info.time; break;}

}

function getAllVariables() {
    let info = {
        game_skibidi: game_skibidi,
        game_upgrades: game_upgrades,
        game_baseUpgradeCost: game_baseUpgradeCost,
        game_baseSkibidiPerClick: game_baseSkibidiPerClick,
        game_skibidiBoosts: game_skibidiBoosts,
        game_baseSkibidiBoostCost: game_baseSkibidiBoostCost,
        game_skibidiBoostMult: game_skibidiBoostMult,
        game_passiveModeOn: game_passiveModeOn,
        game_effs_couponEffectWeights: game_effs_couponEffectWeights,
        game_effs_couponAmount: game_effs_couponAmount,
        game_effs_currentWeightSum: game_effs_currentWeightSum,
        game_scrap_skibidiScrap: game_scrap_skibidiScrap,
        game_netSkibidiWorth: game_netSkibidiWorth,
        game_scrap_skibidiGainSU: game_scrap_skibidiGainSU,
        game_scrap_maxCouponsSU: game_scrap_maxCouponsSU,
        game_scrap_upgradeBulkSU: game_scrap_upgradeBulkSU,
        game_scrap_boostBulkSU: game_scrap_boostBulkSU,
        passiveInventory: passiveInventory,
        activeInventory: activeInventory,
        time: time,
    };
    return info;
}

function showBadSaveNotif() {save_notif.style = 'display: inline-block';}

function badSaveReset() {
    updateAllVariables({}, 'reset');
    game_saveGame();
    save_notif.style = 'display: none';
}

function badSaveDefault() {
    updateAllVariables(getAllVariables(), 'default');
    game_saveGame();
    save_notif.style = 'display: none';
}

function badSaveContinue() {save_notif.style = 'display: none';}

function offlineContinue() {offline_notif.style = 'display: none';}

function game_saveGame() {
    localStorage.setItem('skibidiGame', JSON.stringify(getAllVariables()));
}

function game_loadGame() {
    let gameState = JSON.parse(localStorage.getItem('skibidiGame'));
    for (value of Object.keys(getAllVariables())) {
        if (gameState[value] === undefined || gameState[value] === NaN || gameState[value] === null) {
            console.log(gameState[value], value);
            showBadSaveNotif();
        }
    }
    console.log(gameState)

    updateAllVariables(gameState, 'default');
    Effect.effects = []; //TODO: preserve timers. or not.
    Effect.updateMults();
    game_updateUI();
}

function game_resetGame() {updateAllVariables({}, 'reset');}

function game_offlineProgress(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let skibidiGain = game_getSkibidiGain(seconds);
    offline_notif.style = 'display: inline-block'
    offline_notif_time.textContent = `Offline for ${seconds} seconds. You have obtained:`
    offline_notif_skibidi.textContent = `+${normFormat(skibidiGain, 3, 1)} Skibidi`

    game_skibidi += skibidiGain;
    game_netSkibidiWorth += skibidiGain;
}

testArt = new Artifact('glubbub', {eff: 5445, ass: 893293}, 23, 52);