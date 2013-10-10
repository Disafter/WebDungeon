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
    public class UserDataController : ApiController
    {
        public UserData Get(string id)
        {
            var dbConnect = new DBConnect();
            var user = dbConnect.GetUser(id);

            return user;
        }
    }
    public class ClassesDataController : ApiController
    {
        public ClassesData Get(string id)
        {
            var dbConnect = new DBConnect();
            var classes = dbConnect.GetClasses(id);

            return classes.ToArray();
        }
    }
}
