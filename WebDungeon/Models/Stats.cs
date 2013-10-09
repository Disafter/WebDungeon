using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDungeon.Models
{
    public class Stats
    {
        public string UserName { get; set; }
        public int Strength { get; set; }
        public int Dexterity { get; set; }
        public int Intelligence { get; set; }
        public int Luck { get; set; }
        public int Level { get; set; }
        public string Class { get; set; }
        public int Hp { get; set; }
        public int Mp { get; set; }
        public int Exp { get; set; }
        public int Floor { get; set; }
        public int MonsterHp { get; set; }
        public int StatPoints { get; set; }
    }
}