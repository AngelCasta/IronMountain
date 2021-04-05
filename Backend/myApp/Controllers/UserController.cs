using myApp.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace myApp.Controllers
{
    public class UserController : ApiController
    {
        #region Properties
        /// <summary>
        /// Model from database
        /// </summary>
        protected Model1 db = new Model1();
        #endregion
        #region Constants
        /// <summary>
        /// Exception message for user
        /// </summary>
        private const string ExceptionMessage = "No fue posible procesar su solicitud, favor de notificar al administrador.";
        #endregion        
        #region Methods
        /// <summary>
        /// GET Method returns user table data
        /// </summary>
        /// <returns></returns>
        public Object GET()
        {
            try
            {
                //Get all Users
                var users = (from u in db.User select u).ToList();                
                return new
                {
                    success = true,
                    items = users
                };
            }
            catch (Exception e)
            {
                return new
                {
                    success = false,
                    message = ExceptionMessage
                };
            }
        }
        /// <summary>
        /// POST Method creates new users in User table 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public Object POST(JObject data)
        {
            try
            {
                var newUser = data.ToObject<User>();
                if (Validate(newUser))
                {
                    //Create Users
                    newUser.Id = 0;
                    newUser.CreationDate = DateTime.UtcNow;
                    db.User.Add(newUser);
                    db.SaveChanges();
                    return new
                    {
                        success = true,
                        message = "Success"
                    };
                }
                return new
                {
                    success = false,
                    message = "already registered."
                };

            }
            catch (Exception)
            {
                return new
                {
                    success = false,
                    message = ExceptionMessage
                };
            }
        }
        /// <summary>
        /// PUT Method updates or deletes existing users from User table
        /// </summary>
        /// <param name="data"></param>
        /// <param name="delete"></param>
        /// <returns></returns>
        public Object PUT(JObject data, bool delete)
        {
            try
            {
                var toUpdateUser = data.ToObject<User>();
                var user = db.User.SingleOrDefault(u => u.Id == toUpdateUser.Id);
                if (user != null)
                {
                    if (delete)
                    {
                        //Delete Users
                        db.User.Attach(user);
                        db.User.Remove(user);
                        db.SaveChanges();
                        return new
                        {
                            success = true,
                            message = "Deleted successfully"
                        };
                    }
                    if (Validate(toUpdateUser))
                    {
                        //Update Users
                        user.Name = toUpdateUser.Name;
                        user.Address = toUpdateUser.Address;
                        user.Dni = toUpdateUser.Dni;
                        user.Phone = toUpdateUser.Phone;
                        db.SaveChanges();
                        return new
                        {
                            success = true,
                            message = "Updated successfully"
                        };
                    }
                    return new
                    {
                        success = false,
                        message = "already registered."
                    };
                }
                return new
                {
                    success = false,
                    message = "User not found."
                };


            }
            catch (Exception)
            {
                return new
                {
                    success = false,
                    message = ExceptionMessage
                };
            }
        }
        /// <summary>
        /// Validate Method verifies that there is no duplication in the records
        /// </summary>
        /// <param name="toValidateUser"></param>
        /// <returns></returns>
        private bool Validate(User toValidateUser)
        {
            var validation = db.User.FirstOrDefault(u => (toValidateUser.Phone.Equals(u.Phone) || u.Dni.Equals(toValidateUser.Dni)) && toValidateUser.Id != u.Id);
            return validation == null;
        }
        #endregion
    }
}