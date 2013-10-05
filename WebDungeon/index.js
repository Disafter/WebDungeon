// JavaScript source code
var cLevel = 1;
var currentFloor = 1;
var cClass;
var str = 2;
var dex = 2;
var wis = 2;
var luck = 2;
var cHP = 14;
var maxHP = 1;
var cMP = 0;
var maxMP = 1;
var initialBonus = 1;
var maxMonsterHP = 0;
var currMonsterHP = 0;
var monsterDamage = 1;
var monstersSlain = 0;
var meleeDamage = 1;
var magicDamage = 1;
var rangedDamage = 1;
var experience = 0;
var expToLevel = 100;
var levelBonus = 0;
var bonusStatPoints = 0;
var monsterBarLength = 0;
var expBarLength = 0;
var monstersLeft = 3;
var dodgeRoll = 0;
var dodgeChance = 0;
var elixirs = 0;
var itemRoll;
var isWeaponEquipped = false;
var isHelmetEquipped = false;
var isArmorEquipped = false;
var isAmuletEquipped = false;

function meleeAJAX() {
}

function magicAJAX() {
}

function rangedAJAX() {
}

function runAJAX() {
}




function maxMonsterHP() {
    return ((1.4 * currentFloor) + 4);
}

function meleeAttack() {
    if (maxHP > 1) {
        currMonsterHP -= (.2 * str) + (.18 * cLevel) + 2 + (Math.random()*5);
        updatePage();
        if (monsterBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
        updatePage();
        if (currMonsterHP <= 0) {
            experience += (10 / cLevel) + (10 / currentFloor);
            dropItems();
            monstersLeft -= 1;
            updatePage();
            if (monstersLeft <= 0) {
                currentFloor += 1;
                monstersLeft = currentFloor + 2;
            }
            if (experience >= 100) {
                experience = 0;
                cLevel += 1;
                bonusStatPoints += 2;
                cHP = maxHP;
                cMP = maxMP;
                monstersLeft -= 1;
            }
            

            currMonsterHP = (1.4 * currentFloor) + 4;
            updatePage();
        }
        monsterAttack();
    }
    else {
        alert("You haven't started the game yet!");
    }
}

function magicAttack() {
    if (maxHP > 1) {
        if (cMP >= 1) {
            currMonsterHP -= (.5 * wis) + (.18 * cLevel) + (Math.random()*20);
            updatePage();
            if (monsterBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
            updatePage();
            cMP -= 1;
            var magicBarLength = cMP / 5 * 800;
            updatePage();
            if (currMonsterHP <= 0) {
                experience += (10 / cLevel) + (10 / currentFloor);
                dropItems();
                monstersLeft -= 1;
                updatePage();
                if (monstersLeft <= 0) {
                    currentFloor += 1;
                    monstersLeft = currentFloor + 2;
                }
                if (experience >= 100) {
                    experience = 0;
                    cLevel += 1;
                    bonusStatPoints += 2;
                    cHP = maxHP;
                    cMP = maxMP;
                    monstersLeft -= 1;
                }

                currMonsterHP = (1.4 * currentFloor) + 4;
                updatePage();

            }
            monsterAttack();
        }

        else {
            alert("You don't have enough mana to do that!");
        }
    }
    else {
        alert("You haven't started the game yet!");
    }
    if (magicBarLength <= 0) { document.getElementById("mpbar").style.width = '1px'; }

}

function rangedAttack() {
    if (maxHP > 1) {
        currMonsterHP -= (.15 * dex) + (.18 * cLevel) + 3;
        updatePage();
        if (monsterBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
        updatePage();
        if (currMonsterHP <= 0) {
            experience += (10 / cLevel) + (10 / currentFloor);
            dropItems();
            monstersLeft -= 1;
            updatePage();
            if (monstersLeft <= 0) {
                currentFloor += 1;
                monstersLeft = currentFloor + 2;
            }
            if (experience >= 100) {
                experience = 0;
                cLevel += 1;
                bonusStatPoints += 2;
                cHP = maxHP;
                cMP = maxMP;
                monstersLeft -= 1;
            }
            currMonsterHP = (1.4 * currentFloor) + 4;
            updatePage();
        }
        monsterAttackVsRanged();
    }
    else {
        alert("You haven't started the game yet!");
    }
}

function about() {
    alert("This game was made by John Vastola.\nContact me at johndvastola (at) hotmail (dot) com.");
    alert("Melee attacks do average damage based on your strength. Magic attacks do heavy damage based on your intelligence, but also cost MP. Ranged attacks deal light damage based on your dexterity, but give you a much better chance of dodging the opponent's attack. Running away gives your character time to heal up, but also brings you to a fresh monster. Elixirs fully restore your HP and MP, but monsters rarely drop them. Increasing your luck improves everything your character does by a little bit.");
}

function signUp() {
    alert("I know how desperately you want to sign up, but you'll have to wait until I sort things out ok? :)");
}

function logIn() {
    cName = prompt("Please enter your character's name.", "Zasheir");
    if (cName != null) {
        document.getElementById("namebox").innerHTML = cName;
    }
    cClass = prompt("Please enter your character's class.", "Monk");
    if (cClass != null) {
        updatePage();
    }
    maxMonsterHP = (1.4 * currentFloor) + 4;
    currMonsterHP = (1.4 * currentFloor) + 4;
    bonusStatPoints = 2;

    str = 2;
    dex = 2;
    wis = 2;
    luck = 2;
    elixirs = 10;
    bonusStatPoints = 2;
    cHP = (1.1 * cLevel) + (1.1 * str) + 10;
    maxHP = (1.1 * cLevel) + (1.1 * str) + 10;
    cMP = (wis + 2);
    maxMP = (wis + 2);
    updatePage();
    if (monsterBarLength <= 0) { document.getElementById("xpbar").style.width = '1px'; }
    monsterBarLength = (currMonsterHP / ((1.4 * currentFloor) + 4)) * 800;
    if (currMonsterHP <= 0) {
        currMonsterHP = 0;
        monsterBarLength = 1;
    }
    updatePage();
    if (monsterBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }


}

function settings() {
    var blank = prompt("Really? What setting do you want to change?", "I dont know.");
    alert("Ok we changed that for you. We swear.");
}

function addStr() {
    if (bonusStatPoints >= 1) {
        bonusStatPoints -= 1;
        str += 1;
        cHP += (1.1*str);
        updatePage();
    }
}

function addDex() {
    if (bonusStatPoints >= 1) {
        bonusStatPoints -= 1;
        dex += 1;
        updatePage();
    }
}

function addInt() {
    if (bonusStatPoints >= 1) {
        bonusStatPoints -= 1;
        wis += 1;
        cMP += 1;
        updatePage();
    }

}

function addLuck() {
    if (bonusStatPoints >= 1) {
        bonusStatPoints -= 1;
        luck += 1;
        updatePage();
    }
}

function updatePage() {

    //Name, Class, Level
    document.getElementById("namebox").innerHTML = cName;
    document.getElementById("levelbox").innerHTML = "Level " + cLevel + " " + cClass;

    //HP, MP, EXP
    
    maxHP=(1.1 * cLevel) + (1.1 * str) + 10;    
    maxMP = (wis + 2);
    if (cHP > Math.ceil(maxHP)) {
        cHP = Math.ceil(maxHP);
    }
    if (cMP > Math.ceil(maxHP)) {
        cMP = Math.ceil(maxHP);
    }
    document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(cHP) + "/" + Math.ceil(maxHP);
    document.getElementById("hpbar").style.width = ((Math.ceil(cHP) / Math.ceil(maxHP)) * 800) + 'px';
    document.getElementById("mpheader").innerHTML = "MP : " + Math.floor(cMP) + "/" + Math.floor(maxMP);
    document.getElementById("mpbar").style.width = ((Math.floor(cMP) / Math.floor(maxMP)) * 800) + 'px';
    expBarLength = (experience / expToLevel) * 800;
    document.getElementById("xpbar").style.width = expBarLength + 'px';
    document.getElementById("xpheader").innerHTML = "EXP :" + Math.floor(experience);

    //STATS, STATPOINTS
    document.getElementById("strdexbox").innerHTML = "Str: " + str + "&nbsp;&nbsp;&nbsp;&nbsp;Dex: " + dex;
    document.getElementById("pointbrick").innerHTML = "+ Points:" + bonusStatPoints;
    document.getElementById("intluckbox").innerHTML = "Int: " + wis + "&nbsp;&nbsp;&nbsp;Luck: " + luck;

    //MONSTER, MONSTER HP, FLOOR, MONSTERS LEFT
    maxMonsterHP = (1.4 * currentFloor) + 4;
    document.getElementById("floorbrick").innerHTML = "Floor: " + currentFloor;
    document.getElementById("loginbox").innerHTML = "Inside Dungeon"
    monsterBarLength = (currMonsterHP / ((1.4 * currentFloor) + 4)) * 800;
    document.getElementById("monsterbar").style.width = monsterBarLength + 'px';
    if (monsterBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
    document.getElementById("remainingbrick").innerHTML = "Monsters Here:" + monstersLeft;

    //SPECIAL STATS
    document.getElementById("monsteraccuracybox").innerHTML = "Enemy Roll:" + (100 - (dodgeRoll * 100)).toFixed(0);
    document.getElementById("dodgechancebox").innerHTML = "Dodge:" + (100 - (75 - (.48 * dex) + (.1 * currentFloor))).toFixed(0) + "%";

    //ITEMS
    document.getElementById("elixirbrick").innerHTML = "Elixirs: " + elixirs;

    //IMPORTANT CHECKS
    if (cHP <= 0) {
        window.location.href = "defeated.html";
    }


}



function monsterAttack() {


    dodgeRoll = Math.random();
    updatePage();
    if (dodgeRoll <= (75 - (.48 * dex) + (.1 * currentFloor)) * .01) {
        document.getElementById("dodgenotice").innerHTML = "You were hit!";
        cHP -= (Math.floor((3 * currentFloor * dodgeRoll)-(luck*.1)));
        updatePage();
    }
    else {
        document.getElementById("dodgenotice").innerHTML = "You dodged!";
        updatePage();
    }

    if (dodgeRoll > (.97-(luck*.001))) {
        elixirs += 1;
    }
    
}

function monsterAttackVsRanged() {
    dodgeRoll = Math.random();
    updatePage();
    if (dodgeRoll <= (75 - (.48 * dex) + (.1 * currentFloor)) * .007) {
        document.getElementById("dodgenotice").innerHTML = "You were hit!";
        cHP -= (Math.floor((3 * currentFloor * dodgeRoll) - (luck * .1)));
        updatePage();
        document.getElementById("dodgechancebox").innerHTML = "Dodge:" + (100 - (((75 - (.48 * dex) + (.1 * currentFloor))))*.7).toFixed(0) + "%";
    }
    else {
        document.getElementById("dodgenotice").innerHTML = "You dodged!";
        updatePage();
        document.getElementById("dodgechancebox").innerHTML = "Dodge:" + (100 - (((75 - (.48 * dex) + (.1 * currentFloor))))*.7).toFixed(0) + "%";
    }

    if (dodgeRoll > (.97 - (luck * .001))) {
        elixirs += 1;
    }
    
}




function useElixir() {
    if (elixirs >= 1) {
        elixirs -= 1;
        cHP = maxHP;
        cMP = maxMP;
        updatePage();
    }
    else {
        alert("You don't have any!");
    }
}

function runAway() {
    if (cMP >= 1) {
        cMP -= 1;
    }

    cHP = maxHP;
    currMonsterHP = maxMonsterHP;
    updatePage();
    document.getElementById("dodgenotice").innerHTML = "You ran away!";
}

function dropItems() {
    itemRoll = Math.ceil((Math.random() * 100));
    document.getElementById("itemheader").innerHTML = "Item Roll:" + itemRoll;
    if (itemRoll == 1) {
        if (!isWeaponEquipped) {
            document.getElementById("itemwindow").className = "itemPopup";
            document.getElementById("itembg").className = "itemPopupBG";
            $('#itemtext').text("You found Excalibur! Strength +5!");

            document.getElementById("weaponbrick").innerHTML = "Excalibur";
            str += 5
            isWeaponEquipped = true;
            updatePage();
        }
    }
    if (itemRoll == 2) {
        if (!isHelmetEquipped) {
            document.getElementById("itemwindow").className = "itemPopup";
            document.getElementById("itembg").className = "itemPopupBG";
            $('#itemtext').text("You found Destiny Crown! Intelligence +5!");

            document.getElementById("helmetbrick").innerHTML = "Destiny Crown";
            wis += 5
            isHelmetEquipped = true;
            updatePage();
        }
    }
    if (itemRoll == 3) {
        if (!isArmorEquipped) {
            document.getElementById("itemwindow").className = "itemPopup";
            document.getElementById("itembg").className = "itemPopupBG";
            $('#itemtext').text("You found Shadow Cape! Dexterity +3!");

            document.getElementById("armorbrick").innerHTML = "Shadow Cape";
            dex += 3
            isArmorEquipped = true;
            updatePage();
        }
    }
    if (itemRoll == 4) {
        if (!isAmuletEquipped) {
            document.getElementById("itemwindow").className = "itemPopup";
            document.getElementById("itembg").className = "itemPopupBG";
            $('#itemtext').text("You found Goldcoil! Luck +5!");
            
            document.getElementById("amuletbrick").innerHTML = "Goldcoil";
            luck += 5
            isAmuletEquipped = true;
            updatePage();
        }
    }
    if (itemRoll == 5) {
        if (!isWeaponEquipped) {
            document.getElementById("itemwindow").className = "itemPopup";
            document.getElementById("itembg").className = "itemPopupBG";
            $('#itemtext').text("You found Great Bow! Dexterity +5!");

            document.getElementById("weaponbrick").innerHTML = "Great Bow";
            dex += 5
            isWeaponEquipped = true;
            updatePage();
        }
    }
    if (itemRoll == 6) {
        if (!isHelmetEquipped) {
            document.getElementById("itemwindow").className = "itemPopup";
            document.getElementById("itembg").className = "itemPopupBG";
            $('#itemtext').text("You found Mindshield! Intelligence +3!");

            document.getElementById("helmetbrick").innerHTML = "Mindshield";
            wis += 3
            isHelmetEquipped = true;
            updatePage();
        }
    }
    if (itemRoll == 7) {
        if (!isArmorEquipped) {
            document.getElementById("itemwindow").className = "itemPopup";
            document.getElementById("itembg").className = "itemPopupBG";
            $('#itemtext').text("You found Leather Jib! Luck +3!");

            document.getElementById("armorbrick").innerHTML = "Leather Jib";
            luck += 3
            isArmorEquipped = true;
            updatePage();
        }
    }
    if (itemRoll == 8) {
        if (!isAmuletEquipped) {
            document.getElementById("itemwindow").className = "itemPopup";
            document.getElementById("itembg").className = "itemPopupBG";
            $('#itemtext').text("You found Skullchain! Strength +3");
            document.getElementById("amuletbrick").innerHTML = "Skullchain";
            str += 3
            isAmuletEquipped = true;
            updatePage();
        }
    }

}

function removeItemWindow() {
    document.getElementById("itemwindow").className = "itemPopup hidden";
    document.getElementById("itembg").className = "itemPopupBG hidden";
}

$("#itemwindow").on("click", removeItemWindow);