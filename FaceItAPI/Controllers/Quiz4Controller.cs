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
    public class Quiz4Controller : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public Quiz4Controller(Comp2003ZContext context)
        {
            _context = context;
        }

        // GET: api/Quiz4
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quiz4>>> GetQuiz4s()
        {
          if (_context.Quiz4s == null)
          {
              return NotFound();
          }
            return await _context.Quiz4s.ToListAsync();
        }

        // GET: api/Quiz4/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz4>> GetQuiz4(int id)
        {
          if (_context.Quiz4s == null)
          {
              return NotFound();
          }
            var quiz4 = await _context.Quiz4s.FindAsync(id);

            if (quiz4 == null)
            {
                return NotFound();
            }

            return quiz4;
        }

        // PUT: api/Quiz4/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuiz4(int id, Quiz4 quiz4)
        {
            if (id != quiz4.UserId)
            {
                return BadRequest();
            }

            _context.Entry(quiz4).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Quiz4Exists(id))
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

        // POST: api/Quiz4
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Quiz4>> PostQuiz4(Quiz4 quiz4)
        {
          if (_context.Quiz4s == null)
          {
              return Problem("Entity set 'Comp2003ZContext.Quiz4s'  is null.");
          }
            _context.Quiz4s.Add(quiz4);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Quiz4Exists(quiz4.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetQuiz4", new { id = quiz4.UserId }, quiz4);
        }

        // DELETE: api/Quiz4/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz4(int id)
        {
            if (_context.Quiz4s == null)
            {
                return NotFound();
            }
            var quiz4 = await _context.Quiz4s.FindAsync(id);
            if (quiz4 == null)
            {
                return NotFound();
            }

            _context.Quiz4s.Remove(quiz4);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Quiz4Exists(int id)
        {
            return (_context.Quiz4s?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
