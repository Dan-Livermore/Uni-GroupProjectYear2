using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FaceItAPI.Models;
using Microsoft.Data.SqlClient;

namespace FaceItAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeletehealthProfbyemailsController : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public DeletehealthProfbyemailsController(Comp2003ZContext context)
        {
            _context = context;
        }

        [HttpPost("delete")]
        public async Task<ActionResult> CreateHealthProfIDandUserEmail(healthProfIDandUserEmail healthProfIDandUserEmail)
        {
            var prof_id = new SqlParameter("@prof_id", healthProfIDandUserEmail.prof_id);
            var user_email = new SqlParameter("@user_email", healthProfIDandUserEmail.UserEmail);

            await _context.Database.ExecuteSqlRawAsync("EXEC [FaceIt].[delete_health_prof_user] @prof_id, @user_email", prof_id, user_email);

            return Ok();
        }


        private bool DeletehealthProfbyemailExists(int id)
        {
            return (_context.DeletehealthProfbyemail?.Any(e => e.prof_id == id)).GetValueOrDefault();
        }
    }
}
