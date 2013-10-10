using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDungeon.Models
{
    public class UserData
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public int BonusStrength { get; set; }
        public int BonusDexterity { get; set; }
        public int BonusIntelligence { get; set; }
        public int BonusLuck { get; set; }
        public int Level { get; set; }
        public int ClassID { get; set; }
        public int CurrentHp { get; set; }
        public int CurrentMp { get; set; }
        public int CurrentExp { get; set; }
        public int Floor { get; set; }
        public int BonusStatPoints { get; set; }
        public int Gold { get; set; }
        public int Elixirs { get; set; }
    }
}