using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FaceItAPI.Models;

namespace FaceItAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAssignedHealthProfInputsController : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public UserAssignedHealthProfInputsController(Comp2003ZContext context)
        {
            _context = context;
        }

        // GET: api/UserAssignedHealthProfInputs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAssignedHealthProfInput>>> GetUserAssignedHealthProfInput()
        {
          if (_context.UserAssignedHealthProfInput == null)
          {
              return NotFound();
          }
            return await _context.UserAssignedHealthProfInput.ToListAsync();
        }

        // GET: api/UserAssignedHealthProfInputs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserAssignedHealthProfInput>> GetUserAssignedHealthProfInput(int id)
        {
          if (_context.UserAssignedHealthProfInput == null)
          {
              return NotFound();
          }
            var userAssignedHealthProfInput = await _context.UserAssignedHealthProfInput.FindAsync(id);

            if (userAssignedHealthProfInput == null)
            {
                return NotFound();
            }

            return userAssignedHealthProfInput;
        }

        // PUT: api/UserAssignedHealthProfInputs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAssignedHealthProfInput(int id, UserAssignedHealthProfInput userAssignedHealthProfInput)
        {
            if (id != userAssignedHealthProfInput.UserId)
            {
                return BadRequest();
            }

            _context.Entry(userAssignedHealthProfInput).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAssignedHealthProfInputExists(id))
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

        // POST: api/UserAssignedHealthProfInputs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserAssignedHealthProfInput>> PostUserAssignedHealthProfInput(UserAssignedHealthProfInput userAssignedHealthProfInput)
        {
          if (_context.UserAssignedHealthProfInput == null)
          {
              return Problem("Entity set 'Comp2003ZContext.UserAssignedHealthProfInput'  is null.");
          }
            _context.UserAssignedHealthProfInput.Add(userAssignedHealthProfInput);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserAssignedHealthProfInput", new { id = userAssignedHealthProfInput.UserId }, userAssignedHealthProfInput);
        }

        // DELETE: api/UserAssignedHealthProfInputs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAssignedHealthProfInput(int id)
        {
            if (_context.UserAssignedHealthProfInput == null)
            {
                return NotFound();
            }
            var userAssignedHealthProfInput = await _context.UserAssignedHealthProfInput.FindAsync(id);
            if (userAssignedHealthProfInput == null)
            {
                return NotFound();
            }

            _context.UserAssignedHealthProfInput.Remove(userAssignedHealthProfInput);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserAssignedHealthProfInputExists(int id)
        {
            return (_context.UserAssignedHealthProfInput?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
