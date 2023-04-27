using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FaceItAPI.Models;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Cors;

namespace FaceItAPI.Controllers
{
    /// <summary>
    /// This is a Stored procedure call to give a user id and find out (return) which health prof is attatched to the account.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAny")]
    public class UserAssignedHealthProfInputsController : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public UserAssignedHealthProfInputsController(Comp2003ZContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetHealthProf(string ID)
        {

            try
            {
                SqlParameter idParam = new SqlParameter("@userID", ID);

                var result = _context.UserAssignedHealthProfOutput
                    .FromSqlRaw<UserAssignedHealthProfOutput>("EXECUTE FaceIt.get_assigned_prof_by_userID @userID",
                        idParam)
                    .ToList();

                if (result == null || result.Count == 0)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // log the exception or return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        private bool UserAssignedHealthProfInputExists(int id)
        {
            return (_context.UserAssignedHealthProfInput?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
