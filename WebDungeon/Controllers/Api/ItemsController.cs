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
    public class ItemsController : ApiController
    {
        public Item[] Get()
        {
            var dbConnect = new DBConnect();
            var items = dbConnect.GetItems();

            return items;
        }
    }
}
