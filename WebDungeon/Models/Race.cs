using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDungeon.Models
{
    public class Race
    {
        public int ClassID { get; set; }
        public string Name { get; set; }
        public int BaseStrength { get; set; }
        public int BaseDexterity { get; set; }
        public int BaseIntelligence { get; set; }
        public int BaseLuck { get; set; }
    }
}
