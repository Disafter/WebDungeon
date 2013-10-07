﻿// JavaScript source code
var cLevel = 1;
var currentFloor = 1;
var cClass;
var str = 2;
var dex = 2;
var wis = 2;
var luck = 2;
var cHP = 1;
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
var gold = 0;
var itemRoll;
var isWeaponEquipped = false;
var isHelmetEquipped = false;
var isArmorEquipped = false;
var isAmuletEquipped = false;
var isAutoPlaying = false;
var timerId;
var recoverId;
var randomStat = 0;
var uniqueItemsFound = 0;
var disableItemPopups = false;
var isRecovering = false;
var wasAutoPlaying = false;

var ItemsFoundArray = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false);
var ItemCollectionArray = new Array();

var found1 = false;
var found2 = false;
var found3 = false;
var found4 = false;
var found5 = false;
var found6 = false;
var found7 = false;
var found8 = false;
var found9 = false;
var found10 = false;
var found11 = false;
var found12 = false;
var found13 = false;
var found14 = false;
var found15 = false;
var found16 = false;
var found17 = false;
var found18 = false;
var found19 = false;
var found20 = false;
var found21 = false;
var found22 = false;
var found23 = false;
var found24 = false;
var found25 = false;
var found26 = false;
var found27 = false;
var found28 = false;
var found29 = false;
var found30 = false;
var found31 = false;
var found32 = false;
var found33 = false;
var found34 = false;
var found35 = false;
var found36 = false;
var found37 = false;
var found38 = false;
var found39 = false;
var found40 = false;
var found41 = false;
var found42 = false;
var found43 = false;
var found44 = false;
var found45 = false;
var found46 = false;
var found47 = false;
var found48 = false;
var found49 = false;
var found50 = false;



function meleeAJAX() {
}

function magicAJAX() {
}

function rangedAJAX() {
}

function runAJAX() {
}




function maxMonsterHP() {
    return ((3 * currentFloor) + 4);
}

function meleeAttack() {
    if (!isRecovering) {
        if (maxHP > 1) {
            currMonsterHP -= (.2 * str) + (.18 * cLevel) + 2 + (Math.random() * 5);
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


                currMonsterHP = (3 * currentFloor) + 4;
                updatePage();
            }
            monsterAttack();
        }
        else {
            alert("You haven't started the game yet!");
        }
    
    }
    else {
        alert("You're still recovering!");
    }
}

function magicAttack() {
    if (!isRecovering) {
        if (maxHP > 1) {
            if (cMP >= 1) {
                currMonsterHP -= (.5 * wis) + (.18 * cLevel) + (Math.random() * 20);
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

                    currMonsterHP = (3 * currentFloor) + 4;
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
    }
    else {
        alert("You're still recovering!");
    }
    if (magicBarLength <= 0) { document.getElementById("mpbar").style.width = '1px'; }

}

function rangedAttack() {
    if (!isRecovering) {
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
                currMonsterHP = (3 * currentFloor) + 4;
                updatePage();
            }
            monsterAttackVsRanged();
        }
        else {
            alert("You haven't started the game yet!");
        }
    }
    else {
        alert("You're still recovering!");
    }
}

function about() {
    alert("This game was made by John Vastola.\nContact me at johndvastola (at) hotmail (dot) com.");
    alert("Melee attacks do average damage based on your strength. Magic attacks do heavy damage based on your intelligence, but also cost MP. Ranged attacks deal light damage based on your dexterity, but give you a much better chance of dodging the opponent's attack. Running away gives your character time to heal up, but also brings you to a fresh monster. Elixirs fully restore your HP and MP, but monsters rarely drop them. Increasing your luck improves everything your character does by a little bit.");
    
}

