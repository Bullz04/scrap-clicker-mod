function tab(tabToGo) {
    document.getElementById("production").style.display = "none"
    document.getElementById("prestige").style.display = "none"
    document.getElementById("settings").style.display = "none"

    document.getElementById(tabToGo).style.display = "inline-block"
}

function subTab1(subTabToGo1) {
    document.getElementById("subPrestige1").style.display = "none"
    document.getElementById("subPrestige2").style.display = "none"

    document.getElementById(subTabToGo1).style.display = "inline-block"
}