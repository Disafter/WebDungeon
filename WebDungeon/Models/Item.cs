using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDungeon.Models
{
    public class Item
    {
        public int ItemID { get; set; }
        public string Name { get; set; }
        public int Strength { get; set; }
        public int Dexterity { get; set; }
        public int Intelligence { get; set; }
        public int Luck { get; set; }
        public int ItemTypeID { get; set; }
    }
}