function showItems() {
    alert("Item Collection: " + ItemCollectionArray.toString());
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
    maxMonsterHP = (3 * currentFloor) + 4;
    currMonsterHP = (3 * currentFloor) + 4;
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
    monsterBarLength = (currMonsterHP / ((3 * currentFloor) + 4)) * 800;
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
        cHP += 1.1;
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
    maxHP = (1.1 * cLevel) + (1.1 * str) + 10;
    maxMP = (wis + 2);
    if (cHP > Math.ceil(maxHP)) {
        cHP = Math.ceil(maxHP);
    }
    if (cMP > Math.ceil(maxHP)) {
        cMP = Math.ceil(maxHP);
    }
    document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(cHP) + "/" + Math.ceil(maxHP);
    document.getElementById("hpbar").style.width = ((Math.ceil(cHP) / Math.ceil(maxHP)) * 337) + 'px'; //good at 785
    document.getElementById("mpheader").innerHTML = "MP : " + Math.floor(cMP) + "/" + Math.floor(maxMP);
    document.getElementById("mpbar").style.width = ((Math.floor(cMP) / Math.floor(maxMP)) * 337) + 'px';
    expBarLength = (experience / expToLevel) * 337;
    document.getElementById("xpbar").style.width = expBarLength + 'px';
    document.getElementById("xpheader").innerHTML = "EXP :" + Math.floor(experience);

    //STATS, STATPOINTS
    document.getElementById("strdexbox").innerHTML = "Strength: " + str + "&nbsp;&nbsp;&nbsp;&nbsp;Dexterity: " + dex;
    document.getElementById("pointbrick").innerHTML = "+Stat Points:" + bonusStatPoints;
    document.getElementById("intluckbox").innerHTML = "Intelligence: " + wis + "&nbsp;&nbsp;&nbsp;Luck: " + luck;

    //MONSTER, MONSTER HP, FLOOR, MONSTERS LEFT
    maxMonsterHP = (3 * currentFloor) + 4;
    document.getElementById("floorbrick").innerHTML = "Floor: " + currentFloor;
    document.getElementById("loginbox").innerHTML = "Inside Dungeon"
    monsterBarLength = (currMonsterHP / ((3 * currentFloor) + 4)) * 337;
    document.getElementById("monsterbar").style.width = monsterBarLength + 'px';
    if (monsterBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
    document.getElementById("remainingbrick").innerHTML = "Monsters Here:" + monstersLeft;

    //SPECIAL STATS
    //document.getElementById("monsteraccuracybox").innerHTML = "Enemy Roll:" + (100 - (dodgeRoll * 100)).toFixed(0);
    document.getElementById("monsteraccuracybox").innerHTML = "Gold Find: " + (((.06 + (luck * .003)) * 100)).toFixed(0) + "%";
    document.getElementById("dodgechancebox").innerHTML = "Dodge: " + (100 - (75 - (.25 * dex) + (.2 * currentFloor))).toFixed(0) + "%";

    //ITEMS
    document.getElementById("itemfindbrick").innerHTML = "Item Find: " + (((30 - uniqueItemsFound) / (600 - luck)) * 100).toFixed(0) + "%";
    if ((((45 - uniqueItemsFound) / (200 - luck)) * 100) >= 3) {
        document.getElementById("gamblechancebrick").innerHTML = "Gamble: " + (((45 - uniqueItemsFound) / (100 - luck)) * 100).toFixed(0) + "%";
    }
    else {
        document.getElementById("gamblechancebrick").innerHTML = "Gamble: < 3%";
    }
    document.getElementById("elixirbrick").innerHTML = "Elixirs: " + elixirs + "/10";
    document.getElementById("goldbrick").innerHTML = "Gold: " + gold;
    if (uniqueItemsFound >= 100) { uniqueItemsFound = 100; }
    document.getElementById("itemheader").innerHTML = "Items Found: " + uniqueItemsFound + "/45";

    //IMPORTANT CHECKS
    if (cHP <= 0) {
        if (isAutoPlaying) {
            wasAutoPlaying = true;
        }
        isAutoPlaying = false;
        isRecovering = true;
        $("#autobutton").text("recovering...");
        clearInterval(timerId);
        clearInterval(recoverId);
        recoverId = setInterval(recover, 250);
      //  window.location.href = "defeated.html";
        // document.getElementById("defeatedstats").innerHTML = " Items found:" + uniqueItemsFound + "/100" + " Gold: " + gold + " Elixirs: " + elixirs + "/10";
    }


}

function recover() {
    if (!isRecovering) {
        clearInterval(recoverId);
    }
    else if (cHP >= maxHP) {
        cHP = maxHP;
        clearInterval(recoverId);
        isRecovering = false;
        if (wasAutoPlaying) {
            setAutoPlay();
            wasAutoPlaying = false;
        }
        $("#autobutton").text("Autoplay");
    }
    else if (cHP <= maxHP) {
        cHP += maxHP / 120
        document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(cHP) + "/" + Math.ceil(maxHP);
        document.getElementById("hpbar").style.width = ((Math.ceil(cHP) / Math.ceil(maxHP)) * 337) + 'px';
        $("#autobutton").text("recovering...");
    }
    
        document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(cHP) + "/" + Math.ceil(maxHP);
        document.getElementById("hpbar").style.width = ((Math.ceil(cHP) / Math.ceil(maxHP)) * 337) + 'px';


    
    
}

function monsterAttack() {


    dodgeRoll = Math.random();
    updatePage();
    if (dodgeRoll <= (75 - (.25 * dex) + (.2 * currentFloor)) * .01) {
        document.getElementById("dodgenotice").innerHTML = "You were hit";
        document.getElementById("fordamagebrick").innerHTML = "for " + (Math.ceil((1 * currentFloor * dodgeRoll))) + " damage!"
        cHP -= (Math.ceil((.1 * currentFloor * dodgeRoll)));
        updatePage();
    }
    else {
        document.getElementById("dodgenotice").innerHTML = "You dodged!";
        document.getElementById("fordamagebrick").innerHTML = "";
        updatePage();
    }

    if (dodgeRoll > (.97 - (luck * .001))) {
        elixirs += 1;
        if (elixirs > 10) {
            elixirs = 10;
        }
    }
    if (dodgeRoll < (.04 + (luck * .003))) {
        gold += 3;
    }
    else if (dodgeRoll < (.05 + (luck * .003))) {
        gold += 2;
    }
    else if (dodgeRoll < (.06 + (luck * .003))) {
        gold += 1;
    }

    updatePage();
}

function monsterAttackVsRanged() {
    dodgeRoll = Math.random();
    updatePage();
    if (dodgeRoll <= (75 - (.30 * dex) + (.2 * currentFloor)) * .007) {
        document.getElementById("dodgenotice").innerHTML = "You were hit";
        document.getElementById("fordamagebrick").innerHTML = "for " + (Math.ceil((1 * currentFloor * dodgeRoll))) + " damage!"
        cHP -= (Math.floor((1 * currentFloor * dodgeRoll)));
        updatePage();
        document.getElementById("dodgechancebox").innerHTML = "Dodge:" + (100 - (((75 - (.30 * dex) + (.2 * currentFloor)))) * .7).toFixed(0) + "%";
    }
    else {
        document.getElementById("dodgenotice").innerHTML = "You dodged!";
        document.getElementById("fordamagebrick").innerHTML = "";
        updatePage();
        document.getElementById("dodgechancebox").innerHTML = "Dodge:" + (100 - (((75 - (.30 * dex) + (.2 * currentFloor)))) * .7).toFixed(0) + "%";
    }

    if (dodgeRoll > (.97 - (luck * .001))) {

        elixirs += 1;
        if (elixirs > 10) {
            elixirs = 10;
        }
    }

    if (dodgeRoll < (.04 + (luck * .003))) {
        gold += 3;
    }
    else if (dodgeRoll < (.05 + (luck * .003))) {
        gold += 2;
    }
    else if (dodgeRoll < (.06 + (luck * .003))) {
        gold += 1;
    }

    updatePage();
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
    if (!isRecovering) {
        if (cMP >= 1) {
            cMP -= 1;
        }

        if (gold > 3) {
            gold -= 3;
        }
        else {
            gold = 0;
        }
        updatePage();
        cHP = maxHP;
        currMonsterHP = maxMonsterHP;
        updatePage();
        document.getElementById("dodgenotice").innerHTML = "You ran away!";
    }
    else {
        alert("You're still recovering!");
    }
}

function dropItems() {
    itemRoll = Math.ceil((Math.random() * (600 - luck)));
    if (itemRoll == 1) {
        if (!ItemsFoundArray[1]) {
            //  if (!isWeaponEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Excalibur! Strength +5!");
            }
            uniqueItemsFound += 1;
            ItemCollectionArray[1] = "Excalibur";
            document.getElementById("weaponbrick").innerHTML = "Excalibur";
            str += 5;
            //isWeaponEquipped = true;
            ItemsFoundArray[1] = true;
            updatePage();
        }

        // }
    }
    if (itemRoll == 2) {
        // if (!isHelmetEquipped) {
        if (!ItemsFoundArray[2]) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Destiny Crown! Dexterity +4!");
            }
            uniqueItemsFound += 1;
            ItemCollectionArray[2] = "Destiny Crown";
            document.getElementById("helmetbrick").innerHTML = "Destiny Crown";
            dex += 4;
            //isHelmetEquipped = true;
            ItemsFoundArray[2] = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 3) {
        if (!ItemsFoundArray[3]) {
            // if (!isArmorEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Shadow Cape! Dexterity +3!");
            }
            uniqueItemsFound += 1;
            ItemCollectionArray[3] = "Shadow Cape";
            document.getElementById("armorbrick").innerHTML = "Shadow Cape";
            dex += 3;
            //isArmorEquipped = true;
            ItemsFoundArray[3] = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 4) {
        if (!ItemsFoundArray[4]) {
            // if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Goldcoil! Luck +5!");
            }
            uniqueItemsFound += 1;
            ItemCollectionArray[4] = "Goldcoil";
            document.getElementById("amuletbrick").innerHTML = "Goldcoil";
            luck += 5;
            //isAmuletEquipped = true;
            ItemsFoundArray[4] = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 5) {
        if (!ItemsFoundArray[5]) {
            ItemsFoundArray[5] = true;
            //  if (!isWeaponEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Great Bow! Dexterity +5!");
            }
            uniqueItemsFound += 1;
            ItemCollectionArray[5] = "Great Bow";
            document.getElementById("weaponbrick").innerHTML = "Great Bow";
            dex += 5;
            //isWeaponEquipped = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 6) {
        if (!ItemsFoundArray[6]) {
            ItemsFoundArray[6] = true;
            //  if (!isHelmetEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Mindshield! Intelligence +3!");
            }
            uniqueItemsFound += 1;
            ItemCollectionArray[6] = "Mindshield";
            document.getElementById("helmetbrick").innerHTML = "Mindshield";
            wis += 3;
            // isHelmetEquipped = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 7) {
        if (!ItemsFoundArray[7]) {
            ItemsFoundArray[7] = true;
            // if (!isArmorEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Leather Jib! Luck +3!");
            }
            uniqueItemsFound += 1;
            ItemCollectionArray[7] = "Leather Jib";
            document.getElementById("armorbrick").innerHTML = "Leather Jib";
            luck += 3;
            // isArmorEquipped = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 8) {
        if (!ItemsFoundArray[8]) {
            ItemsFoundArray[8] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Skullchain! Strength +3");
            }
            document.getElementById("amuletbrick").innerHTML = "Skullchain";
            uniqueItemsFound += 1;
            ItemCollectionArray[8] = "Skullchain";
            str += 3;
            // isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 9) {
        if (!ItemsFoundArray[9]) {
            ItemsFoundArray[9] = true;
            // if (!isWeaponEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Manasphere! Intelligence +4");
            }
            document.getElementById("weaponbrick").innerHTML = "Manasphere";
            uniqueItemsFound += 1;
            ItemCollectionArray[9] = "Manasphere";
            wis += 4;
            // isWeaponEquipped = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 10) {
        if (!ItemsFoundArray[10]) {
            ItemsFoundArray[10] = true;
            //  if (!isArmorEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Mithril Plate! Strength +4");
            }
            document.getElementById("armorbrick").innerHTML = "Mithril Plate";
            uniqueItemsFound += 1;
            ItemCollectionArray[10] = "Mithril Plate";
            str += 4;
            // isArmorEquipped = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 11) {
        if (!ItemsFoundArray[11]) {
            ItemsFoundArray[11] = true;
            // if (!isHelmetEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Cat Ears! Luck +4!");
            }
            document.getElementById("helmetbrick").innerHTML = "Cat Ears";
            uniqueItemsFound += 1;
            ItemCollectionArray[11] = "Cat Ears"
            luck += 4;
            // isHelmetEquipped = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 12) {
        if (!ItemsFoundArray[12]) {
            ItemsFoundArray[12] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Twisted Coven! Dexterity +4");
            }
            document.getElementById("amuletbrick").innerHTML = "Twisted Coven";
            uniqueItemsFound += 1;
            ItemCollectionArray[12] = "Twisted Coven";
            dex += 4;
            // isAmuletEquipped = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 13) {
        if (!ItemsFoundArray[13]) {
            ItemsFoundArray[13] = true;
            //  if (!isWeaponEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Handwarmers! Luck +2!");
            }
            document.getElementById("weaponbrick").innerHTML = "Handwarmers";
            uniqueItemsFound += 1;
            ItemCollectionArray[13] = "Handwarmers"
            luck += 2;
            // isWeaponEquipped = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 14) {
        if (!ItemsFoundArray[14]) {
            ItemsFoundArray[14] = true;
            //  if (!isArmorEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Magecage! Intelligence +2!");
            }
            document.getElementById("armorbrick").innerHTML = "Magecage";
            uniqueItemsFound += 1;
            ItemCollectionArray[14] = "Magecage";
            wis += 2;
            //isArmorEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 15) {
        if (!ItemsFoundArray[15]) {
            ItemsFoundArray[15] = true;
            // if (!isHelmetEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Demon Skull! Strength +2!");
            }
            document.getElementById("helmetbrick").innerHTML = "Demon Skull";
            uniqueItemsFound += 1;
            ItemCollectionArray[15] = "Demon Skull";
            str += 2;
            // isHelmetEquipped = true;
            updatePage();
        }
        //  }
    }
    if (itemRoll == 16) {
        if (!ItemsFoundArray[16]) {
            ItemsFoundArray[16] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Aethercrest! Intelligence +2!");
            }
            document.getElementById("amuletbrick").innerHTML = "Aethercrest";
            uniqueItemsFound += 1;
            ItemCollectionArray[16] = "Aethercrest";
            wis += 2;
            // isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 17) {
        if (!ItemsFoundArray[17]) {
            ItemsFoundArray[17] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Ancient Pact! All Stats +3!!!");
            }
            document.getElementById("amuletbrick").innerHTML = "Ancient Pact";
            uniqueItemsFound += 1;
            ItemCollectionArray[17] = "Ancient Pact";
            str += 3;
            dex += 3;
            wis += 3;
            luck += 3;
            // isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 18) {
        if (!ItemsFoundArray[18]) {
            ItemsFoundArray[18] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Razorfist! Str +2! Dex +2!");
            }
            document.getElementById("weaponbrick").innerHTML = "Razorfist";
            uniqueItemsFound += 1;
            ItemCollectionArray[18] = "Razorfist";
            str += 2;
            dex += 2;
            // isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 19) {
        if (!ItemsFoundArray[19]) {
            ItemsFoundArray[19] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Time Hat! Int +2! Luck +2!");
            }
            document.getElementById("helmetbrick").innerHTML = "Time Hat";
            uniqueItemsFound += 1;
            ItemCollectionArray[19] = "Time Hat";
            wis += 2;
            luck += 2;
            // isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 20) {
        if (!ItemsFoundArray[20]) {
            ItemsFoundArray[20] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Angel Fortress! Str +3! Luck +1!");
            }
            document.getElementById("armorbrick").innerHTML = "Angel Fortress";
            uniqueItemsFound += 1;
            ItemCollectionArray[20] = "Angel Fortress";
            str += 3;
            luck += 1;
            // isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 21) {
        if (!ItemsFoundArray[21]) {
            ItemsFoundArray[21] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Eldrich Tome! Int +7!");
            }
            document.getElementById("weaponbrick").innerHTML = "Eldrich Tome";
            uniqueItemsFound += 1;
            ItemCollectionArray[21] = "Eldrich Tome";
            wis += 7
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 22) {
        if (!ItemsFoundArray[22]) {
            ItemsFoundArray[22] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Stickygort! Luck +1!");
            }
            document.getElementById("helmetbrick").innerHTML = "Stickygort";
            uniqueItemsFound += 1;
            ItemCollectionArray[22] = "Stickygort";

            luck += 1;
            // isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 23) {
        if (!ItemsFoundArray[23]) {
            ItemsFoundArray[23] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Force Totem! Dex +1! Int +3!");
            }
            document.getElementById("amuletbrick").innerHTML = "Force Totem";
            uniqueItemsFound += 1;
            ItemCollectionArray[23] = "Force Totem";
            wis += 3;
            dex += 1;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 24) {
        if (!ItemsFoundArray[24]) {
            ItemsFoundArray[24] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Two Chains! Dex +2! Luck +2!");
            }
            document.getElementById("armorbrick").innerHTML = "Two Chains";
            uniqueItemsFound += 1;
            ItemCollectionArray[24] = "Two Chains";
            str += 2;
            luck += 2;
            // isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 25) {
        if (!ItemsFoundArray[25]) {
            ItemsFoundArray[25] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Bonusfingers! Dex -1! Luck +7!");
            }
            document.getElementById("weaponbrick").innerHTML = "Bonusfingers";
            uniqueItemsFound += 1;
            ItemCollectionArray[25] = "Bonusfingers";
            dex -= 1;
            luck += 7;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 26) {
        if (!ItemsFoundArray[26]) {
            ItemsFoundArray[26] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Quickboots! Dexterity +3!");
            }
            document.getElementById("bootsbrick").innerHTML = "Quickboots";
            uniqueItemsFound += 1;
            ItemCollectionArray[26] = "Quickboots";
            dex += 3;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 27) {
        if (!ItemsFoundArray[27]) {
            ItemsFoundArray[27] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Solidfoot! Str +3!");
            }
            document.getElementById("bootsbrick").innerHTML = "Solidfoot";
            uniqueItemsFound += 1;
            ItemCollectionArray[27] = "Solidfoot";
            str += 3;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 28) {
        if (!ItemsFoundArray[28]) {
            ItemsFoundArray[28] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Bonustoes! Dex +1! Luck +4!");
            }
            document.getElementById("bootsbrick").innerHTML = "Bonustoes";
            uniqueItemsFound += 1;
            ItemCollectionArray[28] = "Bonustoes";
            dex += 1;
            luck += 4;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 29) {
        if (!ItemsFoundArray[29]) {
            ItemsFoundArray[29] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Aero Treads! Dex +1! Int +3!");
            }
            document.getElementById("bootsbrick").innerHTML = "Aero Treads";
            uniqueItemsFound += 1;
            ItemCollectionArray[29] = "Aero Treads";
            dex += 1;
            wis += 3;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 30) {
        if (!ItemsFoundArray[30]) {
            ItemsFoundArray[30] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Great Axe! Str +10! Dex -3!");
            }
            document.getElementById("weaponbrick").innerHTML = "Great Axe";
            uniqueItemsFound += 1;
            ItemCollectionArray[30] = "Great Axe";
            dex -= 3;
            str += 10;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 31) {
        if (!ItemsFoundArray[31]) {
            ItemsFoundArray[31] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Girdlehurt! Str +1! Luck +1!");
            }
            document.getElementById("beltbrick").innerHTML = "Girdlehurt";
            uniqueItemsFound += 1;
            ItemCollectionArray[31] = "Girdlehurt";
            luck += 1;
            str += 1;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 32) {
        if (!ItemsFoundArray[32]) {
            ItemsFoundArray[32] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Dazzle Sash! Luck +4!");
            }
            document.getElementById("beltbrick").innerHTML = "Dazzle Sash";
            uniqueItemsFound += 1;
            ItemCollectionArray[32] = "Dazzle Sash";
            luck += 4;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 33) {
        if (!ItemsFoundArray[33]) {
            ItemsFoundArray[33] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Spirit Wrap! Int +1! Luck +1!");
            }
            document.getElementById("beltbrick").innerHTML = "Spirit Wrap";
            uniqueItemsFound += 1;
            ItemCollectionArray[33] = "Spirit Wrap";
            wis += 1;
            luck += 1;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 34) {
        if (!ItemsFoundArray[34]) {
            ItemsFoundArray[34] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Belt from Beyond! Str -2! Int +6!");
            }
            document.getElementById("beltbrick").innerHTML = "Belt from Beyond";
            uniqueItemsFound += 1;
            ItemCollectionArray[34] = "Belt from Beyond";
            str -= 2;
            wis += 6;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 35) {
        if (!ItemsFoundArray[35]) {
            ItemsFoundArray[35] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Waist of Time! Int +4! Luck +4!");
            }
            document.getElementById("beltbrick").innerHTML = "Waist of Time";
            uniqueItemsFound += 1;
            ItemCollectionArray[35] = "Waist of Time";
            wis += 4;
            luck += 4;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 36) {
        if (!ItemsFoundArray[36]) {
            ItemsFoundArray[36] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Nasty Pants! Luck -1! Strength +3!");
            }
            document.getElementById("pantsbrick").innerHTML = "Nasty Pants";
            uniqueItemsFound += 1;
            ItemCollectionArray[36] = "Nasty Pants";
            luck -= 1;
            str += 3;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 37) {
        if (!ItemsFoundArray[37]) {
            ItemsFoundArray[37] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Studded Trousers! Str +1! Dex +1!");
            }
            document.getElementById("pantsbrick").innerHTML = "Studded Trousers";
            uniqueItemsFound += 1;
            ItemCollectionArray[37] = "Studded Trousers";
            dex += 1;
            str += 1;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 38) {
        if (!ItemsFoundArray[38]) {
            ItemsFoundArray[38] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Ultra Jeggings! Luck +2! Dex +1!");
            }
            document.getElementById("pantsbrick").innerHTML = "Ultra Jeggings";
            uniqueItemsFound += 1;
            ItemCollectionArray[38] = "Ultra Jeggings";
            luck += 2;
            dex += 1;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 39) {
        if (!ItemsFoundArray[39]) {
            ItemsFoundArray[39] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Shadow Leggings! Int +1! Dex +2!");
            }
            document.getElementById("pantsbrick").innerHTML = "Great Axe";
            uniqueItemsFound += 1;
            ItemCollectionArray[39] = "Shadow Leggings";
            dex += 2;
            wis += 10;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 40) {
        if (!ItemsFoundArray[40]) {
            ItemsFoundArray[40] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Ironkilt! Str +4! Dex -1!");
            }
            document.getElementById("pantsbrick").innerHTML = "Ironkilt";
            uniqueItemsFound += 1;
            ItemCollectionArray[40] = "Ironkilt";
            dex -= 1;
            str += 4;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 41) {
        if (!ItemsFoundArray[41]) {
            ItemsFoundArray[41] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Spikewall! Str +3! Dex +1!");
            }
            document.getElementById("shieldbrick").innerHTML = "Spikewall";
            uniqueItemsFound += 1;
            ItemCollectionArray[41] = "Spikewall";
            dex += 1;
            str += 3;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 42) {
        if (!ItemsFoundArray[42]) {
            ItemsFoundArray[42] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Wooden Shield! Str +1! Dex +2!");
            }
            document.getElementById("shieldbrick").innerHTML = "Wooden Shield";
            uniqueItemsFound += 1;
            ItemCollectionArray[42] = "Wooden Shield";
            dex += 2;
            str += 11;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 43) {
        if (!ItemsFoundArray[43]) {
            ItemsFoundArray[43] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Mystic Orb! Int +7! Str -1!");
            }
            document.getElementById("shieldbrick").innerHTML = "Mystic Orb";
            uniqueItemsFound += 1;
            ItemCollectionArray[43] = "Mystic Orb";
            str -= 1;
            wis += 7;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 44) {
        if (!ItemsFoundArray[44]) {
            ItemsFoundArray[44] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Backup Rope! Dex +4! Int -1!");
            }
            document.getElementById("shieldbrick").innerHTML = "Backup Rope";
            uniqueItemsFound += 1;
            ItemCollectionArray[44] = "Backup Rope";
            dex += 4;
            wis -= 1;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
    if (itemRoll == 45) {
        if (!ItemsFoundArray[45]) {
            ItemsFoundArray[45] = true;
            //  if (!isAmuletEquipped) {
            if (!disableItemPopups) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You found Stormnet! Int +2! Dex +2!");
            }
            document.getElementById("shieldbrick").innerHTML = "Stormnet";
            uniqueItemsFound += 1;
            ItemCollectionArray[45] = "Stormnet";
            dex += 2;
            wis += 2;
            //  isAmuletEquipped = true;
            updatePage();
        }
        // }
    }
}
function gamble() {
    if (gold >= 10) {
        gold -= 10;
        itemRoll = Math.ceil((Math.random() * (100 - luck)));
        if (itemRoll == 1) {
            if (!found1) {
                //  if (!isWeaponEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Excalibur! Strength +5!");
                }
                uniqueItemsFound += 1;
                document.getElementById("weaponbrick").innerHTML = "Excalibur";
                str += 5;
                //isWeaponEquipped = true;
                found1 = true;
                updatePage();
            }

            // }
        }
        if (itemRoll == 2) {
            // if (!isHelmetEquipped) {
            if (!found2) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Destiny Crown! Dexterity +4!");
                }
                uniqueItemsFound += 1;
                document.getElementById("helmetbrick").innerHTML = "Destiny Crown";
                dex += 4;
                //isHelmetEquipped = true;
                found2 = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 3) {
            if (!found3) {
                // if (!isArmorEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Shadow Cape! Dexterity +3!");
                }
                uniqueItemsFound += 1;
                document.getElementById("armorbrick").innerHTML = "Shadow Cape";
                dex += 3;
                //isArmorEquipped = true;
                found3 = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 4) {
            if (!found4) {
                // if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Goldcoil! Luck +5!");
                }
                uniqueItemsFound += 1;
                document.getElementById("amuletbrick").innerHTML = "Goldcoil";
                luck += 5;
                //isAmuletEquipped = true;
                found4 = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 5) {
            if (!found5) {
                found5 = true;
                //  if (!isWeaponEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Great Bow! Dexterity +5!");
                }
                uniqueItemsFound += 1;
                document.getElementById("weaponbrick").innerHTML = "Great Bow";
                dex += 5;
                //isWeaponEquipped = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 6) {
            if (!found6) {
                found6 = true;
                //  if (!isHelmetEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Mindshield! Intelligence +3!");
                }
                uniqueItemsFound += 1;
                document.getElementById("helmetbrick").innerHTML = "Mindshield";
                wis += 3;
                // isHelmetEquipped = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 7) {
            if (!found7) {
                found7 = true;
                // if (!isArmorEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Leather Jib! Luck +3!");
                }
                uniqueItemsFound += 1;
                document.getElementById("armorbrick").innerHTML = "Leather Jib";
                luck += 3;
                // isArmorEquipped = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 8) {
            if (!found8) {
                found8 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Skullchain! Strength +3");
                }
                document.getElementById("amuletbrick").innerHTML = "Skullchain";
                uniqueItemsFound += 1;
                str += 3;
                // isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 9) {
            if (!found9) {
                found9 = true;
                // if (!isWeaponEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Manasphere! Intelligence +4");
                }
                document.getElementById("weaponbrick").innerHTML = "Manasphere";
                uniqueItemsFound += 1;
                wis += 4;
                // isWeaponEquipped = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 10) {
            if (!found10) {
                found10 = true;
                //  if (!isArmorEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Mithril Plate! Strength +4");
                }
                document.getElementById("armorbrick").innerHTML = "Mithril Plate";
                uniqueItemsFound += 1;
                str += 4;
                // isArmorEquipped = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 11) {
            if (!found11) {
                found11 = true;
                // if (!isHelmetEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Cat Ears! Luck +4!");
                }
                document.getElementById("helmetbrick").innerHTML = "Cat Ears";
                uniqueItemsFound += 1;
                luck += 4;
                // isHelmetEquipped = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 12) {
            if (!found12) {
                found12 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Twisted Coven! Dexterity +4");
                }
                document.getElementById("amuletbrick").innerHTML = "Twisted Coven";
                uniqueItemsFound += 1;
                dex += 4;
                // isAmuletEquipped = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 13) {
            if (!found13) {
                found13 = true;
                //  if (!isWeaponEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Handwarmers! Luck +2!");
                }
                document.getElementById("weaponbrick").innerHTML = "Handwarmers";
                uniqueItemsFound += 1;
                luck += 2;
                // isWeaponEquipped = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 14) {
            if (!found14) {
                found14 = true;
                //  if (!isArmorEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Magecage! Intelligence +2!");
                }
                document.getElementById("armorbrick").innerHTML = "Magecage";
                uniqueItemsFound += 1;
                wis += 2;
                //isArmorEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 15) {
            if (!found15) {
                found15 = true;
                // if (!isHelmetEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Demon Skull! Strength +2!");
                }
                document.getElementById("helmetbrick").innerHTML = "Demon Skull";
                uniqueItemsFound += 1;
                str += 2;
                // isHelmetEquipped = true;
                updatePage();
            }
            //  }
        }
        if (itemRoll == 16) {
            if (!found16) {
                found16 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Aethercrest! Intelligence +2!");
                }
                document.getElementById("amuletbrick").innerHTML = "Aethercrest";
                uniqueItemsFound += 1;
                wis += 2;
                // isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 17) {
            if (!found17) {
                found17 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Ancient Pact! All Stats +3!!!");
                }
                document.getElementById("amuletbrick").innerHTML = "Ancient Pact";
                uniqueItemsFound += 1;
                str += 3;
                dex += 3;
                wis += 3;
                luck += 3;
                // isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 18) {
            if (!found18) {
                found18 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Razorfist! Str +2! Dex +2!");
                }
                document.getElementById("weaponbrick").innerHTML = "Razorfist";
                uniqueItemsFound += 1;
                str += 2;
                dex += 2;
                // isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 19) {
            if (!found19) {
                found19 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Time Hat! Int +2! Luck +2!");
                }
                document.getElementById("helmetbrick").innerHTML = "Time Hat";
                uniqueItemsFound += 1;
                wis += 2;
                luck += 2;
                // isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 20) {
            if (!found20) {
                found20 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Angel Fortress! Str +3! Luck +1!");
                }
                document.getElementById("armorbrick").innerHTML = "Angel Fortress";
                uniqueItemsFound += 1;
                str += 3;
                luck += 1;
                // isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 21) {
            if (!found21) {
                found21 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Eldrich Tome! Int +7!");
                }
                document.getElementById("weaponbrick").innerHTML = "Eldrich Tome";
                uniqueItemsFound += 1;
                wis += 7
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 22) {
            if (!found22) {
                found22 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Stickygort! Luck +1!");
                }
                document.getElementById("helmetbrick").innerHTML = "Stickygort";
                uniqueItemsFound += 1;

                luck += 1;
                // isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 23) {
            if (!found23) {
                found23 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Force Totem! Dex +1! Int +3!");
                }
                document.getElementById("amuletbrick").innerHTML = "Force Totem";
                uniqueItemsFound += 1;
                wis += 3;
                dex += 1;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 24) {
            if (!found24) {
                found24 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Two Chains! Dex +2! Luck +2!");
                }
                document.getElementById("armorbrick").innerHTML = "Two Chains";
                uniqueItemsFound += 1;
                str += 2;
                luck += 2;
                // isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 25) {
            if (!found25) {
                found25 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Bonusfingers! Dex -1! Luck +7!");
                }
                document.getElementById("weaponbrick").innerHTML = "Bonusfingers";
                uniqueItemsFound += 1;
                dex -= 1;
                luck += 7;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 26) {
            if (!found26) {
                found26 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Quickboots! Dexterity +3!");
                }
                document.getElementById("bootsbrick").innerHTML = "Quickboots";
                uniqueItemsFound += 1;
                dex += 3;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 27) {
            if (!found27) {
                found27 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Solidfoot! Str +3!");
                }
                document.getElementById("bootsbrick").innerHTML = "Solidfoot";
                uniqueItemsFound += 1;
                str += 3;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 28) {
            if (!found28) {
                found28 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Bonustoes! Dex +1! Luck +4!");
                }
                document.getElementById("bootsbrick").innerHTML = "Bonustoes";
                uniqueItemsFound += 1;
                dex += 1;
                luck += 4;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 29) {
            if (!found29) {
                found29 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Aero Treads! Dex +1! Int +3!");
                }
                document.getElementById("bootsbrick").innerHTML = "Aero Treads";
                uniqueItemsFound += 1;
                dex += 1;
                wis += 3;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 30) {
            if (!found30) {
                found30 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Great Axe! Str +10! Dex -3!");
                }
                document.getElementById("weaponbrick").innerHTML = "Great Axe";
                uniqueItemsFound += 1;
                dex -= 3;
                str += 10;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 31) {
            if (!found31) {
                found31 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Girdlehurt! Str +1! Luck +1!");
                }
                document.getElementById("beltbrick").innerHTML = "Girdlehurt";
                uniqueItemsFound += 1;
                luck += 1;
                str += 1;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 32) {
            if (!found32) {
                found32 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Dazzle Sash! Luck +4!");
                }
                document.getElementById("beltbrick").innerHTML = "Dazzle Sash";
                uniqueItemsFound += 1;
                luck += 4;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 33) {
            if (!found33) {
                found33 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Spirit Wrap! Int +1! Luck +1!");
                }
                document.getElementById("beltbrick").innerHTML = "Spirit Wrap";
                uniqueItemsFound += 1;
                wis += 1;
                luck += 1;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 34) {
            if (!found34) {
                found34 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Belt from Beyond! Str -2! Int +6!");
                }
                document.getElementById("beltbrick").innerHTML = "Belt from Beyond";
                uniqueItemsFound += 1;
                str -= 2;
                wis += 6;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 35) {
            if (!found35) {
                found35 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Waist of Time! Int +4! Luck +4!");
                }
                document.getElementById("beltbrick").innerHTML = "Waist of Time";
                uniqueItemsFound += 1;
                wis += 4;
                luck += 4;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 36) {
            if (!found36) {
                found36 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Nasty Pants! Luck -1! Strength +3!");
                }
                document.getElementById("pantsbrick").innerHTML = "Nasty Pants";
                uniqueItemsFound += 1;
                luck -= 1;
                str += 3;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 37) {
            if (!found37) {
                found37 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Studded Trousers! Str +1! Dex +1!");
                }
                document.getElementById("pantsbrick").innerHTML = "Studded Trousers";
                uniqueItemsFound += 1;
                dex += 1;
                str += 1;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 38) {
            if (!found38) {
                found38 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Ultra Jeggings! Luck +2! Dex +1!");
                }
                document.getElementById("pantsbrick").innerHTML = "Ultra Jeggings";
                uniqueItemsFound += 1;
                luck += 2;
                dex += 1;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 39) {
            if (!found39) {
                found39 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Shadow Leggings! Int +1! Dex +2!");
                }
                document.getElementById("pantsbrick").innerHTML = "Great Axe";
                uniqueItemsFound += 1;
                dex += 2;
                wis += 10;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 40) {
            if (!found40) {
                found40 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Ironkilt! Str +4! Dex -1!");
                }
                document.getElementById("pantsbrick").innerHTML = "Ironkilt";
                uniqueItemsFound += 1;
                dex -= 1;
                str += 4;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 41) {
            if (!found41) {
                found41 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Spikewall! Str +3! Dex +1!");
                }
                document.getElementById("shieldbrick").innerHTML = "Spikewall";
                uniqueItemsFound += 1;
                dex += 1;
                str += 3;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 42) {
            if (!found42) {
                found42 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Wooden Shield! Str +1! Dex +2!");
                }
                document.getElementById("shieldbrick").innerHTML = "Wooden Shield";
                uniqueItemsFound += 1;
                dex += 2;
                str += 11;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 43) {
            if (!found43) {
                found43 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Mystic Orb! Int +7! Str -1!");
                }
                document.getElementById("shieldbrick").innerHTML = "Mystic Orb";
                uniqueItemsFound += 1;
                str -= 1;
                wis += 7;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 44) {
            if (!found44) {
                found44 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Backup Rope! Dex +4! Int -1!");
                }
                document.getElementById("shieldbrick").innerHTML = "Backup Rope";
                uniqueItemsFound += 1;
                dex += 4;
                wis -= 1;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
        if (itemRoll == 45) {
            if (!found45) {
                found45 = true;
                //  if (!isAmuletEquipped) {
                if (!disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Stormnet! Int +2! Dex +2!");
                }
                document.getElementById("shieldbrick").innerHTML = "Stormnet";
                uniqueItemsFound += 1;
                dex += 2;
                wis += 2;
                //  isAmuletEquipped = true;
                updatePage();
            }
            // }
        }
    }
}


