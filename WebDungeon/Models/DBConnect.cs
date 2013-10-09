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
        public Stats Select(string query)
        {
            var isOpen = OpenConnection();
            var stats = new Stats();

            if (isOpen)
            {
                //Create Command
                var command = new MySqlCommand(query, connection);
                //Create a data reader and Execute the command
                var dataReader = command.ExecuteReader();

                //Read the data and store them in the list
                while (dataReader.Read())
                {
                    stats.Class = dataReader["Class"] as string;
                    stats.Dexterity = (int)dataReader["Dexterity"];
                    stats.UserName = dataReader["Username"] as string;
                }

                //close Data Reader
                dataReader.Close();

                //close Connection
                CloseConnection();
            }

            return stats;
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