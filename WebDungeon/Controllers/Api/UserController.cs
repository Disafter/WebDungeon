using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MySql.Data;
using WebDungeon.Models;
using AttributeRouting.Web.Mvc;

namespace WebDungeon.Controllers.Api
{
    public class UserController : ApiController
    {
        [HttpGet]
        public User Retrieve(string id)
        {
            var dbConnect = new DBConnect();
            var user = dbConnect.GetUser(id);
            user.itemIDs = dbConnect.GetUserItems(user.UserID);
            return user;
        }

        public void Create(CreateUserRequest request)
        {
            var dbConnect = new DBConnect();
            dbConnect.NewUser(request);
        }

        public void Save(UserPostRequest request)
        {
            var dbConnect = new DBConnect();
            dbConnect.SaveUser(request);
        }
    }
}