function removeItemWindow() {
    document.getElementById("itemwindow").className = "itemPopup hidden";
    document.getElementById("itembg").className = "itemPopupBG hidden";
}

function autoPlayGame() {
    if (cHP <= (maxHP/6) && isAutoPlaying == true) {
        if (elixirs >= 1) {
            useElixir();
            updatePage();
        }
        else if (elixirs < 1 && gold >= 10) {
            gold -= 10;
            elixirs += 1;
            updatePage();
        }
        else if (elixirs >= 10 && cMP == 0) {
            useElixir();
            updatePage();
        }
    }
    if (bonusStatPoints >= 1) {
        randomStat = Math.ceil(Math.random() * 3);
        if (randomStat == 1) {
            addStr();
        }
        else if (randomStat == 2) {
            addDex();
        }
        else if (randomStat == 3) {
            addInt();
        }
    }
    if (isAutoPlaying == true) {
        if (cMP >= 1) {
            magicAttack()
        }
        else {
            rangedAttack();
        }
        updatePage();
    }
}

function setAutoPlay() {
    if (cHP >= 5 && isAutoPlaying == false) {
        isAutoPlaying = true;
        $("#autobutton").text("playing...");
        clearInterval(timerId);
        timerId = setInterval(autoPlayGame, 500);
    }
    else if (isAutoPlaying == true) {
        isAutoPlaying = false;
        $("#autobutton").text("Autoplay");
        clearInterval(timerId);
    }
}

function togglePopups(){
    if (disableItemPopups == false) {
        disableItemPopups = true;
        $("#popupsbutton").text("Item Popups: Off");
    }
    else if (disableItemPopups == true) {
        disableItemPopups = false;
        $("#popupsbutton").text("Item Popups: On");
    }
}

$("#itemwindow").on("click", removeItemWindow);