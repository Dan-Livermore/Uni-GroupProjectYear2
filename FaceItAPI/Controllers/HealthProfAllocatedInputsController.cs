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
    public class HealthProfAllocatedInputsController : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public HealthProfAllocatedInputsController(Comp2003ZContext context)
        {
            _context = context;
        }

        //// GET: api/HealthProfAllocatedInputs
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<HealthProfAllocatedInput>>> GetHealthProfAllocatedInput()
        //{
        //  if (_context.HealthProfAllocatedInput == null)
        //  {
        //      return NotFound();
        //  }
        //    return await _context.HealthProfAllocatedInput.ToListAsync();
        //}

        [HttpGet]
        public IActionResult GetHealthProfAllocatedInput(string hpID)
        {
            

            try
            {
                SqlParameter idParam = new SqlParameter("@hpID", hpID);

                var result = _context.HealthProfAllocatedOutput
                    .FromSqlRaw<IdByEmailAndPasswordResult>("EXECUTE FaceIt.get_assigned_users_by_profID @hpID",
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

        private bool HealthProfAllocatedInputExists(int id)
        {
            return (_context.HealthProfAllocatedInput?.Any(e => e.prof_id == id)).GetValueOrDefault();
        }
    }
}
