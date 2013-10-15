
//var itemsResponse;
//var monstersResponse;
//var classesResponse;
//var items = [];

var game = {
    model: {},

    WebDungeonViewModel: function () {
        var self = this;

        self.character = {
            name: ko.observable("Nameless Hero"),
            level: ko.observable(1),
            currentFloor: ko.observable(1),
            characterClass: ko.observable("Berzerker"),
            strength: ko.observable(2),
            dexterity: ko.observable(2),
            intelligence: ko.observable(2),
            luck: ko.observable(2),
            currentHp: ko.observable(2),
            currentMp: ko.observable(5),
            maxHp: ko.observable(2),
            maxMp: ko.observable(4),
            currentExperience: ko.observable(0),
            experienceNeededToLevel: ko.observable(100),
            bonusStatPoints: ko.observable(0),
            elixirs: ko.observable(0),
            gold: ko.observable(0),
            ownedItems: ko.observableArray([])
        };

        self.gameData = {
            monsterHpBarLength: ko.observable(0),
            monstersLeftOnFloor: ko.observable(0),
            dodgeRoll: ko.observable(0),
            itemRoll: ko.observable(0),
            isAutoPlaying: ko.observable(false),
            wasAutoPlaying: ko.observable(false),
            isRecovering: ko.observable(false),
            timerId: ko.observable(1),
            recoverId: ko.observable(2),
            randomStatRoll: ko.observable(0),
            numberOfItemsFound: ko.observable(0),
            disableItemPopups: ko.observable(false),
            magicBarLength: ko.observable(0),
            items: ko.observableArray([]),
            monsters: ko.observableArray([]),
            races: ko.observableArray([])
        };

        self.monster = {
            maxHp: ko.observable(0),
            currentHp: ko.observable(0),
            attackDamage: ko.observable(1)
        };
    },

    initialize: function() {
        $("#itemwindow").on("click", game.removeItemWindow);
        $("#loadgamebutton").on("click", game.loadGame);
        $("#settingsbutton").on("click", game.settings);
        $("#aboutbutton").on("click", game.about);
        $("#addstrengthbutton").on("click", game.addStrength);
        $("#adddexteritybutton").on("click", game.addDexterity);
        $("#addintelligencebutton").on("click", game.addIntelligence);
        $("#addluckbutton").on("click", game.addLuck);

        game.loadClasses();
        game.loadMonsters();
        game.loadItems();

        game.model = new game.WebDungeonViewModel();

        ko.applyBindings(model);
    },

    meleeAttack: function () { //converted to knockout
        if (!gameData.isRecovering) {
            if (character.maxHp() > 1) {
                monster.currentHp(monster.currentHp() - (Math.floor(1 * (.9 + character.strength() * .045455))));
                if (monsterBarLength() <= 0) { $("#monsterbar").style.width = '1px'; }
                if (monster.currentHp() <= 0) {
                    character.currentExperience(character.currentExperience() + (Math.floor(10 / character.level()) + Math.floor(10 / character.currentFloor())));
                    game.dropItems();
                    gameData.monstersLeftOnFloor(gameData.monstersLeftOnFloor() - 1);
                    if (gameData.monstersLeftOnFloor() <= 0) {
                        character.currentFloor(character.currentFloor() + 1);
                        gameData.monstersLeftOnFloor(10 + Math.ceil(character.currentFloor() * Math.ceil(.2 * character.currentFloor())));
                    }
                    if (character.currentExperience() >= character.experienceNeededToLevel()) {
                        character.currentExperience(0);
                        character.level(character.level() + 1);
                        character.bonusStatPoints(character.bonusStatPoints() + 2);
                        character.currentHp(character.maxHp());
                        character.currentMp(maxMP());
                        gameData.monstersLeftOnFloor(gameData.monstersLeftOnFloor() - 1);
                    }
                    monster.currentHp(3 + Math.floor(.5 * character.currentFloor()));
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
        if (!gameData.isRecovering()) {
            if (character.maxHp() > 1) {
                if (character.currentMp() >= 1) {
                    monster.currentHp(monster.currentHp() - Math.floor(1 * (2 + character.intelligence() * .02)));
                    if (gameData.monsterHPBarLength() <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
                    character.currentMp(character.currentMp() - 1);
                    gameData.magicBarLength(character.currentMp() / character.maxMp() * 337);
                    if (monster.currentHp() <= 0) {
                        character.currentExperience(character.currentExperience() + (10 / character.level()) + (10 / character.currentFloor()));
                        game.dropItems();
                        gameData.monstersLeftOnFloor(gameData.monstersLeftOnFloor() - 1);
                        if (gameData.monstersLeftOnFloor() <= 0) {
                            character.currentFloor(character.currentFloor() + 1);
                            gameData.monstersLeftOnFloor(10 + Math.ceil(character.currentFloor() * (.2 * character.currentFloor())));
                        }
                        if (character.currentExperience() >= character.experienceNeededToLevel()) {
                            character.currentExperience(0);
                            character.level(character.level() + 1);
                            character.bonusStatPoints(character.bonusStatPoints() + 2);
                            character.currentHp(character.maxHp());
                            character.currentMp(character.maxMp());
                            gameData.monstersLeftOnFloor(gameData.monstersLeftOnFloor() - 1);
                        }
                        monster.currentHp(3 + Math.floor(.5 * character.currentFloor()));
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
        if (magicBarLength() <= 0) { document.getElementById("mpbar").style.width = '1px'; }
    },

    rangedAttack: function () {
        if (!gameData.isRecovering()) {
            if (character.maxHp() > 1) {
                monster.currentHp(monster.currentHp() - Math.floor(1 * (1 + character.dexterity() * .01)));
                if (gameData.monsterHPBarLength() <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
                if (monster.currentHp() <= 0) {
                    character.currentExperience(character.currentExperience() + (10 / character.level()) + (10 / character.currentFloor()));
                    game.dropItems();
                    gameData.monstersLeftOnFloor(gameData.monstersLeftOnFloor() - 1);
                    if (gameData.monstersLeftOnFloor() <= 0) {
                        character.currentFloor(character.currentFloor() + 1);
                        gameData.monstersLeftOnFloor(10 + Math.ceil(character.currentFloor() * (.2 * character.currentFloor())));
                    }
                    if (character.currentExperience() >= character.experienceNeededToLevel()) {
                        character.currentExperience(0);
                        character.level(character.level() + 1);
                        character.bonusStatPoints(character.bonusStatPoints() + 2);
                        character.currentHp(character.maxHp());
                        character.currentMp(character.maxMp());
                        gameData.monstersLeftOnFloor(gameData.monstersLevelOnFloor() - 1);
                    }
                    monster.currentHp(3 + Math.floor(.5 * character.currentFloor()));
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
        if (character.bonusStatPoints() >= 1) {
            character.bonusStatPoints(character.bonusStatPoints() - 1));
            character.strength(character.strength() + 1);
        }
    },

    addDexterity: function () {
        if (character.bonusStatPoints() >= 1) {
            character.bonusStatPoints(character.bonusStatPoints() - 1);
            character.dexterity(character.dexterity() + 1);
        }
    },

    addIntelligence: function () {
        if (character.bonusStatPoints() >= 1) {
            character.bonusStatPoints(character.bonusStatPoints() - 1);
            character.intelligence(character.intelligence() += 1);
        }
    },

    addLuck: function () {
        if (character.bonusStatPoints() >= 1) {
            character.bonusStatPoints(character.bonusStatPoints() - 1);
            character.luck(character.luck() + 1);
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
        monster.maxHp = 3 + Math.floor(.5 * character.currentFloor);
        document.getElementById("floorbrick").innerHTML = "Floor: " + character.currentFloor;
        document.getElementById("loginbox").innerHTML = "Inside Dungeon";
        gameData.monsterHPBarLength = (monster.currentHp / (3 + Math.floor(.5 * character.currentFloor)) * 337);
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
        if (!gameData.isRecovering()) {
            clearInterval(gameData.recoverId());
        }
        else if (character.currentHp() >= character.maxHp()) {
            character.currentHp(character.maxHp());
            clearInterval(gameData.recoverId());
            gameData.isRecovering(false);
            if (gameData.wasAutoPlaying()) {
                game.setAutoPlay();
                $("#autobutton").text("playing...");
                gameData.wasAutoPlaying(false);
            }
            else {
                $("#autobutton").text("Autoplay");
            }
        }
        else if (character.currentHp() <= character.maxHp()) {
            character.currentHp(character.currentHp() + Math.ceil(character.maxHp() / 60));
            document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(character.currentHp()) + "/" + Math.ceil(character.maxHp());
            document.getElementById("hpbar").style.width = ((Math.ceil(character.currentHp()) / Math.ceil(character.maxHp())) * 337) + 'px';
            $("#autobutton").text("recovering...");
        }
        document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(character.currentHp()) + "/" + Math.ceil(character.maxHp());
        document.getElementById("hpbar").style.width = ((Math.ceil(character.currentHp()) / Math.ceil(character.maxHp())) * 337) + 'px';
    },

    monsterAttack: function () {
        gameData.dodgeRoll(Math.random());
        if (gameData.dodgeRoll <= (75 - (.25 * character.dexterity) + (.2 * character.currentFloor)) * .01) {
            document.getElementById("dodgenotice").innerHTML = "You were hit";
            document.getElementById("fordamagebrick").innerHTML = "for " + (Math.ceil((.3 * character.currentFloor * gameData.dodgeRoll))) + " damage!"
            character.currentHp -= (Math.ceil((.3 * character.currentFloor * gameData.dodgeRoll)));

        }
        else {
            document.getElementById("dodgenotice").innerHTML = "You dodged!";
            document.getElementById("fordamagebrick").innerHTML = "";

        }

        if (gameData.dodgeRoll() > (.97 - (character.luck() * .001))) {
            character.elixirs(character.elixirs() + 1);
            if (character.elixirs() > 10) {
                character.elixirs(10);
            }
        }
        if (gameData.dodgeRoll() < (.04 + (character.luck() * .003))) {
            character.gold(character.gold() + 3);
        }
        else if (gameData.dodgeRoll < (.05 + (character.luck() * .003))) {
            character.gold(character.gold() + 2);
        }
        else if (gameData.dodgeRoll() < (.06 + (character.luck() * .003))) {
            character.gold(character.gold() + 1);
        }


    },

    monsterAttackVsRanged: function () {
        gameData.dodgeRoll(Math.random());
        if (gameData.dodgeRoll() <= (75 - (.30 * character.dexterity()) + (.2 * character.currentFloor())) * .007) {
            document.getElementById("dodgenotice").innerHTML = "You were hit";
            document.getElementById("fordamagebrick").innerHTML = "for " + (Math.ceil((.3 * character.currentFloor() * gameData.dodgeRoll()))) + " damage!"
            character.currentHp(character.currentHp() - (Math.ceil((.3 * character.currentFloor() * gameData.dodgeRoll()))));
            document.getElementById("dodgechancebox").innerHTML = "Dodge:" + (100 - (((75 - (.30 * character.dexterity()) + (.2 * character.currentFloor())))) * .7).toFixed(0) + "%";
        }
        else {
            document.getElementById("dodgenotice").innerHTML = "You dodged!";
            document.getElementById("fordamagebrick").innerHTML = "";
            document.getElementById("dodgechancebox").innerHTML = "Dodge:" + (100 - (((75 - (.30 * character.dexterity()) + (.2 * character.currentFloor())))) * .7).toFixed(0) + "%";
        }
        if (gameData.dodgeRoll() > (.97 - (character.luck() * .001))) {
            character.elixirs(character.elixirs() + 1);
            if (character.elixirs() > 10) {
                character.elixirs(10);
            }
        }
        if (gameData.dodgeRoll() < (.04 + (character.luck() * .003))) {
            character.gold(character.gold() + 3);
        }
        else if (gameData.dodgeRoll() < (.05 + (character.luck() * .003))) {
            character.gold(character.gold() + 2);
        }
        else if (gameData.dodgeRoll() < (.06 + (character.luck() * .003))) {
            character.gold(character.gold() + 1);
        }
    },

    useElixir: function () {
        if (character.elixirs() >= 1) {
            character.elixirs(character.elixirs() - 1);
            character.currentHp(character.maxHp());
            character.currentMp(character.maxMp());
        }
        else {
            alert("You don't have any!");
        }
    },

    runAway: function () {
        if (!gameData.isRecovering()) {
            if (character.currentMp() >= 1) {
                character.currentMp(character.currentMp() - 1);
            }

            if (character.gold() > 3) {
                character.gold(character.gold() - 3);
            }
            else {
                character.gold(0);
            }
            character.currentHp(character.maxHp());
            monster.currentHp(monster.maxHp());
            document.getElementById("dodgenotice").innerHTML = "You ran away!";
            document.getElementById("fordamagebrick").innerHTML = "";
        }
        else {
            alert("You're still recovering!");
        }
    },

    gamble: function () {
        if (character.gold() >= 10) {
            character.gold(character.gold() - 10);
            gameData.itemRoll(Math.ceil((Math.random() * (1000 - character.luck()))));
            if (0 < gameData.itemRoll() && gameData.itemRoll() < 10) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Kraken Trophy! Int +5!");
                character.intelligence(character.intelligence() + 2);
            }
            else if (10 < gameData.itemRoll() && gameData.itemRoll() < 20) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Medusa Trophy! Dex +5!");
                character.dexterity(character.dexterity() + 5);
            }
            else if (20 < gameData.itemRoll() && gameData.itemRoll() < 30) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Minotaur Trophy! Strength +5!");
                character.strength(character.strength() + 5);
            }
            else if (30 < gameData.itemRoll() && gameData.itemRoll() < 40) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Wyvern Trophy! Luck +5!");
                character.luck(character.luck() + 5);
            }
            else if (40 < gameData.itemRoll() && gameData.itemRoll() < 50) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Dragon Trophy! All Stats +2!!");
                character.strength(character.strength() + 2);
                character.intellgience(character.intelligence() + 2);
                character.dexterity(character.dexterity() + 2);
                character.luck(character.luck() + 2);
            }
            else if (100 < gameData.itemRoll() && gameData.itemRoll() < 200) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Dexterity Potion! Dexterity +1!");
                character.dexterity(character.dexterity() + 1);
            }
            else if (200 < gameData.itemRoll() && gameData.itemRoll() < 300) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Intelligence Potion! Intelligence +1!");
                character.intelligence(character.intelligence() + 1);
            }
            else if (300 < gameData.itemRoll() && gameData.itemRoll() < 400) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Luck Potion! Luck +1!");
                character.luck(character.luck() + 1);
            }
            else if (400 < gameData.itemRoll() && gameData.itemRoll() < 500) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Strength Potion! Strength +1!");
                character.strength(character.strength() + 1);
            }
            else if (500 < gameData.itemRoll() && gameData.itemRoll() < 600) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got an Elixir Splash! HP and MP Restored!");
                character.currentHp(character.maxHp());
                character.currentMp(character.maxMp());
            }
            else if (600 < gameData.itemRoll() && gameData.itemRoll() < 700) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Mana Splash! Mana Restored");
                character.currentMp(character.maxMp());
            }
            else if (700 < gameData.itemRoll() && gameData.itemRoll() < 800) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got a Healing Splash! Health Restored!");
                character.currentHp(character.maxHp());
            }
            else if (800 < gameData.itemRoll() && gameData.itemRoll() < 1000) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got nothing! Poor you!");
            }
        }
        else {
            alert("You don't have enough gold!");
        }
    },

    biggamble: function () {
        if (character.gold() >= 1000) {
            character.gold(character.gold() - 1000);
            gameData.itemRoll(Math.ceil((Math.random() * 500)));
            if (gameData.itemRoll() < 100) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("The Spirit King Blesses You! All Stats +20!!");
                character.strength(character.strength() + 20);
                character.intelligence(character.intelligence() + 20);
                character.dexterity(character.dexterity() + 20);
                character.luck(character.luck() + 20);
            }

            else if (100 < gameData.itemRoll() && gameData.itemRoll() < 200) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("The Water Spirit Blesses You! Dex +30!");
                character.dexterity += 30;
            }
            else if (200 < gameData.itemRoll() && gameData.itemRoll() < 300) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("The Fire Spirit Blesses You! Int +30!");
                character.intelligence(character.intelligence() + 30);
            }
            else if (300 < gameData.itemRoll() && gameData.itemRoll() < 400) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("The Wind Spirit Blesses You! Luck +30!");
                character.luck(character.luck() + 30);

            }
            else if (400 < gameData.itemRoll() && gameData.itemRoll() < 500) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("The Earth Spirit Blesses You! Str +30!");
                character.strength(character.strength() + 30);

            }
            else if (500 < gameData.itemRoll() && gameData.itemRoll() < 1000) {
                document.getElementById("itemwindow").className = "itemPopup";
                document.getElementById("itembg").className = "itemPopupBG";
                $('#itemtext').text("You got nothing! Poor you!");
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
        if (character.currentHp() <= (character.maxHp() / 5) && gameData.isAutoPlaying() == true) {
            if (character.elixirs() >= 1) {
                game.useElixir();
            }
            else if (character.elixirs() < 1 && character.gold() >= 10) {
                character.gold(character.gold() - 10);
                character.elixirs(character.elixirs() + 1);
            }
            else if (character.elixirs() >= 10 && character.currentMp() == 0) {
                game.useElixir();
            }
        }
        if (character.bonusStatPoints() >= 1) {
            gameData.randomStatRoll(Math.ceil(Math.random() * 3));
            if (gameData.randomStatRoll() == 1) {
                game.addStrength();
            }
            else if (gameData.randomStatRoll() == 2) {
                game.addDexterity();
            }
            else if (gameData.randomStatRoll() == 3) {
                game.addIntelligence();
            }
        }
        if (gameData.isAutoPlaying() == true) {
            if (character.currentMp() >= 1) {
                game.magicAttack()
            }
            else {
                game.rangedAttack();
            }
        }
    },

    setAutoPlay: function () {
        if (gameData.isAutoPlaying() == false) {
            gameData.isAutoPlaying(true);
            $("#autobutton").text("playing...");
            clearInterval(gameData.timerId());
            gameData.timerId(setInterval(game.autoPlayGame, 100));
        }
        else if (gameData.isAutoPlaying == true) {
            gameData.isAutoPlaying = false;
            $("#autobutton").text("Autoplay");
            clearInterval(gameData.timerId());
        }
    },

    togglePopups: function () {
        if (gameData.disableItemPopups() == false) {
            gameData.disableItemPopups(true);
            $("#popupsbutton").text("Item Popups: Off");
        }
        else if (gameData.disableItemPopups() == true) {
            gameData.disableItemPopups(false);
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

               game.model.gameData.items().push(item);
           });
       })
       .fail(function () {
           alert("Failed to load items :( Please refresh the game and try again.");
       });
    },

    loadMonsters: function () {
        $.get("/api/Monster")
       .done(function (response) {
           $.each(response, function() {
               var monster = {
                   monsterId: this.MonsterID,
                   name: this.Name,
                   imageUrl: this.ImageURL,
                   baseModifier: this.BaseModifier
               };

               game.model.gameData.monsters.push(monster);
           });
       })
        .fail(function () {
            alert("Failed to load monsters :( Please refresh the game and try again.");
        });
    },

    loadClasses: function () {
        $.get("/api/Race")
      .done(function (response) {
          $.each(response, function() {
              var race = {
                  raceId: this.ClassID,
                  name: this.ClassName,
                  baseStrength: this.BaseStrength,
                  baseDexterity: this.BaseDexterity,
                  baseIntelligence: this.BaseIntelligence,
                  baseLuck: this.BaseLuck
              };

              game.model.gameData.races.push(race);
          });
      })
        .fail(function () {
            alert("Failed to load classes :( Please refresh the game and try again.");
        });
    },

    loadGame: function () {
        //loadGame retrieves all user-specific data from the database. it needs to be modified to retrieve their class name once the loadClasses function is completed. it also needs to collect the user's item data once loadUserItems is completed 
        character.name(prompt("Please enter your character's name.", "Disafter"));
        $.get("/api/User/" + character.name())
        .done(function (response) {
            userResponse = response;
            if (character.name() != null) {
                document.getElementById("namebox").innerHTML = character.name;
            }
            character.level(userResponse.Level);
            character.characterClass(classesResponse[userResponse.ClassID].Name);
            SQLdetail = 'SELECT';
            if (character.characterClass()) {
                $("#levelbox").text = "Level " + character.level() + " " + character.characterClass();
            }

            character.gold(userResponse.Gold);
            character.currentFloor(userResponse.Floor);
            gameData.monstersLeftOnFloor(10 + Math.ceil(character.currentFloor() * Math.ceil(.2 * character.currentFloor())));
            monster.maxHp(3 + Math.floor(.5 * userResponse.Floor));
            monster.currentHp(3 + Math.floor(.5 * userResponse.Floor));
            character.bonusStatPoints(userResponse.BonusStatPoints);

            character.strength(userResponse.BonusStrength); //ADD GEAR AND CLASS BONUSES TO THIS
            character.dexterity(userResponse.BonusDexterity);
            character.intelligence(userResponse.BonusIntelligence);
            character.luck(userResponse.BonusLuck);
            character.elixirs(userResponse.Elixirs);

            character.currentHp(Math.floor(1.1 * userResponse.Level) + Math.floor(1.1 * userResponse.BonusStrength) + 10); //ADD IT HERE TOO
            character.maxHp(Math.floor(1.1 * userResponse.Level) + Math.floor(1.1 * userResponse.BonusStrength) + 10);
            character.currentMp(Math.floor(userResponse.BonusIntelligence + 2));
            character.maxMp(Math.floor(userResponse.BonusIntelligence + 2));




            if (gameData.monsterHPBarLength() <= 0) { document.getElementById("xpbar").style.width = '1px'; }
            gameData.monsterHPBarLength(monster.currentHp / (3 + Math.floor(.5 * character.currentFloor)) * 337);
            if (monster.currentHp() <= 0) {
                monster.currentHp(0);
                gameData.monsterHPBarLength(1);
            }

            if (gameData.monsterHPBarLength() <= 0) { document.getElementById("monsterbar").style.width = '1px'; }


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
        })
        .fail(function () {
            alert("Failed to load user data. Please refresh the page and try again.");
        });
    },

    //dropItems: function () {
    //    gameData.itemRoll() = Math.ceil((Math.random() * (3000 - character.luck())));
    //    if (gameData.itemRoll() == item[i].id) {
    //        if (if item[i] is not found) {     
    //            if (!gameData.disableItemPopups()) {
    //                $("#itemwindow").className = "itemPopup";
    //                $("#itembg").className = "itemPopupBG";
    //                $('#itemtext').text("You found " + item[i].name + "!");
    //            }                     
    //            $("#weapon1").text(item[i].name);
    //        }
    //    }
    //}
};

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

