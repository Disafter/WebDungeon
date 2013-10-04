// JavaScript source code
//gather lots of input variables when the user creates their account.
//name, class, bonus stats
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
var monstersLeft = 1;
var dodgeRoll = 0;
var dodgeChance = 0;

function nameYourCharacter() {
    var x;
    var person = prompt("Please enter your name.", "Zasheir");
    if (person != null) {
        x = person;
        document.getElementById("namebox").innerHTML = x;
    }
}
function getName() {
    var cName = prompt("Please enter your character's name.", "Zashier");
}
function FloorMenu() {
    while (quit == false) {/*This loop should occur after each monster is defeated.
    It should probably refresh the monster frame or the whole page.*/
        expToLevel = (((1.4 * currentFloor) + 4) * cLevel);
        if (experience >= expToLevel) {
            //Inform user they gained a level
            currentFloor += 1;
            experience = 0;
            cLevel += 1;
            str += 1;
            wis += 1;
            dex += 1;
            luck += 1;
            for (k = 0; k < 2; k++) {
                //Prompt user to assign bonus stats
                //Make code for assigning bonus stats.
            }
        }
        //every so often, increase the floor number(which should increase the toughness of the monsters)
    }
    cHP += (luck * .5);
    //update level, stat, floor, and any other printouts
}
function monsterFight() {
}

function monsterDamage() {
    return (.4 * currentFloor) + 2;
}
function maxMonsterHP() {
    return ((1.4 * currentFloor) + 4);
}

function meleeAttack() {
    if (maxHP > 1) {
        currMonsterHP -= (.18 * str) + (.18 * cLevel) + 2;
        updatePage();
        if (monsterBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
        updatePage();
        if (currMonsterHP <= 0) {
            experience += 10 + (25 / currentFloor);
            if (experience >= 100) {
                experience = 0;
                cLevel += 1;
                bonusStatPoints += 3;
                cHP = maxHP;
                cMP = maxMP;
                monstersLeft -= 1;
            }
            if (monstersLeft <= 0) {
                currentFloor += 1;
                monstersLeft = currentFloor + 2;
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
            currMonsterHP -= (.2 * wis) + (.18 * cLevel) + 3;
            updatePage();
            if (monsterBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
            updatePage();
            cMP -= 1;
            var magicBarLength = cMP / 5 * 800;
            updatePage();
            if (currMonsterHP <= 0) {
                experience += 10 + (25 / currentFloor);
                if (experience >= 100) {
                    experience = 0;
                    cLevel += 1;
                    bonusStatPoints += 3;
                    cHP = maxHP;
                    cMP = maxMP;
                    monstersLeft -= 1;
                }
                if (monstersLeft <= 0) {
                    currentFloor += 1;
                    monstersLeft = currentFloor + 2;
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
        currMonsterHP -= (.16 * dex) + (.18 * cLevel) + 2;
        updatePage();
        if (monsterBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
        updatePage();
        if (currMonsterHP <= 0) {
            experience += 10 + (25 / currentFloor);
            if (experience >= 100) {
                experience = 0;
                cLevel += 1;
                bonusStatPoints += 3;
                cHP = maxHP;
                cMP = maxMP;
                monstersLeft -= 1;
            }
            if (monstersLeft <= 0) {
                currentFloor += 1;
                monstersLeft = currentFloor + 2;
            }
            maxMonsterHP = (1.4 * currentFloor) + 4;
            currMonsterHP = (1.4 * currentFloor) + 4;
            updatePage();
        }
        monsterAttack();
    }
    else {
        alert("You haven't started the game yet!");
    }
}

function about() {
    alert("This game was made by John Vastola.\nContact me at johndvastola (at) hotmail (dot) com.");
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
    alert("Really? What setting do you want to change?");
}

function addStr() {
    if (bonusStatPoints >= 1) {
        bonusStatPoints -= 1;
        str += 1;
        cHP += (1.1 * str);
        maxHP += (1.1 * str);
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
        maxMP += 1;
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
    document.getElementById("hpheader").innerHTML = "HP : " + cHP + "/" + maxHP;
    document.getElementById("hpbar").style.width = ((cHP / maxHP) * 800) + 'px';
    document.getElementById("mpheader").innerHTML = "MP : " + cMP + "/" + maxMP;
    document.getElementById("mpbar").style.width = ((cMP / maxMP) * 800) + 'px';
    expBarLength = (experience / expToLevel) * 800;
    document.getElementById("xpbar").style.width = expBarLength + 'px';
    document.getElementById("xpheader").innerHTML = "EXP :" + experience;

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
    document.getElementById("monsteraccuracybox").innerHTML = "Roll:"+(dodgeRoll).toFixed(2);
    document.getElementById("dodgechancebox").innerHTML = "Chance:" + ((75 - (.48 * dex) + (.1 * currentFloor)) * .01).toFixed(2);

    //SPECIAL STATS


    //ITEMS

    //IMPORTANT CHECKS
    if (cHP <= 0) {
        window.location.href = "WebDungeonInitialization.html"
    }


}

function monsterAttack() {
    dodgeRoll = Math.random();
    updatePage();
    if (dodgeRoll <= (75-(.48*dex)+(.1*currentFloor))*.01) { 
        document.getElementById("dodgenotice").innerHTML = "You were hit!";
        cHP -= 1 * currentFloor;
        updatePage();
    }
    else {
        document.getElementById("dodgenotice").innerHTML = "You dodged!";
        updatePage();
    }
}