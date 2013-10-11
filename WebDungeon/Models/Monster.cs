using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDungeon.Models
{
    public class Monster
    {
        public int MonsterID { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public int BaseModifier { get; set; }
    }
}
