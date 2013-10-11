using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MySql.Data;
using WebDungeon.Models;

namespace WebDungeon.Controllers.Api
{
    public class RaceController : ApiController
    {
        public Race[] Get()
        {
            var dbConnect = new DBConnect();
            var classes = dbConnect.GetClasses();

            return classes;
        }
    }
}
