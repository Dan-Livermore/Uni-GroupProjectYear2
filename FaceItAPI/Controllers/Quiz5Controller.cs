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
    public class Quiz5Controller : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public Quiz5Controller(Comp2003ZContext context)
        {
            _context = context;
        }

        // GET: api/Quiz5
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quiz5>>> GetQuiz5s()
        {
          if (_context.Quiz5s == null)
          {
              return NotFound();
          }
            return await _context.Quiz5s.ToListAsync();
        }

        // GET: api/Quiz5/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz5>> GetQuiz5(int id)
        {
          if (_context.Quiz5s == null)
          {
              return NotFound();
          }
            var quiz5 = await _context.Quiz5s.FindAsync(id);

            if (quiz5 == null)
            {
                return NotFound();
            }

            return quiz5;
        }

        // PUT: api/Quiz5/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuiz5(int id, Quiz5 quiz5)
        {
            if (id != quiz5.UserId)
            {
                return BadRequest();
            }

            _context.Entry(quiz5).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Quiz5Exists(id))
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

        // POST: api/Quiz5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Quiz5>> PostQuiz5(Quiz5 quiz5)
        {
          if (_context.Quiz5s == null)
          {
              return Problem("Entity set 'Comp2003ZContext.Quiz5s'  is null.");
          }
            _context.Quiz5s.Add(quiz5);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Quiz5Exists(quiz5.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetQuiz5", new { id = quiz5.UserId }, quiz5);
        }

        // DELETE: api/Quiz5/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz5(int id)
        {
            if (_context.Quiz5s == null)
            {
                return NotFound();
            }
            var quiz5 = await _context.Quiz5s.FindAsync(id);
            if (quiz5 == null)
            {
                return NotFound();
            }

            _context.Quiz5s.Remove(quiz5);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Quiz5Exists(int id)
        {
            return (_context.Quiz5s?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
