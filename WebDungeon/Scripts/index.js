
//var itemsResponse;
//var monstersResponse;
//var classesResponse;
//var items = [];

var game = {
    model: {},

    WebDungeonViewModel: function () {
        var self = this;

        self.character = {
            id: -1,
            classId: 1,
            name: ko.observable("Nameless Hero"),
            level: ko.observable(1),
            currentFloor: ko.observable(1),
            characterClassId: 1,
            characterClass: ko.observable("Adventurer"),
            strength: ko.observable(2),
            dexterity: ko.observable(2),
            intelligence: ko.observable(2),
            luck: ko.observable(2),
            currentHp: ko.observable(5),
            currentMp: ko.observable(5),
            maxHp: ko.observable(2),
            maxMp: ko.observable(4),
            currentExperience: ko.observable(0),
            experienceNeededToLevel: ko.observable(1000),
            dodgeChance: ko.observable(22),
            bonusStatPoints: ko.observable(0),
            elixirs: ko.observable(0),
            gold: ko.observable(0),
            ownedItems: ko.observableArray([]),
            helmet: ko.observable({
                id: -1,
                name: "Unequipped"
            }),
            amulet: ko.observable({
                id: -1,
                name: "Unequipped"
            }),
            weapon: ko.observable({
                id: -1,
                name: "Unequipped"
            }),
            shield: ko.observable({
                id: -1,
                name: "Unequipped"
            }),
            armor: ko.observable({
                id: -1,
                name: "Unequipped"
            }),
            belt: ko.observable({
                id: -1,
                name: "Unequipped"
            }),
            pants: ko.observable({
                id: -1,
                name: "Unequipped"
            }),
            boots: ko.observable({
                id: -1,
                name: "Unequipped"
            }),

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
            randomStatRoll: ko.observable(0),
            numberOfItemsFound: ko.observable(0),
            disableItemPopups: ko.observable(false),
            magicBarLength: ko.observable(0),
            items: ko.observableArray([]),
            monsters: ko.observableArray([]),
            races: ko.observableArray([]),
            randomImageRoll: ko.observable(0),
            isFighting: ko.observable(false),
            findMonsterRoll: ko.observable(0),
            imageUrl: ko.observable("/Images/door.png"),
        };

        self.monster = {
            maxHp: ko.computed(function () {
                return 1 + Math.floor(.5 * self.character.currentFloor());
            }),
            currentHp: ko.observable(0),
            attackDamage: ko.computed(function () {
                return Math.ceil((.1 * self.character.currentFloor() * self.gameData.dodgeRoll()));
            }),
            imageUrl: ko.observable("/Images/nomonster.png"),
            name: ko.observable("...door")

        };

        self.encounter = {
            intro: ko.observable("You found "),
            name: ko.observable("the entrance to "),
            outro: ko.observable("the legendary dungeon!")
        };

        self.dungeon = ["/Images/dungeonstraight1.png", "/Images/dungeonstraight2.png", "/Images/dungeonstraight3.png", "/Images/dungeonstraight4.png", "/Images/dungeonleft1.png", "/Images/dungeonright1.png"];
        self.monsters = ["/Images/nomonster.png", "/Images/rat.png", "/Images/goblin.png", "/Images/spider.png", "/Images/spirit1.png", "/Images/spirit2.png", "/Images/spirit3.png", "/Images/orcroc2.png"];

        self.newGame = function () {
            game.ajax.newGame();
        },
        self.loadGame = function () {
            game.ajax.loadGame();
        };
        self.saveGame = function () {
            game.ajax.saveGame();
        }

        meleeDamage = ko.computed(function () {
            return Math.ceil(1 * (.9 + self.character.strength() * .045455));
        }),
        magicDamage = ko.computed(function () {
            return Math.ceil(1 * (2 + self.character.intelligence() * .1));
        }),
        rangedDamage = ko.computed(function () {
            return Math.ceil(1 * (1 + self.character.dexterity() * .01));
        })

        self.meleeAttack = function () {
            if (!self.gameData.isRecovering()) {
                if (self.character.maxHp() > 1) {
                    self.monster.currentHp(self.monster.currentHp() - Math.ceil(1 * (.9 + self.character.strength() * .045455)));
                    // if (self.monsterBarLength() <= 0) { $("#monsterbar").style.width = '1px'; }
                    if (self.monster.currentHp() <= 0) {
                        self.encounter.intro("You defeated the ");
                        self.encounter.outro(".");
                        self.monster.imageUrl(self.monsters[0]);
                        self.gameData.isFighting(false);
                        self.dropItems();
                        self.character.currentExperience(self.character.currentExperience() + Math.ceil(100 / self.character.level() + 100 / self.character.currentFloor()));
                        //     self.dropItems();
                        self.gameData.monstersLeftOnFloor(self.gameData.monstersLeftOnFloor() - 1);
                        if (self.gameData.monstersLeftOnFloor() <= 0) {
                            self.character.currentFloor(self.character.currentFloor() + 1);
                            self.gameData.monstersLeftOnFloor(10 + Math.ceil(self.character.currentFloor() * Math.ceil(.2 * self.character.currentFloor())));
                        }
                        if (self.character.currentExperience() >= self.character.experienceNeededToLevel()) {
                            self.character.currentExperience(0);
                            self.character.level(self.character.level() + 1);
                            self.character.bonusStatPoints(self.character.bonusStatPoints() + 2);
                            self.character.currentHp(self.character.maxHp());
                            self.character.currentMp(self.character.maxMp());
                            self.gameData.monstersLeftOnFloor(self.gameData.monstersLeftOnFloor() - 1);
                        }

                    }
                    self.monsterAttack();
                }
                else {
                    alert("You haven't started the game yet!");
                }

            }
            else {
                alert("You're still recovering!");
            }
        };

        self.magicAttack = function () {
            if (!self.gameData.isRecovering()) {
                if (self.character.maxHp() > 1) {
                    if (self.character.currentMp() >= 1) {
                        self.monster.currentHp(self.monster.currentHp() - Math.ceil(1 * (2 + self.character.intelligence() * .1)));
                        // if (self.gameData.monsterHPBarLength() <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
                        self.character.currentMp(self.character.currentMp() - 1);
                        self.gameData.magicBarLength(self.character.currentMp() / self.character.maxMp() * 337);
                        if (self.monster.currentHp() <= 0) {
                            self.encounter.intro("You defeated the ");
                            self.encounter.outro(".");
                            self.monster.imageUrl(self.monsters[0]);
                            self.gameData.isFighting(false);
                            self.dropItems();
                            self.character.currentExperience(self.character.currentExperience() + Math.ceil(100 / self.character.level() + 100 / self.character.currentFloor()));
                            self.gameData.monstersLeftOnFloor(self.gameData.monstersLeftOnFloor() - 1);
                            if (self.gameData.monstersLeftOnFloor() <= 0) {
                                self.character.currentFloor(self.character.currentFloor() + 1);
                                self.gameData.monstersLeftOnFloor(10 + Math.ceil(self.character.currentFloor() * (.2 * self.character.currentFloor())));
                            }
                            if (self.character.currentExperience() >= self.character.experienceNeededToLevel()) {
                                self.character.currentExperience(0);
                                self.character.level(self.character.level() + 1);
                                self.character.bonusStatPoints(self.character.bonusStatPoints() + 2);
                                self.character.currentHp(self.character.maxHp());
                                self.character.currentMp(self.character.maxMp());
                                self.gameData.monstersLeftOnFloor(self.gameData.monstersLeftOnFloor() - 1);
                            }

                        }
                        self.monsterAttack();
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
            if (self.gameData.magicBarLength() <= 0) { document.getElementById("mpbar").style.width = '1px'; }
        };

        self.rangedAttack = function () {
            if (!self.gameData.isRecovering()) {
                if (self.character.maxHp() > 1) {
                    self.monster.currentHp(self.monster.currentHp() - Math.ceil(1 + self.character.dexterity() * .01));
                    // if (self.gameData.monsterHPBarLength() <= 0) { document.getElementById("monsterbar").style.width = '1px'; }
                    if (self.monster.currentHp() <= 0) {
                        self.encounter.intro("You defeated the ");
                        self.encounter.outro(".");
                        self.monster.imageUrl(self.monsters[0]);
                        self.gameData.isFighting(false);
                        self.dropItems();
                        self.character.currentExperience(self.character.currentExperience() + Math.ceil(100 / self.character.level() + 100 / self.character.currentFloor()));
                        self.gameData.monstersLeftOnFloor(self.gameData.monstersLeftOnFloor() - 1);
                        if (self.gameData.monstersLeftOnFloor() <= 0) {
                            self.character.currentFloor(self.character.currentFloor() + 1);
                            self.gameData.monstersLeftOnFloor(10 + Math.ceil(self.character.currentFloor() * (.2 * self.character.currentFloor())));
                        }
                        if (self.character.currentExperience() >= self.character.experienceNeededToLevel()) {
                            self.character.currentExperience(0);
                            self.character.level(self.character.level() + 1);
                            self.character.bonusStatPoints(self.character.bonusStatPoints() + 2);
                            self.character.currentHp(self.character.maxHp());
                            self.character.currentMp(self.character.maxMp());
                            self.gameData.monstersLeftOnFloor(self.gameData.monstersLeftOnFloor() - 1);
                        }


                    }
                    self.monsterAttackVsRanged();
                }
                else {
                    alert("You haven't started the game yet!");
                }
            }
            else {
                alert("You're still recovering!");
            }
        };

        self.about = function () {
            alert("about");
        };

        self.signUp = function () {
            alert("Sign Up");
        };

        self.settings = function () {
            alert("Settings");
        };

        self.addStrength = function () {
            if (self.character.bonusStatPoints() >= 1) {
                self.character.bonusStatPoints(self.character.bonusStatPoints() - 1);
                self.character.strength(self.character.strength() + 1);
            }
        };

        self.addDexterity = function () {
            if (self.character.bonusStatPoints() >= 1) {
                self.character.bonusStatPoints(self.character.bonusStatPoints() - 1);
                self.character.dexterity(self.character.dexterity() + 1);
            }
        };

        self.addIntelligence = function () {
            if (self.character.bonusStatPoints() >= 1) {
                self.character.bonusStatPoints(self.character.bonusStatPoints() - 1);
                self.character.intelligence(self.character.intelligence() + 1);
            }
        };

        self.addLuck = function () {
            if (self.character.bonusStatPoints() >= 1) {
                self.character.bonusStatPoints(self.character.bonusStatPoints() - 1);
                self.character.luck(self.character.luck() + 1);
            }
        };

        self.monsterAttack = function () {
            self.gameData.dodgeRoll(Math.random());
            if (self.gameData.dodgeRoll() <= (75 - (.25 * self.character.dexterity()) + (.2 * self.character.currentFloor())) * .01) {
                document.getElementById("dodgenotice").innerHTML = "You were hit";
                document.getElementById("fordamagebrick").innerHTML = "for " + (Math.ceil((.3 * self.character.currentFloor() * self.gameData.dodgeRoll()))) + " damage!"
                self.character.currentHp(self.character.currentHp() - self.monster.attackDamage());

            }
            else {
                document.getElementById("dodgenotice").innerHTML = "You dodged!";
                document.getElementById("fordamagebrick").innerHTML = "";

            }

            if (self.gameData.dodgeRoll() > (.97 - (self.character.luck() * .0001))) {
                self.character.elixirs(self.character.elixirs() + 1);
                if (self.character.elixirs() > 10) {
                    self.character.elixirs(10);
                }
            }
            if (self.gameData.dodgeRoll() < (.04 + (self.character.luck() * .003))) {
                self.character.gold(self.character.gold() + 3);
            }
            else if (self.gameData.dodgeRoll < (.05 + (self.character.luck() * .003))) {
                self.character.gold(self.character.gold() + 2);
            }
            else if (self.gameData.dodgeRoll() < (.06 + (self.character.luck() * .003))) {
                self.character.gold(self.character.gold() + 1);
            }

        };

        self.monsterAttackVsRanged = function () {
            self.gameData.dodgeRoll(Math.random());
            if (self.gameData.dodgeRoll() <= (75 - (.30 * self.character.dexterity()) + (.2 * self.character.currentFloor())) * .01) {
                document.getElementById("dodgenotice").innerHTML = "You were hit";
                document.getElementById("fordamagebrick").innerHTML = "for " + (Math.ceil((.1 * self.character.currentFloor() * self.gameData.dodgeRoll()))) + " damage!"
                self.character.currentHp(self.character.currentHp() - (Math.ceil((.3 * self.character.currentFloor() * self.gameData.dodgeRoll()))));
                // document.getElementById("dodgechancebox").innerHTML = "Dodge:" + (100 - (((75 - (.30 * self.character.dexterity()) + (.2 * self.character.currentFloor())))) * .7).toFixed(0) + "%";
            }
            else {
                document.getElementById("dodgenotice").innerHTML = "You dodged!";
                document.getElementById("fordamagebrick").innerHTML = "";
                //document.getElementById("dodgechancebox").innerHTML = "Dodge:" + (100 - (((75 - (.30 * self.character.dexterity()) + (.2 * self.character.currentFloor())))) * .7).toFixed(0) + "%";
            }
            if (self.gameData.dodgeRoll() > (.97 - (self.character.luck() * .0001))) {
                self.character.elixirs(self.character.elixirs() + 1);
                if (self.character.elixirs() > 10) {
                    self.character.elixirs(10);
                }
            }
            if (self.gameData.dodgeRoll() < (.04 + (self.character.luck() * .003))) {
                self.character.gold(self.character.gold() + 3);
            }
            else if (self.gameData.dodgeRoll() < (.05 + (self.character.luck() * .003))) {
                self.character.gold(self.character.gold() + 2);
            }
            else if (self.gameData.dodgeRoll() < (.06 + (self.character.luck() * .003))) {
                self.character.gold(self.character.gold() + 1);
            }
        };

        self.useElixir = function () {
            if (self.character.elixirs() >= 1) {
                self.character.elixirs(self.character.elixirs() - 1);
                self.character.currentHp(self.character.maxHp());
                self.character.currentMp(self.character.maxMp());
            }
            else {
                alert("You don't have any!");
            }
        };

        self.runAway = function () {
            //if (!self.gameData.isRecovering()) {
            //    if (self.character.currentMp() >= 1) {
            //        self.character.currentMp(self.character.currentMp() - 1);
            //    }

            //    if (self.character.gold() > 3) {
            //        self.character.gold(self.character.gold() - 3);
            //    }
            //    else {
            //        self.character.gold(0);
            //    }
            //    self.character.currentHp(self.character.maxHp());
            //    self.monster.currentHp(self.monster.maxHp());
            //    document.getElementById("dodgenotice").innerHTML = "You ran away!";
            //    document.getElementById("fordamagebrick").innerHTML = "";
            //}
            //else {
            //    alert("You're still recovering!");
            //}
        };

        self.gamble = function () {
            if (self.character.gold() >= 10) {
                self.character.gold(self.character.gold() - 10);
                self.gameData.itemRoll(Math.ceil((Math.random() * (1000 - self.character.luck()))));
                if (0 < self.gameData.itemRoll() && self.gameData.itemRoll() < 10) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got a Kraken Trophy! Int +5!");
                    self.character.intelligence(character.intelligence() + 2);
                }
                else if (10 < self.gameData.itemRoll() && self.gameData.itemRoll() < 20) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got a Medusa Trophy! Dex +5!");
                    self.character.dexterity(character.dexterity() + 5);
                }
                else if (20 < self.gameData.itemRoll() && self.gameData.itemRoll() < 30) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got a Minotaur Trophy! Strength +5!");
                    self.character.strength(character.strength() + 5);
                }
                else if (30 < self.gameData.itemRoll() && self.gameData.itemRoll() < 40) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got a Wyvern Trophy! Luck +5!");
                    self.character.luck(self.character.luck() + 5);
                }
                else if (40 < self.gameData.itemRoll() && self.gameData.itemRoll() < 50) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got a Dragon Trophy! All Stats +2!!");
                    self.character.strength(self.character.strength() + 2);
                    self.character.intellgience(self.character.intelligence() + 2);
                    self.character.dexterity(self.character.dexterity() + 2);
                    self.character.luck(self.character.luck() + 2);
                }
                else if (100 < self.gameData.itemRoll() && self.gameData.itemRoll() < 200) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got a Dexterity Potion! Dexterity +1!");
                    self.character.dexterity(self.character.dexterity() + 1);
                }
                else if (200 < self.gameData.itemRoll() && self.gameData.itemRoll() < 300) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got a Intelligence Potion! Intelligence +1!");
                    self.character.intelligence(self.character.intelligence() + 1);
                }
                else if (300 < self.gameData.itemRoll() && self.gameData.itemRoll() < 400) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got a Luck Potion! Luck +1!");
                    self.character.luck(self.character.luck() + 1);
                }
                else if (400 < self.gameData.itemRoll() && self.gameData.itemRoll() < 500) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got a Strength Potion! Strength +1!");
                    self.character.strength(self.character.strength() + 1);
                }
                else if (500 < self.gameData.itemRoll() && self.gameData.itemRoll() < 600) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got an Elixir Splash! HP and MP Restored!");
                    self.character.currentHp(self.character.maxHp());
                    self.character.currentMp(self.character.maxMp());
                }
                else if (600 < self.gameData.itemRoll() && self.gameData.itemRoll() < 700) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got a Mana Splash! Mana Restored");
                    self.character.currentMp(self.character.maxMp());
                }
                else if (700 < self.gameData.itemRoll() && self.gameData.itemRoll() < 800) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got a Healing Splash! Health Restored!");
                    self.character.currentHp(self.character.maxHp());
                }
                else if (800 < self.gameData.itemRoll() && self.gameData.itemRoll() < 1000) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got nothing! Poor you!");
                }
            }
            else {
                alert("You don't have enough gold!");
            }
        };

        self.bigGamble = function () {
            if (self.character.gold() >= 1000) {
                self.character.gold(self.character.gold() - 1000);
                self.gameData.itemRoll(Math.ceil((Math.random() * 500)));
                if (self.gameData.itemRoll() < 100) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("The Spirit King Blesses You! All Stats +20!!");
                    self.character.strength(self.character.strength() + 20);
                    self.character.intelligence(self.character.intelligence() + 20);
                    self.character.dexterity(self.character.dexterity() + 20);
                    self.character.luck(self.character.luck() + 20);
                }

                else if (100 < self.gameData.itemRoll() && self.gameData.itemRoll() < 200) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("The Water Spirit Blesses You! Dex +30!");
                    self.character.dexterity += 30;
                }
                else if (200 < self.gameData.itemRoll() && self.gameData.itemRoll() < 300) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("The Fire Spirit Blesses You! Int +30!");
                    self.character.intelligence(self.character.intelligence() + 30);
                }
                else if (300 < self.gameData.itemRoll() && self.gameData.itemRoll() < 400) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("The Wind Spirit Blesses You! Luck +30!");
                    self.character.luck(self.character.luck() + 30);

                }
                else if (400 < self.gameData.itemRoll() && self.gameData.itemRoll() < 500) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("The Earth Spirit Blesses You! Str +30!");
                    self.character.strength(self.character.strength() + 30);

                }
                else if (500 < self.gameData.itemRoll() && self.gameData.itemRoll() < 1000) {
                    document.getElementById("itemwindow").className = "itemPopup";
                    document.getElementById("itembg").className = "itemPopupBG";
                    $('#itemtext').text("You got nothing! Poor you!");
                }
            }
            else {
                alert("You don't have enough gold!");
            }
        };

        self.removeItemWindow = function () {
            document.getElementById("itemwindow").className = "itemPopup hidden";
            document.getElementById("itembg").className = "itemPopupBG hidden";
        };

        self.autoPlayGame = function () {

            //recover
            if (self.gameData.isRecovering() == true) {
                if (self.character.currentHp() >= self.character.maxHp()) {
                    self.character.currentHp(self.character.maxHp());
                    self.gameData.isRecovering(false);
                    $("#autobutton").text("playing...");
                }
                else if (self.character.currentHp() <= self.character.maxHp()) {
                    self.character.currentHp(self.character.currentHp() + Math.ceil(self.character.maxHp() / 60));
                }
            }

                //check hp
            else if (self.character.currentHp() <= 0) {
                self.character.currentHp(0);
                self.gameData.isRecovering(true);
                $("#autobutton").text("recovering...");
            }

                //if not recovering, fight
            else if (self.gameData.isFighting() == true) {
                if (self.character.currentMp() >= 1) {
                    self.magicAttack()
                }
                else if (self.character.dexterity() > self.character.strength()) {
                    self.rangedAttack();
                }
                else {
                    self.meleeAttack();
                }
            }

                //if not fighting, find a new monster
            else if (self.gameData.isFighting() == false) {
                self.gameData.findMonsterRoll(Math.floor(Math.random() * 10));
                if (self.gameData.findMonsterRoll() == 0) {
                    self.gameData.isFighting(true);
                    self.gameData.randomImageRoll(Math.ceil(Math.random() * 7));
                    self.encounter.intro("You're attacked by a ");
                    self.monster.imageUrl(self.monsters[self.gameData.randomImageRoll()]);
                    if (self.gameData.randomImageRoll() == 1) { self.encounter.name("giant rat") };
                    if (self.gameData.randomImageRoll() == 2) { self.encounter.name("cactugoblar") };
                    if (self.gameData.randomImageRoll() == 3) { self.encounter.name("mysterious spider") };
                    if (self.gameData.randomImageRoll() == 4) { self.encounter.name("spooky spirit") };
                    if (self.gameData.randomImageRoll() == 5) { self.encounter.name("burger spirit") };
                    if (self.gameData.randomImageRoll() == 6) { self.encounter.name("toxic spirit") };
                    if (self.gameData.randomImageRoll() == 7) { self.encounter.name("orcroc") };
                    self.encounter.outro("!");


                    self.monster.currentHp(1 + Math.floor(.5 * self.character.currentFloor()));
                }
                else {
                    self.gameData.randomImageRoll(Math.floor(Math.random() * 6));
                    self.gameData.imageUrl(self.dungeon[self.gameData.randomImageRoll()]);
                    self.encounter.intro("You continue through ");
                    self.encounter.name("the hallway");
                    self.encounter.outro(".");
                }
            }
        };

        self.setAutoPlay = function () {
            if (self.gameData.isAutoPlaying() == false) {
                self.gameData.isAutoPlaying(true);
                $("#autobutton").text("playing...");
                clearInterval(self.gameData.timerId);
                self.gameData.timerId = setInterval(self.autoPlayGame, 500);
            }
            else if (self.gameData.isAutoPlaying() == true) {
                self.gameData.isAutoPlaying(false);
                $("#autobutton").text("Autoplay");
                clearInterval(self.gameData.timerId);
            }
        };

        self.togglePopups = function () {
            if (self.gameData.disableItemPopups() == false) {
                self.gameData.disableItemPopups(true);
                $("#popupsbutton").text("Item Popups: Off");
            }
            else if (self.gameData.disableItemPopups() == true) {
                self.gameData.disableItemPopups(false);
                $("#popupsbutton").text("Item Popups: On");
            }
        };

        self.updatePage = ko.computed(function () {
            self.character.maxHp(Math.floor(5 + (.3 * self.character.strength())));
            self.character.maxMp(Math.floor(4 + self.character.intelligence() * .5));
            if (self.character.currentHp() > self.character.maxHp()) {
                self.character.currentHp(self.current.maxHp())
            }

            document.getElementById("hpbar").style.width = ((Math.ceil(self.character.currentHp()) / Math.ceil(self.character.maxHp())) * 337) + 'px';
            document.getElementById("mpbar").style.width = ((Math.floor(self.character.currentMp()) / Math.floor(self.character.maxMp())) * 337) + 'px';
            document.getElementById("xpbar").style.width = ((self.character.currentExperience() / self.character.experienceNeededToLevel()) * 337) + 'px';
            document.getElementById("monsterbar").style.width = (((Math.ceil(self.monster.currentHp()) / (1 + Math.floor(.5 * self.character.currentFloor())))) * 337) + 'px';
        });

        self.updateDodgeChance = ko.computed(function () {
            self.character.dodgeChance(Math.floor(100 - (((78 - (.05 * self.character.dexterity()))))));
        });
        self.dropItems = function () {
            self.gameData.itemRoll(Math.ceil((Math.random() * (3000 - self.character.luck()))));
            $.each(self.gameData.items(), function () {
                if (self.gameData.itemRoll() == this.id) {
                    if (!self.gameData.disableItemPopups()) {
                        //enter the item into the database
                        $("#itemwindow").className = "itemPopup";
                        $("#itembg").className = "itemPopupBG";
                        $('#itemtext').text("You found " + this.name + "!");
                    }
                }
            });
        };
    },

    initialize: function () {
        $("#itemwindow").on("click", game.model.removeItemWindow);
        $("#settingsbutton").on("click", game.model.settings);
        $("#aboutbutton").on("click", game.model.about);
        $("#addstrengthbutton").on("click", game.model.addStrength);
        $("#adddexteritybutton").on("click", game.model.addDexterity);
        $("#addintelligencebutton").on("click", game.model.addIntelligence);
        $("#addluckbutton").on("click", game.model.addLuck);
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
        game.ajax.loadClasses();
        game.ajax.loadMonsters();
        game.ajax.loadItems();
        game.model = new game.WebDungeonViewModel();
        ko.applyBindings(game.model);
    },

    ajax: {
        newGame: function () {
            game.model.character.name(prompt("Please enter your character's name.", "Disafter"));
            if (!game.model.character.name) {
                game.model.character.name("Anonymous Hero");
            }
            var request = {
                characterClassId: game.model.character.characterClassId,
                characterName: game.model.character.name()
            };

            $.post("/api/User/Create", request)
          .done(game.ajaxCallbacks.newGameCallbackDone)
          .fail(game.ajaxCallbacks.newGameCallbackFail);
        },
        loadItems: function () {
            $.get("/api/Items")
           .done(game.ajaxCallbacks.loadItemsCallbackDone)
           .fail(game.ajaxCallbacks.loadItemsCallbackFail);
        },
        loadMonsters: function () {
            $.get("/api/Monster")
           .done(game.ajaxCallbacks.loadMonstersCallbackDone)
            .fail(game.ajaxCallbacks.loadMonstersCallbackFail);
        },
        loadClasses: function () {
            $.get("/api/Race")
          .done(game.ajaxCallbacks.loadClassesCallbackDone)
            .fail(game.ajaxCallbacks.loadClassesCallbackFail);
        },
        loadGame: function () {
            //loadGame retrieves all user-specific data from the database. it needs to be modified to retrieve their class name once the loadClasses function is completed. it also needs to collect the user's item data once loadUserItems is completed 
            game.model.character.name(prompt("Please enter your character's name.", "Disafter"));
            $.get("/api/User/Retrieve/" + game.model.character.name())
            .done(game.ajaxCallbacks.loadGameCallbackDone)
            .fail(game.ajaxCallbacks.loadGameCallbackFail);
        },

        saveGame: function () {
            var items = [];

            $.each(game.model.character.ownedItems(), function () {
                var isEquipped = false;
                if (game.model.character.helmet().id == this.id) {
                    isEquipped = true;
                }
                else if (game.model.character.amulet().id == this.id) {
                    isEquipped = true;
                }
                else if (game.model.character.weapon().id == this.id) {
                    isEquipped = true;
                }
                else if (game.model.character.shield().id == this.id) {
                    isEquipped = true;
                }
                else if (game.model.character.armor().id == this.id) {
                    isEquipped = true;
                }
                else if (game.model.character.belt().id == this.id) {
                    isEquipped = true;
                }
                else if (game.model.character.pants().id == this.id) {
                    isEquipped = true;
                }
                else if (game.model.character.boots().id == this.id) {
                    isEquipped = true;
                }

                var item = {
                    id: this.id,
                    isEquipped: isEquipped
                };
                items.push(item);
            });
            var request = {
                characterUserId: game.model.character.id,
                characterLevel: game.model.character.level(),
                characterFloor: game.model.character.currentFloor(),
                characterExp: game.model.character.currentExperience(),
                characterGold: game.model.character.gold(),
                characterElixirs: game.model.character.elixirs(),
                characterBonusStatPoints: game.model.character.bonusStatPoints(),
                characterStrength: game.model.character.strength(),
                characterDexterity: game.model.character.dexterity(),
                characterIntelligence: game.model.character.intelligence(),
                characterLuck: game.model.character.luck(),
                /*
                equippedHelmet: game.model.character.helmet(),
                equippedAmulet: game.model.character.amulet(),
                equippedWeapon: game.model.character.weapon(),
                equippedShield: game.model.character.shield(),
                equippedArmor: game.model.character.armor(),
                equippedBelt: game.model.character.belt(),
                equippedPants: game.model.character.pants(),
                equippedBoots: game.model.character.boots(),
                */
                items: items

            };
            $.post("/api/User/Save", request)
            .done(game.ajaxCallbacks.saveGameCallbackDone)
            .fail(game.ajaxCallbacks.saveGameCallbackFail);

        }
    },

    ajaxCallbacks: {
        loadClassesCallbackDone: function (response) {
            $.each(response, function () {
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
           
        },

        loadClassesCallbackFail: function () {
            alert("Failed to load classes :( Please refresh the game and try again.");
            $("#loginbox").html("Please Refresh Page");
            $("#aboutbutton").toggle();
            $("#settingsbutton").toggle();
        },

        loadMonstersCallbackDone: function (response) {
            $.each(response, function () {
                var monster = {
                    monsterId: this.MonsterID,
                    name: this.Name,
                    imageUrl: this.ImageURL,
                    baseModifier: this.BaseModifier
                };

                game.model.gameData.monsters.push(monster);
            });
        },

        loadMonstersCallbackFail: function () {
            alert("Failed to load monsters :( Please refresh the game and try again.");
            $("#loginbox").html("Please Refresh Page");
            $("#aboutbutton").toggle();
            $("#settingsbutton").toggle();
        },

        loadItemsCallbackDone: function (itemsResponse) {
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
        },

        loadItemsCallbackFail: function () {
            alert("Failed to load items :( Please refresh the game and try again.");
            $("#loginbox").html("Please Refresh Page");
            $("#aboutbutton").toggle();
            $("#settingsbutton").toggle();
        },

        loadGameCallbackDone: function (response) {
            userResponse = response;
            if (game.model.character.name() != null) {
                document.getElementById("namebox").innerHTML = game.model.character.name();
            }
            game.model.character.level(userResponse.Level);
            SQLdetail = 'SELECT';
            if (game.model.character.characterClass()) {

                if (userResponse.ClassID == 1) {
                    game.model.character.characterClass("Beserker");
                }
                else if (userResponse.ClassID == 2) {
                    game.model.character.characterClass("Pyromancer");
                }
                else if (userResponse.ClassID == 3) {
                    game.model.character.characterClass("Assassin");
                }
                else if (userResponse.ClassID == 4) {
                    game.model.character.characterClass("Dragon Knight");
                }
                else if (userResponse.ClassID == 5) {
                    game.model.character.characterClass("Murderer");
                }
                else if (userResponse.ClassID == 6) {
                    game.model.character.characterClass("Shadow Caster");
                }
                else if (userResponse.ClassID == 7) {
                    game.model.character.characterClass("Titanspawn");
                }
                else if (userResponse.ClassID == 8) {
                    game.model.character.characterClass("Gypsy Witch");
                }
                $("#levelbox").text = "Level " + game.model.character.level() + " " + game.model.character.characterClass();
            }
            game.model.gameData.imageUrl(game.model.dungeon[1]);
            game.model.character.id = userResponse.UserID;
            game.model.character.gold(userResponse.Gold);
            game.model.character.currentFloor(userResponse.Floor);
            game.model.gameData.monstersLeftOnFloor(10 + Math.ceil(game.model.character.currentFloor() * Math.ceil(.2 * game.model.character.currentFloor())));
            game.model.monster.maxHp();
            game.model.monster.currentHp(1 + Math.floor(.5 * userResponse.Floor));
            game.model.character.bonusStatPoints(userResponse.BonusStatPoints);
            game.model.character.strength(userResponse.BonusStrength); //ADD GEAR AND CLASS BONUSES TO THIS
            game.model.character.dexterity(userResponse.BonusDexterity);
            game.model.character.intelligence(userResponse.BonusIntelligence);
            game.model.character.luck(userResponse.BonusLuck);
            game.model.character.elixirs(userResponse.Elixirs);
            game.model.character.currentHp(Math.floor(5 + (.3 * game.model.character.strength()))); //ADD IT HERE TOO
            game.model.character.maxHp(Math.floor(5 + (.3 * game.model.character.strength())));
            game.model.character.currentMp(Math.floor(4 + game.model.character.intelligence() * .5));
            game.model.character.maxMp(Math.floor(4 + game.model.character.intelligence() * .5));
            game.model.character.currentExperience(userResponse.CurrentExp);

            $.each(userResponse.itemIDs, function () {
                var userItem = this;

                $.each(game.model.gameData.items(), function () {
                    if (this.id == userItem.ItemID) {
                        game.model.character.ownedItems.push(this); //all the item data is in ownedItems
                        if (userItem.IsEquipped == 1) {
                            if (this.type == 1) {
                                game.model.character.helmet(this);
                            }
                            else if (this.type == 2) {
                                game.model.character.amulet(this);
                            }
                            else if (this.type == 3) {
                                game.model.character.weapons(this);
                            }
                            else if (this.type == 4) {
                                game.model.character.shield(this);
                            }
                            else if (this.type == 5) {
                                game.model.character.armor(this);
                            }
                            else if (this.type == 6) {
                                game.model.character.belt(this);
                            }
                            else if (this.type == 7) {
                                game.model.character.pants(this);
                            }
                            else if (this.type == 8) {
                                game.model.character.boots(this);
                            }

                        }
                    }
                })
            });

            if (game.model.monster.currentHp() <= 0) {
                game.model.monster.currentHp(0);
            }
            $("#loginbox").html("Game In Progress");
            $("#aboutbutton").toggle();
            $("#addstrengthbutton").toggle();
            $("#adddexteritybutton").toggle();
            $("#addintelligencebutton").toggle();
            $("#addluckbutton").toggle();
            $("#autobutton").toggle();
            $("#popupsbutton").toggle();
            $("#elixirsbutton").toggle();
            $("#gamblebutton").toggle();
            $("#biggamblebutton").toggle();
        },
        loadGameCallbackFail: function () {
            alert("Failed to load user data. Please refresh the page and try again.");
            $("#loginbox").html("Please Refresh Page");
            $("#aboutbutton").toggle();
            $("#settingsbutton").toggle();
        },
        saveGameCallbackDone: function (response) {
            alert("save game success");
        },
        saveGameCallbackFail: function (response) {
            alert("save game fail");
        },
        newGameCallbackDone: function (response) {
            



            game.model.character.level(1);

            var answer = prompt("Please choose your character's class.\n1: Berzerker\n2:Pyromancer\n3:Assassin\n4:Dragon Knight\n5:Murderer\n6:Shadow Caster\n7:Titanspawn\n8:Gypsy Witch", "Berserker");
            if (!answer) {
                answer == Math.ceil(Math.rand() * 8);
            }

            if (answer == 1||answer == "Berserker") {
                game.model.character.characterClass("Berserker");
                game.model.character.strength(8);
                game.model.character.dexterity(3);
                game.model.character.intelligence(1);
                game.model.character.luck(1);
            }
            else if (answer == 2 ||answer == "Pyromancer") {
                game.model.character.characterClass("Pyromancer");
                game.model.character.strength(2);
                game.model.character.dexterity(2);
                game.model.character.intelligence(7);
                game.model.character.luck(2);
            }
            else if (answer == 3||answer == "Assassin") {
                game.model.character.characterClass("Assassin");
                game.model.character.strength(1);
                game.model.character.dexterity(7);
                game.model.character.intelligence(3);
                game.model.character.luck(2);
            }
            else if (answer == 4||answer == "Dragon Knight" ) {
                game.model.character.characterClass("Dragon Knight");
                game.model.character.strength(5);
                game.model.character.dexterity(3);
                game.model.character.intelligence(3);
                game.model.character.luck(5);
            }
            else if (answer == 5||answer == "Murderer") {
                game.model.character.characterClass("Murderer");
                game.model.character.strength(5);
                game.model.character.dexterity(4);
                game.model.character.intelligence(1);
                game.model.character.luck(2);
            }
            else if (answer == 6 ||answer == "Shadow Caster") {
                game.model.character.characterClass("Shadow Caster");
                game.model.character.strength(1);
                game.model.character.dexterity(1);
                game.model.character.intelligence(9);
                game.model.character.luck(1);
            }
            else if (answer == 7||answer == "Titanspawn") {
                game.model.character.characterClass("Titanspawn");
                game.model.character.strength(6);
                game.model.character.dexterity(0);
                game.model.character.intelligence(6);
                game.model.character.luck(0);
            }
            else if (answer == 8 ||answer == "Gypsy Witch") {
                game.model.character.characterClass("Gypsy Witch");
                game.model.character.strength(1);
                game.model.character.dexterity(4);
                game.model.character.intelligence(5);
                game.model.character.luck(9);
            }
            else {
                game.model.character.characterClass(answer);
                game.model.character.strength(4);
                game.model.character.dexterity(4);
                game.model.character.intelligence(4);
                game.model.character.luck(2);
            }
            $("#levelbox").text = "Level " + game.model.character.level() + " " + game.model.character.characterClass();

            game.model.gameData.imageUrl(game.model.dungeon[1]);
            game.model.character.gold(10);
            game.model.character.currentFloor(1);
            game.model.gameData.monstersLeftOnFloor(11);
            
            game.model.monster.currentHp(1);
            game.model.character.bonusStatPoints(2);
            game.model.character.elixirs(5);
            game.model.character.currentHp(5);
            game.model.character.maxHp(5);
            game.model.character.currentMp(4);
            game.model.character.maxMp(4);
            game.model.character.currentExperience(0);

            alert("New Game Creation Succeeded! Your Journey Begins!");
            $("#loginbox").html("Game In Progress");
            $("#aboutbutton").toggle();

        },
        newGameCallbackFail: function (response) {
            alert("New Game Creation Failed! Refresh the game and try again!");
            $("#loginbox").html("Please Refresh Page");
            $("#aboutbutton").toggle();
            $("#settingsbutton").toggle();
        }
    },


};
game.initialize();

