using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FaceIt2023.Models;
using Microsoft.Data.SqlClient;

namespace FaceIt2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdByEmailAndPasswordsController : ControllerBase
    {
        private readonly Comp2003ZContext _context;

        public IdByEmailAndPasswordsController(Comp2003ZContext context)
        {
            _context = context;
        }

   

        [HttpGet]
        public IActionResult GetIdByEmailAndPassword(string email, string pass)
        {
            try
            {
                SqlParameter emailParam = new SqlParameter("@email", email);
                SqlParameter passParam = new SqlParameter("@pass", pass);

                var result = _context.IdByEmailAndPasswordResult
                    .FromSqlRaw<IdByEmailAndPasswordResult>("EXECUTE FaceIt.Id_By_Email_and_Password @Email, @Pass",
                        emailParam, passParam)
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



        //// GET: api/IdByEmailAndPasswords
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<IdByEmailAndPassword>>> GetIdByEmailAndPassword()
        //{
        //  if (_context.IdByEmailAndPassword == null)
        //  {
        //      return NotFound();
        //  }
        //    return await _context.IdByEmailAndPassword.ToListAsync();
        //}

        //// GET: api/IdByEmailAndPasswords/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<IdByEmailAndPassword>> GetIdByEmailAndPassword(int id)
        //{
        //  if (_context.IdByEmailAndPassword == null)
        //  {
        //      return NotFound();
        //  }
        //    var idByEmailAndPassword = await _context.IdByEmailAndPassword.FindAsync(id);

        //    if (idByEmailAndPassword == null)
        //    {
        //        return NotFound();
        //    }

        //    return idByEmailAndPassword;
        //}

        //// PUT: api/IdByEmailAndPasswords/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutIdByEmailAndPassword(int id, IdByEmailAndPassword idByEmailAndPassword)
        //{
        //    if (id != idByEmailAndPassword.UserId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(idByEmailAndPassword).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!IdByEmailAndPasswordExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/IdByEmailAndPasswords
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<IdByEmailAndPassword>> PostIdByEmailAndPassword(IdByEmailAndPassword idByEmailAndPassword)
        //{
        //  if (_context.IdByEmailAndPassword == null)
        //  {
        //      return Problem("Entity set 'Comp2003ZContext.IdByEmailAndPassword'  is null.");
        //  }
        //    _context.IdByEmailAndPassword.Add(idByEmailAndPassword);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetIdByEmailAndPassword", new { id = idByEmailAndPassword.UserId }, idByEmailAndPassword);
        //}

        //// DELETE: api/IdByEmailAndPasswords/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteIdByEmailAndPassword(int id)
        //{
        //    if (_context.IdByEmailAndPassword == null)
        //    {
        //        return NotFound();
        //    }
        //    var idByEmailAndPassword = await _context.IdByEmailAndPassword.FindAsync(id);
        //    if (idByEmailAndPassword == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.IdByEmailAndPassword.Remove(idByEmailAndPassword);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        private bool IdByEmailAndPasswordExists(int id)
        {
            return (_context.IdByEmailAndPassword?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}
