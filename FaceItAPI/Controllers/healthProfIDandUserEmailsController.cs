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
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAny")]
    public class healthProfIDandUserEmailsController : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public healthProfIDandUserEmailsController(Comp2003ZContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateHealthProfIDandUserEmail(healthProfIDandUserEmail healthProfIDandUserEmail)
        {
            var prof_id = new SqlParameter("@prof_id", healthProfIDandUserEmail.prof_id);
            var user_email = new SqlParameter("@user_email", healthProfIDandUserEmail.UserEmail);

            await _context.Database.ExecuteSqlRawAsync("EXEC [FaceIt].[add_health_prof_user] @prof_id, @user_email", prof_id, user_email);

            return Ok();
        }




        private bool healthProfIDandUserEmailExists(int id)
        {
            return (_context.healthProfIDandUserEmail?.Any(e => e.prof_id == id)).GetValueOrDefault();
        }
    }
}
