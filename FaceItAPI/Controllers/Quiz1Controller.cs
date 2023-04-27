using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FaceItAPI.Models;
using Microsoft.AspNetCore.Cors;

namespace FaceItAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Quiz1Controller : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public Quiz1Controller(Comp2003ZContext context)
        {
            _context = context;
        }

        // GET: api/Quiz1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quiz1>>> GetQuiz1s()
        {
          if (_context.Quiz1s == null)
          {
              return NotFound();
          }
            return await _context.Quiz1s.ToListAsync();
        }

        // GET: api/Quiz1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz1>> GetQuiz1(int id)
        {
          if (_context.Quiz1s == null)
          {
              return NotFound();
          }
            var quiz1 = await _context.Quiz1s.FindAsync(id);

            if (quiz1 == null)
            {
                return NotFound();
            }

            return quiz1;
        }

        // PUT: api/Quiz1/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuiz1(int id, Quiz1 quiz1)
        {
            if (id != quiz1.UserId)
            {
                return BadRequest();
            }

            _context.Entry(quiz1).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Quiz1Exists(id))
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

        // POST: api/Quiz1
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Quiz1>> PostQuiz1(Quiz1 quiz1)
        {
          if (_context.Quiz1s == null)
          {
              return Problem("Entity set 'Comp2003ZContext.Quiz1s'  is null.");
          }
            _context.Quiz1s.Add(quiz1);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Quiz1Exists(quiz1.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetQuiz1", new { id = quiz1.UserId }, quiz1);
        }

        // DELETE: api/Quiz1/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz1(int id)
        {
            if (_context.Quiz1s == null)
            {
                return NotFound();
            }
            var quiz1 = await _context.Quiz1s.FindAsync(id);
            if (quiz1 == null)
            {
                return NotFound();
            }

            _context.Quiz1s.Remove(quiz1);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Quiz1Exists(int id)
        {
            return (_context.Quiz1s?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
