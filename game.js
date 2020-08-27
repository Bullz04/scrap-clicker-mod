//


//The code isn't that hard
//The code:


player = {
    scrap : new Decimal("0"),
    scrapsPerClick : new Decimal("1"),
    scrapsPerSecond : new Decimal("0"),
    factoryCost : new Decimal("10"),
    factoryBought : new Decimal("0"),
    scrapBoostCost : new Decimal("100"),
    scrapBoostBought : new Decimal("0"),
    uselessFBaseCost : new Decimal("10"),
    uselessSBBaseCost : new Decimal("100"),
    scrapBoostMultiplier : new Decimal("3"),
    goldenScrap : new Decimal("0"),
    challenge : {
        completions : [null, 0, 0, 0, 0]
    }
}

//The End of Decimal territory XD
var interval = 50
var saveInterval = 10000

function format(amount) {
    let power = Decimal.floor(Decimal.log10(amount))
    let mantissa = amount.div(Decimal.pow(10, power))
    if (power.lt(3)) return amount
    if (amount.lte(0)) return amount.toFixed(0)
    return mantissa.toFixed(2) + "e" + power
}

function clickScrap() {
    player.scrap = player.scrap.add(
        Decimal.round(player.scrapsPerClick).times(Decimal.pow(player.scrapBoostMultiplier, player.scrapBoostBought)).times(player.goldenScrap.div(100).plus(1))
    )
};

function idleScrap() {
    player.scrap = player.scrap.add(
        (Decimal.round(player.scrapsPerSecond).plus(player.factoryBought)).times(Decimal.pow(player.scrapBoostMultiplier, player.scrapBoostBought)).times(player.goldenScrap.div(100).plus(1)).div(20)
    )
};

function updateFactoryCost() {
    player.uselessFBaseCost = player.uselessFBaseCost.times(1.01)
};

function updateScrapBoostCost() {
    player.uselessSBBaseCost = player.uselessSBBaseCost.times(4)
};

function buyFactory() {
    if (player.scrap.gte(Decimal.pow(1.01, player.factoryBought).times(player.factoryCost))) {
        player.scrap = player.scrap.minus(Decimal.pow(1.01, player.factoryBought).times(player.factoryCost))
        player.factoryBought = player.factoryBought.add(1);
        updateFactoryCost();
    } else return
};

function buyScrapBoost() {
    if (player.scrap.gte(Decimal.pow(4, player.scrapBoostBought).times(player.scrapBoostCost))) {
        player.scrap = player.scrap.minus(Decimal.pow(4, player.scrapBoostBought).times(player.scrapBoostCost));
        player.scrapBoostBought = player.scrapBoostBought.add(1);
        updateScrapBoostCost();
    } else return
};

function goldenScrapPrestige() {
    let pendingGoldenScrap = Decimal.round(Decimal.pow(player.scrap, 0.25))
    if (pendingGoldenScrap.gte(Decimal.round(1000))) {
        player.goldenScrap = player.goldenScrap.add(pendingGoldenScrap);
        player.scrap = new Decimal("0")
        player.scrapsPerClick = new Decimal("1"),
        player.scrapsPerSecond = new Decimal("0"),
        player.factoryCost = new Decimal("10"),
        player.factoryBought = new Decimal("0"),
        player.scrapBoostCost = new Decimal("100"),
        player.scrapBoostBought = new Decimal("0"),
        player.uselessFBaseCost = new Decimal("10"),
        player.playeruselessSBBaseCost = new Decimal("100"),
        player.scrapBoostMultiplier = new Decimal("3")
    }
}

function showPrestigeTab() {
    if (player.scrap.gte(1e9) || player.goldenScrap.gt(0)) {
        document.getElementById("prestigeTab").style.display = "inline-block"
    } else {
        document.getElementById("prestigeTab").style.display = "none"
    }
}

function hardReset() {
    player = {
        scrap : new Decimal("0"),
        scrapsPerClick : new Decimal("1"),
        scrapsPerSecond : new Decimal("0"),
        factoryCost : new Decimal("10"),
        factoryBought : new Decimal("0"),
        scrapBoostCost : new Decimal("100"),
        scrapBoostBought : new Decimal("0"),
        uselessFBaseCost : new Decimal("10"),
        uselessSBBaseCost : new Decimal("100"),
        scrapBoostMultiplier : new Decimal("3"),
        goldenScrap : new Decimal("0")
    }
    save();
    tab("production");
    
    
}

function confirmHardReset() {
    let hardResetWarning = confirm("Are you sure you want to hard reset? Hard reset returns back to where you start (Not prestige).");
    if (hardResetWarning == true) hardReset();
    else alert("You saved your game progress :)")
}

function updateText() {
    document.getElementById("FactoryAmount").innerHTML = format(Decimal.round(player.factoryBought))
    document.getElementById("ScrapAmount").innerHTML = format(Decimal.round(player.scrap))
    document.getElementById("ScrapsPerClick").innerHTML = "Gain<br>" + format(Decimal.round(player.scrapsPerClick.times(Decimal.pow(player.scrapBoostMultiplier, Decimal.round(player.scrapBoostBought))).times(player.goldenScrap.div(100).plus(1)))) + " Scraps"
    document.getElementById("ScrapsPerSecond").innerHTML = format(Decimal.round(player.scrapsPerSecond.plus(player.factoryBought).times(Decimal.pow(player.scrapBoostMultiplier, Decimal.round(player.scrapBoostBought))).times(player.goldenScrap.div(100).plus(1))))
    document.getElementById("BuyFactoryDisplay").innerHTML = "Buy Factory<br>" + format(Decimal.round(Decimal.pow(1.01, player.factoryBought).times(player.factoryCost))) + " Scraps"
    document.getElementById("BuyScrapBoostDisplay").innerHTML = "Boost your Scrap income by " + format(Decimal.round(player.scrapBoostMultiplier)) + "x<br>" + format(Decimal.round(Decimal.pow(4, player.scrapBoostBought).times(player.scrapBoostCost))) + " Scraps"
    document.getElementById("GoldenScrapDisplay").innerHTML = format(Decimal.round(player.goldenScrap))
    document.getElementById("GoldenScrapDisplay2").innerHTML = format(Decimal.round(player.goldenScrap)) 
    document.getElementById("PendingGoldenScrapDisplay").innerHTML = format(Decimal.round(Decimal.pow(player.scrap, 0.25)))
};


setInterval(save, saveInterval);
setInterval(idleScrap, interval);
setInterval(showPrestigeTab, interval);
setInterval(updateText, interval);
load();
updateText();
tab("production");
subTab1("subPrestige1")

//Hackerman