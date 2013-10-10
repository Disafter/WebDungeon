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

        //Insert statement
        public void Insert()
        {
        }

        //Update statement
        public void Update()
        {
        }

        //Delete statement
        public void Delete()
        {
        }

        //Select statement
        public UserData GetUser(string name)
        {
            var isOpen = OpenConnection();
            var user = new UserData();
            

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
        public ClassesData GetUser(string name) //change return type to an array of class
        {
            var isOpen = OpenConnection();
            var class1 = new ClassesData();
            var class2 = new ClassesData();


            if (isOpen)
            {
                //Create Command
                var command = new MySqlCommand("ClassesGet", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                //command.Parameters.AddWithValue("pUserName", name);
                //Create a data reader and Execute the command
                var dataReader = command.ExecuteReader();

                //Read the data and store them in the list
                //make a list outside of the while loop
                while (dataReader.Read())
                {
                    //list.add(class)
                   class.classID = (int)dataReader["ClassID"];
                   class.Name = dataReader["Name"] as string;
                    

                }

                //close Data Reader
                dataReader.Close();

                //close Connection
                CloseConnection();
            }

            return class1;
        }

        //Count statement
        public int Count()
        {
            return 0;
        }

        //Backup
        public void Backup()
        {
        }

        //Restore
        public void Restore()
        {
        }
    }
}