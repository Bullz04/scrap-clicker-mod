function objectToDecimal(object) {
    for (let i in object) {
        if (typeof(object[i]) == "string" && !isNaN(new Decimal(object[i]).mag) && !(new Decimal(object[i]).sign == 0 && object[i] != "0")) {
            object[i] = new Decimal(object[i]);
        }
        if (typeof(object[i]) == "object") {
            objectToDecimal(object[i]);
        }
    }
}

function merge(base, source) {
    for (let i in base) {
        if (source[i] != undefined) {
            if (typeof(base[i]) == "object" && typeof(source[i]) == "object" && !isDecimal(base[i]) && !isDecimal(source[i])) {
                merge(base[i], source[i]);
            } else {
                if (isDecimal(base[i]) && !isDecimal(source[i])) {
                    base[i] = new Decimal(source[i]);
                } else if (!isDecimal(base[i]) && isDecimal(source[i])) {
                    base[i] = source[i].toNumber();
                } else {
                    base[i] = source[i];
                }
            }
        }
    }
}


function isDecimal(x) {
    if (x.mag == undefined) {
        return false;
    } else {
        return true;
    }
}

var savegame;

function save() {
  localStorage.setItem("inc-tourn-yaht", JSON.stringify(player));
}

function load() {
  if (localStorage.getItem("inc-tourn-yaht")) {
    savegame = JSON.parse(localStorage.getItem("inc-tourn-yaht"));
    objectToDecimal(savegame);
    merge(player, savegame);
  }
}

function wipeSave() {
  hardReset();
  save();
  load();
}

function exportSave() {
  return btoa(JSON.stringify(player));
}

function importSave(text) {1
  savegame = JSON.parse(atob(text));
  objectToDecimal(savegame);
  merge(player, savegame);
  
  save();
}