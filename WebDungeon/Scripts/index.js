var character = {
    name: "Nameless Hero",
    level: 1,
    currentFloor: 1,
    characterClass: "Berzerker",
    strength: 2,
    dexterity: 2,
    intelligence: 2,
    luck: 2,
    currentHp: 2,
    currentMp: 5,
    maxHp: 2,
    maxMp: 4,
    currentExperience: 0,
    experienceNeededToLevel: 100,
    bonusStatPoints: 0,
    elixirs: 0,
    gold: 0
};

var gameData = {
    monsterHpBarLength: 0,
    monstersLeftOnFloor: 0,
    dodgeRoll: 0,
    itemRoll: 0,
    isAutoPlaying: false,
    wasAutoPlaying: false,
    isRecovering: false,
    timerId: 1,
    recoverId: 2,
    randomStatRoll: 0,
    numberOfItemsFound: 0,
    disableItemPopups: false
};

var monster = {
    maxHp: 0,
    currentHp: 0,
    attackDamage: 1
};


var itemsResponse;
var monstersResponse;
var classesResponse;
var items = [];

var game = {
    meleeAttack: function () {
        if (!gameData.isRecovering) {
            if (character.maxHp > 1) {
                currMonsterHP -= Math.floor(1*(.9 + character.strength * .045455));
                game.updatePage();
                if (monsterBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
                game.updatePage();
                if (monster.currentHp <= 0) {
                    character.currentExperience += Math.floor(10 / character.level) + Math.floor(10 / character.currentFloor);
                    game.dropItems();
                    gameData.monstersLeftOnFloor -= 1;
                    game.updatePage();
                    if (gameData.monstersLeftOnFloor <= 0) {
                        character.currentFloor += 1;
                        gameData.monstersLeftOnFloor = 10 + Math.ceil(character.currentFloor * Math.ceil(.2 * character.currentFloor));
                        game.updatePage();
                    }
                    if (character.currentExperience >= character.experienceNeededToLevel) {
                        character.currentExperience = 0;
                        character.level += 1;
                        character.bonusStatPoints += 2;
                        character.currentHp = character.maxHp;
                        character.currentMp = maxMP;
                        gameData.monstersLeftOnFloor -= 1;
                    }


                    monster.currentHp = 3 + Math.floor(.5*character.currentFloor);
                    game.updatePage();
                }
                game.monsterAttack();
            }
            else {
                alert("You haven't started the game yet!");
            }

        }
        else {
            alert("You're still recovering!");
        }

    },

    magicAttack: function () {
        if (!gameData.isRecovering) {
            if (character.maxHp > 1) {
                if (character.currentMp >= 1) {
                    monster.currentHp -= Math.floor(1*(2 + character.intelligence * .02));
                    game.updatePage();
                    if (gameData.monsterHPBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
                    game.updatePage();
                    character.currentMp -= 1;
                    var magicBarLength = character.currentMp / 5 * 800;
                    game.updatePage();
                    if (monster.currentHp <= 0) {
                        character.currentExperience += (10 / character.level) + (10 / character.currentFloor);
                        game.dropItems();
                        gameData.monstersLeftOnFloor -= 1;
                        game.updatePage();
                        if (gameData.monstersLeftOnFloor <= 0) {
                            character.currentFloor += 1;
                            gameData.monstersLeftOnFloor = 10 + Math.ceil(character.currentFloor * (.2 * character.currentFloor));
                            game.updatePage();
                        }
                        if (character.currentExperience >= character.experienceNeededToLevel) {
                            character.currentExperience = 0;
                            character.level += 1;
                            character.bonusStatPoints += 2;
                            character.currentHp = character.maxHp;
                            character.currentMp = character.maxMp;
                            gameData.monstersLeftOnFloor -= 1;
                        }

                        monster.currentHp = 3 + Math.floor(.5*character.currentFloor);
                        game.updatePage();

                    }
                    game.monsterAttack();
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

    },

    rangedAttack: function () {
        if (!gameData.isRecovering) {
            if (character.maxHp > 1) {
                monster.currentHp -= Math.floor(1*(1 + character.dexterity * .01));
                game.updatePage();
                if (gameData.monsterHPBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
                game.updatePage();
                if (monster.currentHp <= 0) {
                    character.currentExperience += (10 / character.level) + (10 / character.currentFloor);
                    game.dropItems();
                    gameData.monstersLeftOnFloor -= 1;
                    game.updatePage();
                    if (gameData.monstersLeftOnFloor <= 0) {
                        character.currentFloor += 1;
                        gameData.monstersLeftOnFloor = 10 + Math.ceil(character.currentFloor * (.2 * character.currentFloor));
                        game.updatePage();
                    }
                    if (character.currentExperience >= character.experienceNeededToLevel) {
                        character.currentExperience = 0;
                        character.level += 1;
                        character.bonusStatPoints += 2;
                        character.currentHp = character.maxHp;
                        character.currentMp = character.maxMp;
                        gameData.monstersLeftOnFloor -= 1;
                    }
                    monster.currentHp = 3 + Math.floor(.5*character.currentFloor)
                    game.updatePage();
                }
                game.monsterAttackVsRanged();
            }
            else {
                alert("You haven't started the game yet!");
            }
        }
        else {
            alert("You're still recovering!");
        }
    },

    about: function () {
        alert("about");
    },

    signUp: function () {
        alert("Sign Up");
    },

    settings: function () {
        alert("Settings");
    },

    addStrength: function () {
        if (character.bonusStatPoints >= 1) {
            character.bonusStatPoints -= 1;
            character.strength += 1;
            character.currentHp += 1.1;
            game.updatePage();
        }
    },

    addDexterity: function () {
        if (character.bonusStatPoints >= 1) {
            character.bonusStatPoints -= 1;
            character.dexterity += 1;
            game.updatePage();
        }
    },

    addIntelligence: function () {
        if (character.bonusStatPoints >= 1) {
            character.bonusStatPoints -= 1;
            character.intelligence += 1;
            character.currentMp += 1;
            game.updatePage();
        }
    },

    addLuck: function () {
        if (character.bonusStatPoints >= 1) {
            character.bonusStatPoints -= 1;
            character.luck += 1;
            game.updatePage();
        }
    },

    updatePage: function () {
        //Name, Class, Level
        document.getElementById("namebox").innerHTML = character.name;
        document.getElementById("levelbox").innerHTML = "Level " + character.level + " " + character.characterClass;

        //HP, MP, EXP
        character.maxHp = 5 + Math.floor(.1 * character.strength);
        character.maxMp = 5 + Math.floor(.2 * character.intelligence);
        if (character.currentHp > Math.ceil(character.maxHp)) {
            character.currentHp = Math.ceil(character.maxHp);
        }
        if (character.currentMp > Math.ceil(character.maxHp)) {
            character.currentMp = Math.ceil(character.maxHp);
        }
        document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(character.currentHp) + "/" + Math.ceil(character.maxHp);
        document.getElementById("hpbar").style.width = ((Math.ceil(character.currentHp) / Math.ceil(character.maxHp)) * 337) + 'px'; //good at 785
        document.getElementById("mpheader").innerHTML = "MP : " + Math.floor(character.currentMp) + "/" + Math.floor(character.maxMp);
        document.getElementById("mpbar").style.width = ((Math.floor(character.currentMp) / Math.floor(character.maxMp)) * 337) + 'px';
        expBarLength = (character.currentExperience / character.experienceNeededToLevel) * 337;
        document.getElementById("xpbar").style.width = expBarLength + 'px';
        document.getElementById("xpheader").innerHTML = "EXP :" + Math.floor(character.currentExperience);

        //STATS, STATPOINTS
        document.getElementById("strdexbox").innerHTML = "Strength: " + character.strength + "&nbsp;&nbsp;&nbsp;&nbsp;Dexterity: " + character.dexterity;
        document.getElementById("pointbrick").innerHTML = "+Stat Points:" + character.bonusStatPoints;
        document.getElementById("intluckbox").innerHTML = "Intelligence: " + character.intelligence + "&nbsp;&nbsp;&nbsp;Luck: " + character.luck;

        //MONSTER, MONSTER HP, FLOOR, MONSTERS LEFT
        monster.maxHp = 3 + Math.floor(.5*character.currentFloor);
        document.getElementById("floorbrick").innerHTML = "Floor: " + character.currentFloor;
        document.getElementById("loginbox").innerHTML = "Inside Dungeon";
        gameData.monsterHPBarLength = (monster.currentHp / (3 + Math.floor(.5*character.currentFloor)) * 337);
        document.getElementById("monsterbar").style.width = gameData.monsterHPBarLength + 'px';
        if (gameData.monsterHPBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
        document.getElementById("remainingbrick").innerHTML = "Monsters Here:" + gameData.monstersLeftOnFloor;

        //SPECIAL STATS
        //document.getElementById("monsteraccuracybox").innerHTML = "Enemy Roll:" + (100 - (dodgeRoll * 100)).toFixed(0);
        /*document.getElementById("monsteraccuracybox").innerHTML = "Gold Find: " + (((.06 + (character.luck * .003)) * 100)).toFixed(0) + "%";
        document.getElementById("dodgechancebox").innerHTML = "Dodge: " + (100 - (75 - (.25 * character.dexterity) + (.2 * character.currentFloor))).toFixed(0) + "%";*/

        //ITEMS
        /*if ((((45) / (1000 - character.luck)) * 100) >= 1) {
            document.getElementById("itemfindbrick").innerHTML = "Item Find: " + (((30) / (1000 - character.luck)) * 100).toFixed(0) + "%";
        }
        else {
            document.getElementById("itemfindbrick").innerHTML = "Item Find: < 1%";
        }
        if ((((45) / (1000 - character.luck)) * 100) >= 1) {
            document.getElementById("gamblechancebrick").innerHTML = "Gamble: " + (((45) / (200 - character.luck)) * 100).toFixed(0) + "%";
        }
        else {
            document.getElementById("gamblechancebrick").innerHTML = "Gamble Odds: < 1%";
        }*/
        document.getElementById("elixirbrick").innerHTML = "Elixirs: " + character.elixirs + "/10";
        document.getElementById("goldbrick").innerHTML = "Gold: " + character.gold;
        
        //document.getElementById("itemheader").innerHTML = "Items Found: " + uniqueItemsFound + "/45";

        //IMPORTANT CHECKS
        if (character.currentHp <= 0) {
            if (gameData.isAutoPlaying) {
                gameData.wasAutoPlaying = true;
            }
            gameData.isAutoPlaying = false;
            gameData.isRecovering = true;
            $("#autobutton").text("recovering...");
            clearInterval(gameData.timerId);
            clearInterval(gameData.recoverId);
            gameData.recoverId = setInterval(game.recover, 250);
            //  window.location.href = "defeated.html";
            // document.getElementById("defeatedstats").innerHTML = " Items found:" + uniqueItemsFound + "/100" + " Gold: " + gold + " Elixirs: " + elixirs + "/10";
        }
    },

    recover: function () {
        if (!gameData.isRecovering) {
            clearInterval(gameData.recoverId);
        }
        else if (character.currentHp >= character.maxHp) {
            character.currentHp = character.maxHp;
            clearInterval(gameData.recoverId);
            gameData.isRecovering = false;
            if (gameData.wasAutoPlaying) {
                game.setAutoPlay();
                $("#autobutton").text("playing...");
                gameData.wasAutoPlaying = false;
            }
            else {
                $("#autobutton").text("Autoplay");
            }
        }
        else if (character.currentHp <= character.maxHp) {
            character.currentHp += Math.ceil(character.maxHp / 120)
            document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(character.currentHp) + "/" + Math.ceil(character.maxHp);
            document.getElementById("hpbar").style.width = ((Math.ceil(character.currentHp) / Math.ceil(character.maxHp)) * 337) + 'px';
            $("#autobutton").text("recovering...");
        }
        document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(character.currentHp) + "/" + Math.ceil(character.maxHp);
        document.getElementById("hpbar").style.width = ((Math.ceil(character.currentHp) / Math.ceil(character.maxHp)) * 337) + 'px';
    },

    monsterAttack: function () {
        gameData.dodgeRoll = Math.random();
        game.updatePage();
        if (gameData.dodgeRoll <= (75 - (.25 * character.dexterity) + (.2 * character.currentFloor)) * .01) {
            document.getElementById("dodgenotice").innerHTML = "You were hit";
            document.getElementById("fordamagebrick").innerHTML = "for " + (Math.ceil((.3 * character.currentFloor * gameData.dodgeRoll))) + " damage!"
            character.currentHp -= (Math.ceil((.3 * character.currentFloor * gameData.dodgeRoll)));
            game.updatePage();
        }
        else {
            document.getElementById("dodgenotice").innerHTML = "You dodged!";
            document.getElementById("fordamagebrick").innerHTML = "";
            game.updatePage();
        }

        if (gameData.dodgeRoll > (.97 - (character.luck * .001))) {
            character.elixirs += 1;
            if (character.elixirs > 10) {
                character.elixirs = 10;
            }
        }
        if (gameData.dodgeRoll < (.04 + (character.luck * .003))) {
            character.gold += 3;
        }
        else if (gameData.dodgeRoll < (.05 + (character.luck * .003))) {
            character.gold += 2;
        }
        else if (gameData.dodgeRoll < (.06 + (character.luck * .003))) {
            character.gold += 1;
        }

        game.updatePage();
    },

    monsterAttackVsRanged: function () {
        gameData.dodgeRoll = Math.random();
        game.updatePage();
        if (gameData.dodgeRoll <= (75 - (.30 * character.dexterity) + (.2 * character.currentFloor)) * .007) {
            document.getElementById("dodgenotice").innerHTML = "You were hit";
            document.getElementById("fordamagebrick").innerHTML = "for " + (Math.ceil((.3 * character.currentFloor * gameData.dodgeRoll))) + " damage!"
            character.currentHp -= (Math.ceil((.3 * character.currentFloor * gameData.dodgeRoll)));
            game.updatePage();
            document.getElementById("dodgechancebox").innerHTML = "Dodge:" + (100 - (((75 - (.30 * character.dexterity) + (.2 * character.currentFloor)))) * .7).toFixed(0) + "%";
        }
        else {
            document.getElementById("dodgenotice").innerHTML = "You dodged!";
            document.getElementById("fordamagebrick").innerHTML = "";
            game.updatePage();
            document.getElementById("dodgechancebox").innerHTML = "Dodge:" + (100 - (((75 - (.30 * character.dexterity) + (.2 * character.currentFloor)))) * .7).toFixed(0) + "%";
        }

        if (gameData.dodgeRoll > (.97 - (character.luck * .001))) {

            character.elixirs += 1;
            if (character.elixirs > 10) {
                character.elixirs = 10;
            }
        }

        if (gameData.dodgeRoll < (.04 + (character.luck * .003))) {
            character.gold += 3;
        }
        else if (gameData.dodgeRoll < (.05 + (character.luck * .003))) {
            character.gold += 2;
        }
        else if (gameData.dodgeRoll < (.06 + (character.luck * .003))) {
            character.gold += 1;
        }

        game.updatePage();
    },

    useElixir: function () {
        if (character.elixirs >= 1) {
            character.elixirs -= 1;
            character.currentHp = character.maxHp;
            character.currentMp = character.maxMp;
            game.updatePage();
        }
        else {
            alert("You don't have any!");
        }
    },

    runAway: function () {
        if (!gameData.isRecovering) {
            if (character.currentMp >= 1) {
                character.currentMp -= 1;
            }

            if (character.gold > 3) {
                character.gold -= 3;
            }
            else {
                character.gold = 0;
            }
            game.updatePage();
            character.currentHp = character.maxHp;
            monster.currentHp = monster.maxHp;
            game.updatePage();
            document.getElementById("dodgenotice").innerHTML = "You ran away!";
            document.getElementById("fordamagebrick").innerHTML = "";
        }
        else {
            alert("You're still recovering!");
        }
    },


    gamble: function () {
        if (character.gold >= 10) {
            character.gold -= 10;
            gameData.itemRoll = Math.ceil((Math.random() * (1000 - character.luck)));
            if (0 < gameData.itemRoll && gameData.itemRoll < 10) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Kraken Trophy! Int +5!");
                character.intelligence += 2;
                game.updatePage();
            }
            else if (10 < gameData.itemRoll && gameData.itemRoll < 20) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Medusa Trophy! Dex +5!");
                character.dexterity += 5;
                game.updatePage();
            }
            else if (20 < gameData.itemRoll && gameData.itemRoll < 30) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Minotaur Trophy! Strength +5!");
                character.strength += 5;
                game.updatePage();
            }
            else if (30 < gameData.itemRoll && gameData.itemRoll < 40) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Wyvern Trophy! Luck +5!");
                character.luck += 5;
                game.updatePage();
            }
            else if (40 < gameData.itemRoll && gameData.itemRoll < 50) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Dragon Trophy! All Stats +2!!");
                str += 2;
                wis += 2;
                character.dexterity += 2;
                character.luck += 2;
                game.updatePage();
            }
            else if (100 < gameData.itemRoll && gameData.itemRoll < 200) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Dexterity Potion! Dexterity +1!");
                character.dexterity += 1;
                game.updatePage();
            }
            else if (200 < gameData.itemRoll && gameData.itemRoll < 300) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Intelligence Potion! Intelligence +1!");
                character.intelligence += 1;
                game.updatePage();
            }
            else if (300 < gameData.itemRoll && gameData.itemRoll < 400) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Luck Potion! Luck +1!");
                character.luck += 1;
                game.updatePage();
            }
            else if (400 < gameData.itemRoll && gameData.itemRoll < 500) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Strength Potion! Strength +1!");
                character.strength += 1;
                game.updatePage();
            }
            else if (500 < gameData.itemRoll && gameData.itemRoll < 600) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got an Elixir Splash! HP and MP Restored!");
                character.currentHp = character.maxHp;
                character.currentMp = character.maxMp;
                game.updatePage();
            }
            else if (600 < gameData.itemRoll && gameData.itemRoll < 700) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Mana Splash! Mana Restored");
                character.currentMp = character.maxMp;
                game.updatePage();
            }
            else if (700 < gameData.itemRoll && gameData.itemRoll < 800) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Healing Splash! Health Restored!");
                character.currentHp = character.maxHp;
                game.updatePage();
            }
            else if (800 < gameData.itemRoll && gameData.itemRoll < 1000) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got nothing! Poor you!");
                game.updatePage();
            }
        }
        else {
            alert("You don't have enough gold!");
        }
    },

    biggamble: function () {
        if (character.gold >= 1000) {
            character.gold -= 1000;
            gameData.itemRoll = Math.ceil((Math.random() * 500));
            if (gameData.itemRoll < 100) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("The Spirit King Blesses You! All Stats +20!!");
                character.strength += 20;
                character.intelligence += 20;
                character.dexterity += 20;
                character.luck += 20;
                game.updatePage();
            }

            else if (100 < gameData.itemRoll && gameData.itemRoll < 200) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("The Water Spirit Blesses You! Dex +30!");
                character.dexterity += 30;
                game.updatePage();
            }
            else if (200 < gameData.itemRoll && gameData.itemRoll < 300) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("The Fire Spirit Blesses You! Int +30!");
                character.intelligence += 30;
                game.updatePage();
            }
            else if (300 < gameData.itemRoll && gameData.itemRoll < 400) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("The Wind Spirit Blesses You! Luck +30!");
                character.luck += 30;
                game.updatePage();
            }
            else if (400 < gameData.itemRoll && gameData.itemRoll < 500) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("The Earth Spirit Blesses You! Str +30!");
                character.strength += 30;
                game.updatePage();
            }
            else if (500 < gameData.itemRoll && gameData.itemRoll < 1000) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got nothing! Poor you!");
                game.updatePage();
            }
        }
        else {
            alert("You don't have enough gold!");
        }
    },

    removeItemWindow: function () {
        document.getElementById("itemwindow").className = "itemPopup hidden";
        document.getElementById("itembg").className = "itemPopupBG hidden";
    },

    autoPlayGame: function () {
        if (character.currentHp <= (character.maxHp / 6) && gameData.isAutoPlaying == true) {
            if (character.elixirs >= 1) {
                game.useElixir();
                game.updatePage();
            }
            else if (character.elixirs < 1 && character.gold >= 10) {
                character.gold -= 10;
                character.elixirs += 1;
                game.updatePage();
            }
            else if (character.elixirs >= 10 && character.currentMp == 0) {
                game.useElixir();
                game.updatePage();
            }
        }
        if (character.bonusStatPoints >= 1) {
            gameData.randomStatRoll = Math.ceil(Math.random() * 3);
            if (gameData.randomStatRoll == 1) {
                game.addStrength();
            }
            else if (gameData.randomStatRoll == 2) {
                game.addDexterity();
            }
            else if (gameData.randomStatRoll == 3) {
                game.addIntelligence();
            }
        }
        if (gameData.isAutoPlaying == true) {
            if (character.currentMp >= 1) {
                game.magicAttack()
            }
            else {
                game.rangedAttack();
            }
            game.updatePage();
        }
    },

    setAutoPlay: function () {
        if (gameData.isAutoPlaying == false) {
            gameData.isAutoPlaying = true;
            $("#autobutton").text("playing...");
            clearInterval(gameData.timerId);
            gameData.timerId = setInterval(game.autoPlayGame, 100);
        }
        else if (gameData.isAutoPlaying == true) {
            gameData.isAutoPlaying = false;
            $("#autobutton").text("Autoplay");
            clearInterval(gameData.timerId);
        }
    },

    togglePopups: function () {
        if (gameData.disableItemPopups == false) {
            gameData.disableItemPopups = true;
            $("#popupsbutton").text("Item Popups: Off");
        }
        else if (gameData.disableItemPopups == true) {
            gameData.disableItemPopups = false;
            $("#popupsbutton").text("Item Popups: On");
        }
    },

    loadItems: function () {
        $.get("/api/Items")
       .done(function (itemsResponse) {
           $.each(itemsResponse, function () {
               var item = {
                   id: this.ItemID,
                   name: this.Name,
                   dexterity: this.Dexterity,
                   strength: this.Strength,
                   intelligence: this.Intelligence,
                   luck: this.Luck,
                   type: this.ItemTypeID
               };

               items.push(item);
           });
       })
       .fail(function () {
           alert("Failed to load items :( Please refresh the game and try again.");
       });
    },

    loadMonsters: function () {
        $.get("/api/Monster")
       .done(function (response) {
           monstersResponse = response;
       })
        .fail(function () {
            alert("Failed to load monsters :( Please refresh the game and try again.");
        });
    },

    loadMonsters: function () {
        $.get("/api/Monster")
    .done(function (response) {
        monstersResponse = response;
    })
     .fail(function () {
         alert("Failed to load monsters :( Please refresh the game and try again.");
     });
    },

    loadClasses: function () {
        $.get("/api/Race")
      .done(function (response) {
          classesResponse = response;
      })
        .fail(function () {
            alert("Failed to load classes :( Please refresh the game and try again.");
        });
    },

    loadGame: function () {
        //loadGame retrieves all user-specific data from the database. it needs to be modified to retrieve their class name once the loadClasses function is completed. it also needs to collect the user's item data once loadUserItems is completed 
        character.name = prompt("Please enter your character's name.", "Disafter");
        $.get("/api/User/" + character.name)
        .done(function (response) {
            userResponse = response;
            if (character.name != null) {
                document.getElementById("namebox").innerHTML = character.name;
            }
            character.level = userResponse.Level;
            character.characterClass = classesResponse[userResponse.ClassID].Name;
            SQLdetail = 'SELECT';
            if (character.characterClass) {
                $("#levelbox").text = "Level " + character.level + " " + character.characterClass;
            }

            character.gold = userResponse.Gold;
            character.currentFloor = userResponse.Floor;
            gameData.monstersLeftOnFloor = 10 + Math.ceil(character.currentFloor * Math.ceil(.2 * character.currentFloor));
            monster.maxHp = 3 + Math.floor(.5*userResponse.Floor);
            monster.currentHp = 3 + Math.floor(.5 * userResponse.Floor);
            character.bonusStatPoints = userResponse.BonusStatPoints;

            character.strength = userResponse.BonusStrength; //ADD GEAR AND CLASS BONUSES TO THIS
            character.dexterity = userResponse.BonusDexterity;
            character.intelligence = userResponse.BonusIntelligence;
            character.luck = userResponse.BonusLuck;
            character.elixirs = userResponse.Elixirs;

            character.currentHp = Math.floor(1.1 * userResponse.Level) + Math.floor(1.1 * userResponse.BonusStrength) + 10; //ADD IT HERE TOO
            character.maxHp = Math.floor(1.1 * userResponse.Level) + Math.floor(1.1 * userResponse.BonusStrength) + 10;
            character.currentMp = Math.floor(userResponse.BonusIntelligence + 2);
            character.maxMp = Math.floor(userResponse.BonusIntelligence + 2);




            if (gameData.monsterHPBarLength <= 0) { document.getElementById("xpbar").style.width = '1px'; }
            gameData.monsterHPBarLength = (monster.currentHp / (3 + Math.floor(.5*character.currentFloor)) * 337);
            if (monster.currentHp <= 0) {
                monster.currentHp = 0;
                gameData.monsterHPBarLength = 1;
            }

            if (gameData.monsterHPBarLength <= 0) { document.getElementById("monsterbar").style.width = '1px'; }


            for (var i = 0; i < userResponse.itemIDs.length; i++) {

                //if (userResponse.itemIDs[i].IsEquipped === true) {
                //    Equipment[userResponse.ItemID] = true;
                //    alert("Equipped " + itemsResponse[userResponse.itemIDs[i].ItemID].Name);
                //    character.strength += itemsResponse[userResponse.itemIDs[i].ItemID].Strength;
                //    character.dexterity += itemsResponse[userResponse.itemIDs[i].ItemID].Dexterity;
                //    character.intelligence += itemsResponse[userResponse.itemIDs[i].ItemID].Intelligence;
                //    character.luck += itemsResponse[userResponse.itemIDs[i].ItemID].Luck;
                //    game.updatePage();
                //}

            }
            game.updatePage();


        })
        .fail(function () {
            alert("Failed to load user data. Please refresh the page and try again.");
        });
    },

    dropItems: function () {
        gameData.itemRoll = Math.ceil((Math.random() * (3000 - character.luck)));
        if (gameData.itemRoll == 1) {
            if (!ItemsFoundArray[1]) {
                //  if (!isWeaponEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Excalibur! Strength +5!");
                }
                ItemCollectionArray[1] = "Excalibur";
                document.getElementById("weaponbrick").innerHTML = "Excalibur";
                $("#weapon1").text("Excalibur");
                character.strength += 5;
                //isWeaponEquipped = true;
                ItemsFoundArray[1] = true;
                game.updatePage();
            }

            // }
        }
        if (gameData.itemRoll == 2) {
            // if (!isHelmetEquipped) {
            if (!ItemsFoundArray[2]) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Destiny Crown! Dexterity +4!");
                }

                ItemCollectionArray[2] = "Destiny Crown";
                document.getElementById("helmetbrick").innerHTML = "Destiny Crown";
                $("#helmet1").text("Destiny Crown");
                character.dexterity += 4;
                //isHelmetEquipped = true;
                ItemsFoundArray[2] = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 3) {
            if (!ItemsFoundArray[3]) {
                // if (!isArmorEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Shadow Cape! Dexterity +3!");
                }

                ItemCollectionArray[3] = "Shadow Cape";
                document.getElementById("armorbrick").innerHTML = "Shadow Cape";
                $("#armor1").text("Shadow Cape");
                character.dexterity += 3;
                //isArmorEquipped = true;
                ItemsFoundArray[3] = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 4) {
            if (!ItemsFoundArray[4]) {
                // if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Goldcoil! Luck +5!");
                }

                ItemCollectionArray[4] = "Goldcoil";
                document.getElementById("amuletbrick").innerHTML = "Goldcoil";
                $("#amulet1").text("Goldcoil");
                character.luck += 5;
                //isAmuletEquipped = true;
                ItemsFoundArray[4] = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 5) {
            if (!ItemsFoundArray[5]) {
                ItemsFoundArray[5] = true;
                //  if (!isWeaponEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Great Bow! Dexterity +5!");
                }

                ItemCollectionArray[5] = "Great Bow";
                document.getElementById("weaponbrick").innerHTML = "Great Bow";
                $("#weapon2").text("Great Bow");
                character.dexterity += 5;
                //isWeaponEquipped = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 6) {
            if (!ItemsFoundArray[6]) {
                ItemsFoundArray[6] = true;
                //  if (!isHelmetEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Mindshield! Intelligence +3!");
                }

                ItemCollectionArray[6] = "Mindshield";
                document.getElementById("helmetbrick").innerHTML = "Mindshield";
                $("#helmet2").text("Mindshield");
                character.intelligence += 3;
                // isHelmetEquipped = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 7) {
            if (!ItemsFoundArray[7]) {
                ItemsFoundArray[7] = true;
                // if (!isArmorEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Leather Jib! Luck +3!");
                }

                ItemCollectionArray[7] = "Leather Jib";
                document.getElementById("armorbrick").innerHTML = "Leather Jib";
                $("#armor2").text("Leather Jib");
                character.luck += 3;
                // isArmorEquipped = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 8) {
            if (!ItemsFoundArray[8]) {
                ItemsFoundArray[8] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Skullchain! Strength +3");
                }
                document.getElementById("amuletbrick").innerHTML = "Skullchain";

                $("#amulet2").text("Skullchain");
                ItemCollectionArray[8] = "Skullchain";
                character.strength += 3;
                // isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 9) {
            if (!ItemsFoundArray[9]) {
                ItemsFoundArray[9] = true;
                // if (!isWeaponEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Manasphere! Intelligence +4");
                }
                document.getElementById("weaponbrick").innerHTML = "Manasphere";

                $("#weapon3").text("Manasphere");
                ItemCollectionArray[9] = "Manasphere";
                character.intelligence += 4;
                // isWeaponEquipped = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 10) {
            if (!ItemsFoundArray[10]) {
                ItemsFoundArray[10] = true;
                //  if (!isArmorEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Mithril Plate! Strength +4");
                }
                document.getElementById("armorbrick").innerHTML = "Mithril Plate";
                $("#armor3").text("Mithril Plate");

                ItemCollectionArray[10] = "Mithril Plate";
                character.strength += 4;
                // isArmorEquipped = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 11) {
            if (!ItemsFoundArray[11]) {
                ItemsFoundArray[11] = true;
                // if (!isHelmetEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Cat Ears! Luck +4!");
                }
                document.getElementById("helmetbrick").innerHTML = "Cat Ears";
                $("#helmet3").text("Cat Ears");

                ItemCollectionArray[11] = "Cat Ears"
                character.luck += 4;
                // isHelmetEquipped = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 12) {
            if (!ItemsFoundArray[12]) {
                ItemsFoundArray[12] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Twisted Coven! Dexterity +4");
                }
                document.getElementById("amuletbrick").innerHTML = "Twisted Coven";
                $("#amulet3").text("Twisted Coven");

                ItemCollectionArray[12] = "Twisted Coven";
                character.dexterity += 4;
                // isAmuletEquipped = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 13) {
            if (!ItemsFoundArray[13]) {
                ItemsFoundArray[13] = true;
                //  if (!isWeaponEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Handwarmers! Luck +2!");
                }
                document.getElementById("weaponbrick").innerHTML = "Handwarmers";
                $("#weapon4").text("Handwarmers");

                ItemCollectionArray[13] = "Handwarmers"
                character.luck += 2;
                // isWeaponEquipped = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 14) {
            if (!ItemsFoundArray[14]) {
                ItemsFoundArray[14] = true;
                //  if (!isArmorEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Magecage! Intelligence +2!");
                }
                document.getElementById("armorbrick").innerHTML = "Magecage";

                $("#armor4").text("Magecage");
                ItemCollectionArray[14] = "Magecage";
                character.intelligence += 2;
                //isArmorEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 15) {
            if (!ItemsFoundArray[15]) {
                ItemsFoundArray[15] = true;
                // if (!isHelmetEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Demon Skull! Strength +2!");
                }
                document.getElementById("helmetbrick").innerHTML = "Demon Skull";
                $("#helmet4").text("Demon Skull");

                ItemCollectionArray[15] = "Demon Skull";
                character.strength += 2;
                // isHelmetEquipped = true;
                game.updatePage();
            }
            //  }
        }
        if (gameData.itemRoll == 16) {
            if (!ItemsFoundArray[16]) {
                ItemsFoundArray[16] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Aethercrest! Intelligence +2!");
                }
                document.getElementById("amuletbrick").innerHTML = "Aethercrest";
                $("#amulet4").text("Aethercrest");

                ItemCollectionArray[16] = "Aethercrest";
                character.intelligence += 2;
                // isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 17) {
            if (!ItemsFoundArray[17]) {
                ItemsFoundArray[17] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Ancient Pact! All Stats +3!!!");
                }
                document.getElementById("amuletbrick").innerHTML = "Ancient Pact";

                $("#amulet5").text("Ancient Pact");
                ItemCollectionArray[17] = "Ancient Pact";
                character.strength += 3;
                character.dexterity += 3;
                character.intelligence += 3;
                character.luck += 3;
                // isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 18) {
            if (!ItemsFoundArray[18]) {
                ItemsFoundArray[18] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Razorfist! Str +2! Dex +2!");
                }
                document.getElementById("weaponbrick").innerHTML = "Razorfist";
                $("#weapon5").text("Razorfist");

                ItemCollectionArray[18] = "Razorfist";
                character.strength += 2;
                character.dexterity += 2;
                // isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 19) {
            if (!ItemsFoundArray[19]) {
                ItemsFoundArray[19] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Time Hat! Int +2! Luck +2!");
                }
                document.getElementById("helmetbrick").innerHTML = "Time Hat";
                $("#helmet5").text("Time Hat");

                ItemCollectionArray[19] = "Time Hat";
                character.intelligence += 2;
                character.luck += 2;
                // isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 20) {
            if (!ItemsFoundArray[20]) {
                ItemsFoundArray[20] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Angel Fortress! Str +3! Luck +1!");
                }
                document.getElementById("armorbrick").innerHTML = "Angel Fortress";
                $("#armor5").text("Angel Fortress");

                ItemCollectionArray[20] = "Angel Fortress";
                character.strength += 3;
                character.luck += 1;
                // isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 21) {
            if (!ItemsFoundArray[21]) {
                ItemsFoundArray[21] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Eldrich Tome! Int +7!");
                }
                document.getElementById("weaponbrick").innerHTML = "Eldrich Tome";
                $("#weapon6").text("Eldrich Tome");

                ItemCollectionArray[21] = "Eldrich Tome";
                character.intelligence += 7
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 22) {
            if (!ItemsFoundArray[22]) {
                ItemsFoundArray[22] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Stickygort! Luck +1!");
                }
                document.getElementById("helmetbrick").innerHTML = "Stickygort";
                $("#helmet6").text("Stickygort");

                ItemCollectionArray[22] = "Stickygort";

                character.luck += 1;
                // isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 23) {
            if (!ItemsFoundArray[23]) {
                ItemsFoundArray[23] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Force Totem! Dex +1! Int +3!");
                }
                document.getElementById("amuletbrick").innerHTML = "Force Totem";
                $("#amulet6").text("Force Totem");

                ItemCollectionArray[23] = "Force Totem";
                character.intelligence += 3;
                character.dexterity += 1;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 24) {
            if (!ItemsFoundArray[24]) {
                ItemsFoundArray[24] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Two Chains! Dex +2! Luck +2!");
                }
                document.getElementById("armorbrick").innerHTML = "Two Chains";

                $("#armor6").text("Two Chains");
                ItemCollectionArray[24] = "Two Chains";
                character.strength += 2;
                character.luck += 2;
                // isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 25) {
            if (!ItemsFoundArray[25]) {
                ItemsFoundArray[25] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Bonusfingers! character.dexterity -1! Luck +7!");
                }
                document.getElementById("weaponbrick").innerHTML = "Bonusfingers";
                $("#weapon7").text("Bonusfingers");

                ItemCollectionArray[25] = "Bonusfingers";
                character.dexterity -= 1;
                character.luck += 7;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 26) {
            if (!ItemsFoundArray[26]) {
                ItemsFoundArray[26] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Quickboots! Dexterity +3!");
                }
                document.getElementById("bootsbrick").innerHTML = "Quickboots";

                $("#boots1").text("Quickboots");
                ItemCollectionArray[26] = "Quickboots";
                character.dexterity += 3;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 27) {
            if (!ItemsFoundArray[27]) {
                ItemsFoundArray[27] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Solidfoot! Str +3!");
                }
                document.getElementById("bootsbrick").innerHTML = "Solidfoot";

                $("#boots2").text("Solidfoot");
                ItemCollectionArray[27] = "Solidfoot";
                character.strength += 3;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 28) {
            if (!ItemsFoundArray[28]) {
                ItemsFoundArray[28] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Bonustoes! Dex +1! Luck +4!");
                }
                document.getElementById("bootsbrick").innerHTML = "Bonustoes";

                $("#boots3").text("Bonustoes");
                ItemCollectionArray[28] = "Bonustoes";
                character.dexterity += 1;
                character.luck += 4;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 29) {
            if (!ItemsFoundArray[29]) {
                ItemsFoundArray[29] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Aero Treads! Dex +1! Int +3!");
                }
                document.getElementById("bootsbrick").innerHTML = "Aero Treads";

                $("#boots4").text("Aero Treads");
                ItemCollectionArray[29] = "Aero Treads";
                character.dexterity += 1;
                character.intelligence += 3;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 30) {
            if (!ItemsFoundArray[30]) {
                ItemsFoundArray[30] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Great Axe! Str +10! Dex -3!");
                }
                document.getElementById("weaponbrick").innerHTML = "Great Axe";
                $("#weapon8").text("Great Axe");

                ItemCollectionArray[30] = "Great Axe";
                character.dexterity -= 3;
                character.strength += 10;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 31) {
            if (!ItemsFoundArray[31]) {
                ItemsFoundArray[31] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Girdlehurt! Str +1! Luck +1!");
                }
                document.getElementById("beltbrick").innerHTML = "Girdlehurt";

                $("#belt1").text("Girdlehurt");
                ItemCollectionArray[31] = "Girdlehurt";
                character.luck += 1;
                character.strength += 1;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 32) {
            if (!ItemsFoundArray[32]) {
                ItemsFoundArray[32] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Dazzle Sash! Luck +4!");
                }
                document.getElementById("beltbrick").innerHTML = "Dazzle Sash";

                $("#belt2").text("Dazzle Sash");
                ItemCollectionArray[32] = "Dazzle Sash";
                character.luck += 4;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 33) {
            if (!ItemsFoundArray[33]) {
                ItemsFoundArray[33] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Spirit Wrap! Int +1! Luck +1!");
                }
                document.getElementById("beltbrick").innerHTML = "Spirit Wrap";

                $("#belt3").text("Spirit Wrap");
                ItemCollectionArray[33] = "Spirit Wrap";
                character.intelligence += 1;
                character.luck += 1;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 34) {
            if (!ItemsFoundArray[34]) {
                ItemsFoundArray[34] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Belt from Beyond! Str -2! Int +6!");
                }
                document.getElementById("beltbrick").innerHTML = "Belt from Beyond";

                $("#belt4").text("Belt from Beyond");
                ItemCollectionArray[34] = "Belt from Beyond";
                character.strength -= 2;
                character.intelligence += 6;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 35) {
            if (!ItemsFoundArray[35]) {
                ItemsFoundArray[35] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Waist of Time! Int +4! Luck +4!");
                }
                document.getElementById("beltbrick").innerHTML = "Waist of Time";

                $("#belt5").text("Waist of Time");
                ItemCollectionArray[35] = "Waist of Time";
                character.intelligence += 4;
                character.luck += 4;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 36) {
            if (!ItemsFoundArray[36]) {
                ItemsFoundArray[36] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Nasty Pants! Luck -1! Strength +3!");
                }
                document.getElementById("pantsbrick").innerHTML = "Nasty Pants";

                $("#pants1").text("Nasty Pants");
                ItemCollectionArray[36] = "Nasty Pants";
                character.luck -= 1;
                character.strength += 3;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 37) {
            if (!ItemsFoundArray[37]) {
                ItemsFoundArray[37] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Studded Trousers! Str +1! Dex +1!");
                }
                document.getElementById("pantsbrick").innerHTML = "Studded Trousers";

                $("#pants2").text("Studded Trousers");
                ItemCollectionArray[37] = "Studded Trousers";
                character.dexterity += 1;
                character.strength += 1;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 38) {
            if (!ItemsFoundArray[38]) {
                ItemsFoundArray[38] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Ultra Jeggings! Luck +2! Dex +1!");
                }
                document.getElementById("pantsbrick").innerHTML = "Ultra Jeggings";

                $("#pants3").text("Ultra Jeggings");
                ItemCollectionArray[38] = "Ultra Jeggings";
                character.luck += 2;
                character.dexterity += 1;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 39) {
            if (!ItemsFoundArray[39]) {
                ItemsFoundArray[39] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Shadow Leggings! Int +1! Dex +2!");
                }
                document.getElementById("pantsbrick").innerHTML = "Shadow Leggings";

                $("#pants4").text("Shadow Leggings");
                ItemCollectionArray[39] = "Shadow Leggings";
                character.dexterity += 2;
                character.intelligence += 10;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 40) {
            if (!ItemsFoundArray[40]) {
                ItemsFoundArray[40] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Ironkilt! Str +4! Dex -1!");
                }
                document.getElementById("pantsbrick").innerHTML = "Ironkilt";

                $("#pants5").text("Ironkilt");
                ItemCollectionArray[40] = "Ironkilt";
                character.dexterity -= 1;
                character.strength += 4;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 41) {
            if (!ItemsFoundArray[41]) {
                ItemsFoundArray[41] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Spikewall! Str +3! Dex +1!");
                }
                document.getElementById("shieldbrick").innerHTML = "Spikewall";

                $("#shield1").text("Spikewall");
                ItemCollectionArray[41] = "Spikewall";
                character.dexterity += 1;
                character.strength += 3;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 42) {
            if (!ItemsFoundArray[42]) {
                ItemsFoundArray[42] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Wooden Shield! Str +1! Dex +2!");
                }
                document.getElementById("shieldbrick").innerHTML = "Wooden Shield";

                $("#shield2").text("Wooden Shield");
                ItemCollectionArray[42] = "Wooden Shield";
                character.dexterity += 2;
                character.strength += 11;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 43) {
            if (!ItemsFoundArray[43]) {
                ItemsFoundArray[43] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Mystic Orb! Int +7! Str -1!");
                }
                document.getElementById("shieldbrick").innerHTML = "Mystic Orb";

                $("#shield3").text("Mystic Orb");
                ItemCollectionArray[43] = "Mystic Orb";
                character.strength -= 1;
                character.intelligence += 7;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 44) {
            if (!ItemsFoundArray[44]) {
                ItemsFoundArray[44] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Backup Rope! Dex +4! Int -1!");
                }
                document.getElementById("shieldbrick").innerHTML = "Backup Rope";

                $("#shield4").text("Backup Rope");
                ItemCollectionArray[44] = "Backup Rope";
                character.dexterity += 4;
                character.intelligence -= 1;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
        if (gameData.itemRoll == 45) {
            if (!ItemsFoundArray[45]) {
                ItemsFoundArray[45] = true;
                //  if (!isAmuletEquipped) {
                if (!gameData.disableItemPopups) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You found Stormnet! Int +2! Dex +2!");
                }
                document.getElementById("shieldbrick").innerHTML = "Stormnet";

                $("#shield5").text("Stormnet");
                ItemCollectionArray[45] = "Stormnet";
                character.dexterity += 2;
                character.intelligence += 2;
                //  isAmuletEquipped = true;
                game.updatePage();
            }
            // }
        }
    },

};



