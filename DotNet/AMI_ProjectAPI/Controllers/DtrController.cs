using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AMI_ProjectAPI.Data.Repository;
using AMI_ProjectAPI.Models;
using AMI_ProjectAPI.Data;
namespace AMI_ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DtrController : ControllerBase
    {
        private readonly IGenericRepository<Dtr> _dtrrepo;
        public DtrController(IGenericRepository<Dtr> dtrrepo)
        {
            _dtrrepo = dtrrepo;
        }
        [HttpGet("AllDtrs")]
        public async Task<IActionResult> GetAllDtrs()
        {
            var values = await _dtrrepo.GetAllAsync();
            return Ok(values);
        }
        [HttpGet("dtr/{id}")]
        public async Task<IActionResult> GetDtrById(int id)
        {
            var val = await _dtrrepo.GetByIdAsync(id);
            if (val == null)
            {
                return NotFound();
            }
            return Ok(val);
        }
        [HttpPost("addDtr")]
        public async Task<IActionResult> CreateDtr([FromBody] DtrDTO dtr)
        {
            var newDtr = new Dtr
            {
                DtrId = dtr.DtrId,
                FeederId = dtr.FeederId,
                Dtrname = dtr.Dtrname
            };
            await _dtrrepo.AddAsync(newDtr);
            return CreatedAtAction(nameof(GetDtrById), new { id = dtr.DtrId }, dtr);
        }
        [HttpPut("UpdateDtr/{id}")]
        public async Task<IActionResult> UpdateDtr(int id, [FromBody] DtrDTO dtr)
        {
            if (id != dtr.DtrId)
            {
                return BadRequest();
            }
            var updatedDtr = new Dtr
            {
                DtrId = id,
                FeederId = dtr.FeederId,
                Dtrname = dtr.Dtrname
            };
            await _dtrrepo.UpdateAsync(updatedDtr);
            return NoContent();
        }
        [HttpDelete("DeleteDtr/{id}")]
        public async Task<IActionResult> DeleteDtr(int id)
        {
            var existingDtr = await _dtrrepo.GetByIdAsync(id);
            if (existingDtr == null)
            {
                return NotFound();
            }
            await _dtrrepo.DeleteAsync(id);
            return NoContent();
        }
    }
}
