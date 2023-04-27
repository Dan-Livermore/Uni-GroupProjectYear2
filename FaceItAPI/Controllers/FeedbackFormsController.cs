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
    public class FeedbackFormsController : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public FeedbackFormsController(Comp2003ZContext context)
        {
            _context = context;
        }

        // GET: api/FeedbackForms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedbackForm>>> GetFeedbackForms()
        {
          if (_context.FeedbackForms == null)
          {
              return NotFound();
          }
            return await _context.FeedbackForms.ToListAsync();
        }

        // GET: api/FeedbackForms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FeedbackForm>> GetFeedbackForm(int id)
        {
          if (_context.FeedbackForms == null)
          {
              return NotFound();
          }
            var feedbackForm = await _context.FeedbackForms.FindAsync(id);

            if (feedbackForm == null)
            {
                return NotFound();
            }

            return feedbackForm;
        }

        // PUT: api/FeedbackForms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeedbackForm(int id, FeedbackForm feedbackForm)
        {
            if (id != feedbackForm.UserId)
            {
                return BadRequest();
            }

            _context.Entry(feedbackForm).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeedbackFormExists(id))
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

        // POST: api/FeedbackForms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FeedbackForm>> PostFeedbackForm(FeedbackForm feedbackForm)
        {
          if (_context.FeedbackForms == null)
          {
              return Problem("Entity set 'Comp2003ZContext.FeedbackForms'  is null.");
          }
            _context.FeedbackForms.Add(feedbackForm);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FeedbackFormExists(feedbackForm.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFeedbackForm", new { id = feedbackForm.UserId }, feedbackForm);
        }

        // DELETE: api/FeedbackForms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedbackForm(int id)
        {
            if (_context.FeedbackForms == null)
            {
                return NotFound();
            }
            var feedbackForm = await _context.FeedbackForms.FindAsync(id);
            if (feedbackForm == null)
            {
                return NotFound();
            }

            _context.FeedbackForms.Remove(feedbackForm);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FeedbackFormExists(int id)
        {
            return (_context.FeedbackForms?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
