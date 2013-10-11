using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;

namespace WebDungeon.Models
{
    public class DBConnect
    {
        private MySqlConnection connection;
        private string server;
        private string database;
        private string uid;
        private string password;

        //Constructor
        public DBConnect()
        {
            Initialize();
        }

        //Initialize values
        private void Initialize()
        {
            server = "localhost";
            database = "WebDungeon";
            uid = "root";
            password = "";
            var connectionString = "SERVER=" + server + ";" + "DATABASE=" + database + ";" + "UID=" + uid + ";" + "PASSWORD=" + password + ";";

            connection = new MySqlConnection(connectionString);
        }

        //open connection to database
        private bool OpenConnection()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (MySqlException ex)
            {
                //When handling errors, you can your application's response based 
                //on the error number.
                //The two most common error numbers when connecting are as follows:
                //0: Cannot connect to server.
                //1045: Invalid user name and/or password.
                
                return false;
            }
        }

        //Close connection
        private bool CloseConnection()
        {
            try
            {
                connection.Close();
                return true;
            }
            catch (MySqlException ex)
            {
                return false;
            }
        }

        public Item[] GetItems()
        {
            var isOpen = OpenConnection();
            var items = new List<Item>();

            if (isOpen)
            {
                //Create Command
                var command = new MySqlCommand("ItemsGet", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                
                //Create a data reader and Execute the command
                var dataReader = command.ExecuteReader();

                //Read the data and store them in the list
                while (dataReader.Read())
                {
                    var item = new Item();

                    item.ItemID = (int)dataReader["ItemID"];
                    item.Name = dataReader["Name"] as string;
                    item.Dexterity = (int)dataReader["Dexterity"];
                    item.Strength = (int)dataReader["Strength"];
                    item.Intelligence = (int)dataReader["Intelligence"];
                    item.Luck = (int)dataReader["Luck"];
                    item.ItemTypeID = (int)dataReader["ItemTypeID"];

                    items.Add(item);
                }

                //close Data Reader
                dataReader.Close();

                //close Connection
                CloseConnection();
            }

            return items.ToArray();
        }

        public Monster[] GetMonsters()
        {
            var isOpen = OpenConnection();
            var monsters = new List<Monster>();

            if (isOpen)
            {
                //Create Command
                var command = new MySqlCommand("MonstersGet", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                //Create a data reader and Execute the command
                var dataReader = command.ExecuteReader();

                //Read the data and store them in the list
                while (dataReader.Read())
                {
                    var monster = new Monster();

                    monster.MonsterID = (int)dataReader["MonsterID"];
                    monster.Name = dataReader["Name"] as string;
                    monster.ImageURL = dataReader["ImageURL"] as string;
                    monster.BaseModifier = (int)dataReader["BaseModifier"];

                    monsters.Add(monster);
                }

                //close Data Reader
                dataReader.Close();

                //close Connection
                CloseConnection();
            }

            return monsters.ToArray();
        }

        public Race[] GetClasses()
        {
            var isOpen = OpenConnection();
            var classes = new List<Race>();

            if (isOpen)
            {
                //Create Command
                var command = new MySqlCommand("ClassesGet", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                //Create a data reader and Execute the command
                var dataReader = command.ExecuteReader();

                //Read the data and store them in the list
                while (dataReader.Read())
                {
                    var race = new Race();

                    race.ClassID = (int)dataReader["ClassID"];
                    race.Name = dataReader["Name"] as string;
                    race.BaseStrength = (int)dataReader["BaseStrength"];
                    race.BaseDexterity = (int)dataReader["BaseDexterity"];
                    race.BaseIntelligence = (int)dataReader["BaseIntelligence"];
                    race.BaseLuck = (int)dataReader["BaseLuck"];

                    classes.Add(race);
                }

                //close Data Reader
                dataReader.Close();

                //close Connection
                CloseConnection();
            }

            return classes.ToArray();
        }

        public UserItem[] GetUserItems(int userID)
        {
            var isOpen = OpenConnection();
            var userItems = new List<UserItem>();
            int id;

            if (isOpen)
            {
                //Create Command
                var command = new MySqlCommand("UserItemsGet", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("pUserId", userID);
                //Create a data reader and Execute the command
                var dataReader = command.ExecuteReader();

                //Read the data and store them in the list
                while (dataReader.Read())
                {
                    var userItem = new UserItem();

                    userItem.IsEquipped = (bool)dataReader["IsEquipped"];
                    userItem.ItemID = (int)dataReader["ItemID"];
                    

                    userItems.Add(userItem);
                }

                //close Data Reader
                dataReader.Close();

                //close Connection
                CloseConnection();
            }

            return userItems.ToArray();
        }

        public User GetUser(string name)
        {
            var isOpen = OpenConnection();
            var user = new User();
            

            if (isOpen)
            {
                //Create Command
                var command = new MySqlCommand("UserGet", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("pUserName", name);
                //Create a data reader and Execute the command
                var dataReader = command.ExecuteReader();

                //Read the data and store them in the list
                while (dataReader.Read())
                {
                    user.UserID = (int)dataReader["UserID"];
                    user.Name = dataReader["Name"] as string;
                    user.ClassID = (int)dataReader["ClassID"];
                    user.Level = (int)dataReader["Level"];
                    user.Floor = (int)dataReader["Floor"];
                    user.CurrentExp = (int)dataReader["CurrentExp"];
                    user.CurrentHp = (int)dataReader["CurrentHp"];
                    user.CurrentMp = (int)dataReader["CurrentMp"];
                    user.BonusStatPoints = (int)dataReader["BonusStatPoints"];
                    user.BonusStrength = (int)dataReader["BonusStrength"];
                    user.BonusDexterity = (int)dataReader["BonusDexterity"];
                    user.BonusIntelligence = (int)dataReader["BonusIntelligence"];
                    user.BonusLuck = (int)dataReader["BonusLuck"];
                    user.Gold = (int)dataReader["Gold"];
                    user.Elixirs = (int)dataReader["Elixirs"];

                }

                //close Data Reader
                dataReader.Close();

                //close Connection
                CloseConnection();
            }

            return user;
        }

        
      //  internal object GetMonsters()
      //  {
      //      throw new NotImplementedException();
      //  }
    }
}