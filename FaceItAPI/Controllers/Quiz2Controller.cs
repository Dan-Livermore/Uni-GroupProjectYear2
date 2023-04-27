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
    [EnableCors("AllowAny")]
    public class Quiz2Controller : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public Quiz2Controller(Comp2003ZContext context)
        {
            _context = context;
        }

        // GET: api/Quiz2
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quiz2>>> GetQuiz2s()
        {
          if (_context.Quiz2s == null)
          {
              return NotFound();
          }
            return await _context.Quiz2s.ToListAsync();
        }

        // GET: api/Quiz2/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz2>> GetQuiz2(int id)
        {
          if (_context.Quiz2s == null)
          {
              return NotFound();
          }
            var quiz2 = await _context.Quiz2s.FindAsync(id);

            if (quiz2 == null)
            {
                return NotFound();
            }

            return quiz2;
        }

        // PUT: api/Quiz2/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuiz2(int id, Quiz2 quiz2)
        {
            if (id != quiz2.UserId)
            {
                return BadRequest();
            }

            _context.Entry(quiz2).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Quiz2Exists(id))
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

        // POST: api/Quiz2
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Quiz2>> PostQuiz2(Quiz2 quiz2)
        {
          if (_context.Quiz2s == null)
          {
              return Problem("Entity set 'Comp2003ZContext.Quiz2s'  is null.");
          }
            _context.Quiz2s.Add(quiz2);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Quiz2Exists(quiz2.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetQuiz2", new { id = quiz2.UserId }, quiz2);
        }

        // DELETE: api/Quiz2/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz2(int id)
        {
            if (_context.Quiz2s == null)
            {
                return NotFound();
            }
            var quiz2 = await _context.Quiz2s.FindAsync(id);
            if (quiz2 == null)
            {
                return NotFound();
            }

            _context.Quiz2s.Remove(quiz2);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Quiz2Exists(int id)
        {
            return (_context.Quiz2s?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
