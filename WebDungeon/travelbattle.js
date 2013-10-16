self.dungeon = ['<img src="/Images/dungeonstraight.png"/>', '<img src="/Images/dungeonleft.png"/>', '<img src="/Images/dungeonright.png"/>']

self.dungeonTravel = function () {
    self.gameData.randomImageRoll(Math.floor(Math.random() * 3));
    document.getElementById("mainimageframe").innerHTML = self.dungeon[randomImageRoll()];
}

self.setDungeonInterval = function () {
    if (!self.gameData.isTraveling()) {
        clearInterval(self.gameData.travelId);
    }
    else if (self.monster.currentHp() <= 0) {
        clearInterval(self.gameData.travelId);
        self.gameData.isTraveling(false);
        if (self.gameData.wasAutoPlaying()) {
            self.setAutoPlay();
            $("#autobutton").text("playing...");
            self.gameData.wasAutoPlaying(false);
        }
        else {
            $("#autobutton").text("Autoplay");
        }
    }
    else if (self.character.currentHp() <= self.character.maxHp()) {
        self.character.currentHp(self.character.currentHp() + Math.ceil(self.character.maxHp() / 60));
        document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(self.character.currentHp()) + "/" + Math.ceil(self.character.maxHp());
        document.getElementById("hpbar").style.width = ((Math.ceil(self.character.currentHp()) / Math.ceil(self.character.maxHp())) * 337) + 'px';
        $("#autobutton").text("recovering...");
    }

};

self.recover = function () {
    if (!self.gameData.isRecovering()) {
        clearInterval(self.gameData.recoverId);
    }
    else if (self.character.currentHp() >= self.character.maxHp()) {
        self.character.currentHp(self.character.maxHp());
        clearInterval(self.gameData.recoverId);
        self.gameData.isRecovering(false);
        if (self.gameData.wasAutoPlaying()) {
            self.setAutoPlay();
            $("#autobutton").text("playing...");
            self.gameData.wasAutoPlaying(false);
        }
        else {
            $("#autobutton").text("Autoplay");
        }
    }
    else if (self.character.currentHp() <= self.character.maxHp()) {
        self.character.currentHp(self.character.currentHp() + Math.ceil(self.character.maxHp() / 60));
        document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(self.character.currentHp()) + "/" + Math.ceil(self.character.maxHp());
        document.getElementById("hpbar").style.width = ((Math.ceil(self.character.currentHp()) / Math.ceil(self.character.maxHp())) * 337) + 'px';
        $("#autobutton").text("recovering...");
    }
    document.getElementById("hpheader").innerHTML = "HP : " + Math.ceil(self.character.currentHp()) + "/" + Math.ceil(self.character.maxHp());
    document.getElementById("hpbar").style.width = ((Math.ceil(self.character.currentHp()) / Math.ceil(self.character.maxHp())) * 337) + 'px';
};


self.autoPlayGame = function () {
    self.gameData.randomImageRoll(Math.floor(Math.random() * 3));
    document.getElementById("mainimageframe").innerHTML = self.dungeon[self.gameData.randomImageRoll()];
    if (self.character.currentHp() <= (self.character.maxHp() / 5) && self.gameData.isAutoPlaying() == true) {
        if (self.character.elixirs() >= 1) {
            self.useElixir();
        }
        else if (self.character.elixirs() < 1 && self.character.gold() >= 10) {
            self.character.gold(self.character.gold() - 10);
            self.character.elixirs(self.character.elixirs() + 1);
        }
        else if (self.character.elixirs() >= 10 && self.character.currentMp() == 0) {
            self.useElixir();
        }
    }
    if (self.character.bonusStatPoints() >= 1) {
        self.gameData.randomStatRoll(Math.ceil(Math.random() * 3));
        if (self.gameData.randomStatRoll() == 1) {
            self.addStrength();
        }
        else if (self.gameData.randomStatRoll() == 2) {
            self.addDexterity();
        }
        else if (self.gameData.randomStatRoll() == 3) {
            self.addIntelligence();
        }
    }
    if (self.gameData.isAutoPlaying() == true) {
        if (self.character.currentMp() >= 1) {
            self.magicAttack()
        }
        else {
            self.rangedAttack();
        }
    }
}

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

self.checkHp = ko.computed(function () {
    if (self.character.currentHp() <= 0) {
        self.character.currentHp(1)
        if (self.gameData.isAutoPlaying() == true) {
            self.gameData.wasAutoPlaying(true);
        }
        self.gameData.isAutoPlaying(false);
        self.gameData.isRecovering(true);
        $("#autobutton").text("recovering...");
        clearInterval(self.gameData.timerId);
        clearInterval(self.gameData.recoverId);
        self.gameData.recoverId = setInterval(self.recover, 500);
    }
});

game start
autoplaying = true
traveling = true
fighting = false
recovering = false

auto play function (always trying to travel, fight, or recover, depending on variables)

    if hp=0
        recovering = true
    traveling = false

    if recovering and hp >= maxhp
    recovering = false
    
    

else if recovering
    recover within this function, ensuring that traveling stays false while recovering

            

    if not fighting and not recovering
    if traveling
-travel
roll for monster encounter
if you roll a monster, fighting = true, traveling = false

 


self.autoPlayGame = function() {

    //recover
    if(self.gameData.isRecovering() == true){
        if (self.character.currentHp() >= self.character.maxHp()) {
            self.character.currentHp(self.character.maxHp());
            self.gameData.isRecovering(false);
        }
        else if (self.character.currentHp() <= self.character.maxHp()) {
            self.character.currentHp(self.character.currentHp() + Math.ceil(self.character.maxHp() / 60));
            $("#autobutton").text("recovering...");
        }}
   
        //check hp
    else if (self.character.currentHp() <= 0 && self.gameData.isRecovering() == false) {
        self.character.currentHp(1);        
        self.gameData.isRecovering(true);
    }
  
        //if not recovering, fight
    else if (self.gameData.isRecovering() == false && self.gameData.isFighting() == true){
       
            if (self.character.currentMp() >= 1) {
                self.magicAttack()
            }
            else if(self.character.dexterity() > self.character.strength()){
                self.rangedAttack();
            }
            else{
                self.meleeAttack();
            }
        }
    
        //if not fighting, find a new monster
    else if(self.gameData.isFighting() == false && self.gameData.isRecovering() == false){
        self.gameData.randomImageRoll(Math.floor(Math.random() * 3));
        document.getElementById("mainimageframe").innerHTML = self.dungeon[self.gameData.randomImageRoll()];
    }

    
}}};