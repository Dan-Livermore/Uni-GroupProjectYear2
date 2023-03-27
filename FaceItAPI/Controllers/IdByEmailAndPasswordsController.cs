using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FaceItAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace FaceItAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdByEmailAndPasswordsController : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public IdByEmailAndPasswordsController(Comp2003ZContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetIdByEmailAndPassword(string email, string pass)
        {
            try
            {
                SqlParameter emailParam = new SqlParameter("@email", email);
                SqlParameter passParam = new SqlParameter("@pass", pass);

                var result = _context.IdByEmailAndPasswordResult
                    .FromSqlRaw<IdByEmailAndPasswordResult>("EXECUTE FaceIt.Id_By_Email_and_Password @Email, @Pass",
                        emailParam, passParam)
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

        [HttpPost]
        public async Task<ActionResult<IdByEmailAndPasswordResult>> PostIdByEmailAndPassword([FromBody] IdByEmailAndPassword request)
        {
            var email = request.Email;
            var password = request.Password;            

            var idParameter = new SqlParameter("@user_id", SqlDbType.Int) { Direction = ParameterDirection.Output };

            await _context.Database.ExecuteSqlRawAsync(
                "EXEC FaceIt.Id_By_Email_and_Password @Email, @Password",
                new SqlParameter("@Email", email),
                new SqlParameter("@Password", password),
                idParameter
            );

            var id = (int)idParameter.Value;

            if (id == -1)
            {
                return BadRequest("Invalid email or password");
            }

            var result = new IdByEmailAndPasswordResult { UserId = id };

            return result;
        }
        private bool IdByEmailAndPasswordExists(int id)
        {
            return (_context.IdByEmailAndPassword?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
