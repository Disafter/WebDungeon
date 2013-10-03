// JavaScript source code
//gather lots of input variables when the user creates their account.
//name, class, bonus stats
var cLevel = 1;
var currentFloor = 1;
var str = 2;
var dex = 2;
var wis = 2;
var luck = 2;
var cHP = 1;
var cMP = 5;
var initialBonus = 1;
var maxMonsterHP = 1;
var currMonsterHP = 5;
var monsterDamage = 1;
var monstersSlain = 0;
var floorChoice;
var quit = false;
var battleChoice = 0;
var meleeDamage = 1;
var magicDamage = 1;
var rangedDamage = 1;
var experience = 0;
var expToLevel = 100;
var levelBonus = 0;
var monsterBarLength = 0;
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
    currMonsterHP -= (.18 * str) + (.18 * cLevel) + 2;
    monsterBarLength = (currMonsterHP / ((1.4 * currentFloor) + 4)) * 800;
    document.getElementById("monsterbar").style.width = monsterBarLength + 'px';
    if (monsterBarLength < 0) { document.getElementById("monsterbar").style.width = '1px'; }
}

function magicAttack() {
    currMonsterHP -= (.2 * wis) + (.18 * cLevel) + 3;
    monsterBarLength = (currMonsterHP / ((1.4 * currentFloor) + 4)) * 800;
    document.getElementById("monsterbar").style.width = monsterBarLength + 'px';
    if (monsterBarLength < 0) { document.getElementById("monsterbar").style.width = '5px'; }
    cMP -= 1;
    var magicBarLength = cMP/5 * 800;
    document.getElementById("mpbar").style.width = magicBarLength + 'px';
    if (magicBarLength < 0) { document.getElementById("mpbar").style.width = '1px'; }
}

function rangedAttack() {
    currMonsterHP -= (.16 * dex) + (.18 * cLevel) + 2;
    monsterBarLength = (currMonsterHP / ((1.4 * currentFloor) + 4)) * 800;
    document.getElementById("monsterbar").style.width = monsterBarLength + 'px';
    if (monsterBarLength < 0) { document.getElementById("monsterbar").style.width = '1px'; }
}