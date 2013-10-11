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
    public class UserController : ApiController
    {
        public User Get(string id)
        {
            var dbConnect = new DBConnect();
            var user = dbConnect.GetUser(id);
            user.itemIDs = dbConnect.GetUserItems(user.UserID);
            return user;
        }
    }
}
