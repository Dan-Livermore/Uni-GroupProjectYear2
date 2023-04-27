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
    public class Quiz3Controller : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public Quiz3Controller(Comp2003ZContext context)
        {
            _context = context;
        }

        // GET: api/Quiz3
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quiz3>>> GetQuiz3s()
        {
          if (_context.Quiz3s == null)
          {
              return NotFound();
          }
            return await _context.Quiz3s.ToListAsync();
        }

        // GET: api/Quiz3/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz3>> GetQuiz3(int id)
        {
          if (_context.Quiz3s == null)
          {
              return NotFound();
          }
            var quiz3 = await _context.Quiz3s.FindAsync(id);

            if (quiz3 == null)
            {
                return NotFound();
            }

            return quiz3;
        }

        // PUT: api/Quiz3/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuiz3(int id, Quiz3 quiz3)
        {
            if (id != quiz3.UserId)
            {
                return BadRequest();
            }

            _context.Entry(quiz3).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Quiz3Exists(id))
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

        // POST: api/Quiz3
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Quiz3>> PostQuiz3(Quiz3 quiz3)
        {
          if (_context.Quiz3s == null)
          {
              return Problem("Entity set 'Comp2003ZContext.Quiz3s'  is null.");
          }
            _context.Quiz3s.Add(quiz3);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Quiz3Exists(quiz3.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetQuiz3", new { id = quiz3.UserId }, quiz3);
        }

        // DELETE: api/Quiz3/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz3(int id)
        {
            if (_context.Quiz3s == null)
            {
                return NotFound();
            }
            var quiz3 = await _context.Quiz3s.FindAsync(id);
            if (quiz3 == null)
            {
                return NotFound();
            }

            _context.Quiz3s.Remove(quiz3);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Quiz3Exists(int id)
        {
            return (_context.Quiz3s?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
