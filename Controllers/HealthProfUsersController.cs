using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FaceIt2023.Models;

namespace FaceIt2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthProfUsersController : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public HealthProfUsersController(Comp2003ZContext context)
        {
            _context = context;
        }

        // GET: api/HealthProfUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HealthProfUser>>> GetHealthProfUsers()
        {
          if (_context.HealthProfUsers == null)
          {
              return NotFound();
          }
            return await _context.HealthProfUsers.ToListAsync();
        }

        // GET: api/HealthProfUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HealthProfUser>> GetHealthProfUser(int id)
        {
          if (_context.HealthProfUsers == null)
          {
              return NotFound();
          }
            var healthProfUser = await _context.HealthProfUsers.FindAsync(id);

            if (healthProfUser == null)
            {
                return NotFound();
            }

            return healthProfUser;
        }

        // PUT: api/HealthProfUsers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHealthProfUser(int id, HealthProfUser healthProfUser)
        {
            if (id != healthProfUser.ProfId)
            {
                return BadRequest();
            }

            _context.Entry(healthProfUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HealthProfUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HealthProfUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HealthProfUser>> PostHealthProfUser(HealthProfUser healthProfUser)
        {
          if (_context.HealthProfUsers == null)
          {
              return Problem("Entity set 'Comp2003ZContext.HealthProfUsers'  is null.");
          }
            _context.HealthProfUsers.Add(healthProfUser);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (HealthProfUserExists(healthProfUser.ProfId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetHealthProfUser", new { id = healthProfUser.ProfId }, healthProfUser);
        }

        // DELETE: api/HealthProfUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHealthProfUser(int id)
        {
            if (_context.HealthProfUsers == null)
            {
                return NotFound();
            }
            var healthProfUser = await _context.HealthProfUsers.FindAsync(id);
            if (healthProfUser == null)
            {
                return NotFound();
            }

            _context.HealthProfUsers.Remove(healthProfUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HealthProfUserExists(int id)
        {
            return (_context.HealthProfUsers?.Any(e => e.ProfId == id)).GetValueOrDefault();
        }
    }
}