$("#itemwindow").on("click", game.removeItemWindow);

$(function () {
    $("#helmet, #weapon", "#amulet", "$boots", "#shield", "#belt", "#pants", "#armor").sortable(); // .disableSelection()

    var $tabs = $("#tabs").tabs();

    var $tab_items = $("ul:first li", $tabs).droppable({
        accept: ".connectedSortable li",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            var $item = $(this);
            var $list = $($item.find("a").attr("href"))
              .find(".connectedSortable");

            ui.draggable.hide("slow", function () {
                $tabs.tabs("option", "active", $tab_items.index($item));
                $(this).appendTo($list).show("slow");
            });
        }
    });
});

$("#loadgamebutton").click(game.loadGame);
$("#settingsbutton").click(game.settings);
$("#aboutbutton").click(game.about);
$("#addstrengthbutton").click(game.addStrength);
$("#adddexteritybutton").click(game.addDexterity);
$("#addintelligencebutton").click(game.addIntelligence);
$("#addluckbutton").click(game.addLuck);

game.loadClasses();
game.loadMonsters();
game.loadItems();

//delete everything below this: attempt at singular function for item dropping

/*dropItems: function () {
    gameData.itemRoll = Math.ceil((Math.random() * (3000 - character.luck)));
    if (gameData.itemRoll == item[i].id) {
        if (if item[i] is not found) {     
            if (!gameData.disableItemPopups) {
                $("#itemwindow").className = "itemPopup";
                $("#itembg").className = "itemPopupBG";
                $('#itemtext').text("You found " + item[i].name + "!");
            }                     
            $("#weapon1").text(item[i].name);
            game.updatePage();
        }
}
*/

var WebDungeonViewModel = function () {
    var self = this;

    self.strength = ko.observable(0);

    self.getStronger = function () {
        self.strength(self.strength() + 1);
    };

    self.getDebuffed = function () {
        self.strength(self.strength() - 1);
    };



};

ko.applyBindings(new WebDungeonViewModel());