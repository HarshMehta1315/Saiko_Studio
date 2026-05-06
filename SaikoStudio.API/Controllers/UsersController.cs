using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaikoStudio.API.Data;
using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IRepository<User> _userRepository;
        private readonly AppDbContext _context;

        public UsersController(IRepository<User> userRepository, AppDbContext context)
        {
            _userRepository = userRepository;
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<PagedResult<User>>>> GetUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var result = await _userRepository.GetPagedAsync(page, pageSize);
            return ApiResponse<PagedResult<User>>.Ok(result);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<User>>> GetUser(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return ApiResponse<User>.Error("User not found", 404);

            return ApiResponse<User>.Ok(user);
        }

        [HttpPut("{id}/role")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<User>>> UpdateUserRole(Guid id, [FromBody] UpdateRoleRequest request)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return ApiResponse<User>.Error("User not found", 404);

            var role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == request.Role);
            if (role == null)
                return ApiResponse<User>.Error("Role not found", 404);

            user.RoleId = role.Id;
            await _userRepository.UpdateAsync(user);
            await _context.SaveChangesAsync();

            return ApiResponse<User>.Ok(user);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteUser(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return ApiResponse<bool>.Error("User not found", 404);

            await _userRepository.DeleteAsync(user);
            await _context.SaveChangesAsync();

            return ApiResponse<bool>.Ok(true);
        }
    }

    public class UpdateRoleRequest
    {
        public string Role { get; set; } = string.Empty;
    }
}
