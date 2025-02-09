let game_scrap_skibidiScrap = 0;
let game_scrap_skibidiScrapCost = 1e9;

const game_const_skibidiScrapButton = document.getElementById('skibidi-scrap-button');
const game_const_skibidiScrapInfoElement = document.getElementById('skibidi-scrap-info');
const game_const_skibidiScrapCostElement = document.getElementById('skibidi-scrap-info-2');
const game_const_skibidiScrapUpgrade1Button = document.getElementById('skibidi-scrap-upgrade-1-button');
const game_const_skibidiScrapUpgrade2Button = document.getElementById('skibidi-scrap-upgrade-2-button');
const game_const_skibidiScrapUpgrade3Button = document.getElementById('skibidi-scrap-upgrade-3-button');
const game_const_skibidiScrapUpgrade4Button = document.getElementById('skibidi-scrap-upgrade-4-button');

function game_scrap_buySkibidiScrap() {
    if (game_skibidi >= game_scrap_skibidiScrapCost) {
        game_skibidi -= game_scrap_skibidiScrapCost;
        game_scrap_skibidiScrap++;
        game_updateUI();
    }
}

class ScrapUpgrade {

    constructor(baseCost, scaling = (x) => (x+2)) {
        this.baseCost = baseCost;
        this.cost = baseCost;
        this.amount = 0;
        this.scaling = scaling;
    }

    buyUpgrade(amount) {
        for (i = 0; i < amount; i++) {
            if (game_scrap_skibidiScrap >= this.cost) {
                game_scrap_skibidiScrap -= this.cost;
                this.amount++;
                this.cost = this.scaling(this.cost);
            }
        }
    }

    reset() {
        this.cost = this.baseCost;
        this.amount = 0;
    }
}

game_scrap_skibidiGainSU = new ScrapUpgrade(4, (x) => (x+2));
console.log(game_scrap_skibidiGainSU.reset());
game_scrap_maxCouponsSU = new ScrapUpgrade(6, (x) => (x+3));
game_scrap_upgradeBulkSU = new ScrapUpgrade(6, (x) => (x+2));
game_scrap_boostBulkSU = new ScrapUpgrade(6, (x) => (x+2));