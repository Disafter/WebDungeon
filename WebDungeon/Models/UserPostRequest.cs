using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDungeon.Models
{
    public class UserPostRequest
    {
        public int CharacterUserId { get; set; }
        public int CharacterLevel { get; set; }
        public int CharacterFloor { get; set; }
        public int CharacterExp { get; set; }
        public int CharacterGold { get; set; }
        public int CharacterElixirs { get; set; }
        public int CharacterBonusStatPoints { get; set; }
        public int CharacterStrength { get; set; }
        public int CharacterDexterity { get; set; }
        public int CharacterIntelligence { get; set; }
        public int CharacterLuck { get; set; }
        public OwnedItem[] Items { get; set; }

        /*
        public int EquippedHelmet { get; set; }
        public int EquippedAmulet { get; set; }
        public int EquippedWeapon { get; set; }
        public int EquippedShield { get; set; }
        public int EquippedArmor { get; set; }
        public int EquippedBelt { get; set; }
        public int EquippedPants { get; set; }
        public int EquippedBoots { get; set; }
        */

        
    }
}