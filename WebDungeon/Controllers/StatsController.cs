using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MySql.Data;
using WebDungeon.Models;

namespace WebDungeon.Controllers
{
    public class StatsController : ApiController
    {
        public Stats Get()
        {
            var dbConnect = new DBConnect();
            var stats = dbConnect.Select("SELECT * FROM users");

            return stats;
        }

        // GET api/stats/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/stats
        public void Post([FromBody]string value)
        {
        }

        // PUT api/stats/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/stats/5
        public void Delete(int id)
        {
        }
    }
}
