using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDungeon.Models
{
    public class CreateUserRequest
    {
       
        public string CharacterName { get; set; }
        public int CharacterClassId { get; set; }
        
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