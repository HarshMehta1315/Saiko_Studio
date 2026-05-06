using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaikoStudio.API.Data;
using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressesController : ControllerBase
    {
        private readonly IRepository<Address> _addressRepository;
        private readonly AppDbContext _context;

        public AddressesController(IRepository<Address> addressRepository, AppDbContext context)
        {
            _addressRepository = addressRepository;
            _context = context;
        }

        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<ActionResult<ApiResponse<List<Address>>>> GetUserAddresses(Guid userId)
        {
            var addresses = await _addressRepository.FindAsync(a => a.UserId == userId);
            return ApiResponse<List<Address>>.Ok(addresses.ToList());
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ApiResponse<Address>>> CreateAddress(Address address)
        {
            await _addressRepository.AddAsync(address);
            await _context.SaveChangesAsync();
            return ApiResponse<Address>.Created(address);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<ApiResponse<Address>>> UpdateAddress(Guid id, Address address)
        {
            var existing = await _addressRepository.GetByIdAsync(id);
            if (existing == null)
                return ApiResponse<Address>.Error("Address not found", 404);

            address.Id = id;
            await _addressRepository.UpdateAsync(address);
            await _context.SaveChangesAsync();
            return ApiResponse<Address>.Ok(address);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteAddress(Guid id)
        {
            var address = await _addressRepository.GetByIdAsync(id);
            if (address == null)
                return ApiResponse<bool>.Error("Address not found", 404);

            await _addressRepository.DeleteAsync(address);
            await _context.SaveChangesAsync();
            return ApiResponse<bool>.Ok(true);
        }
    }
}
