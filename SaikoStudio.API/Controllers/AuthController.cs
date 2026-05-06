using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaikoStudio.API.Interfaces;
using SaikoStudio.API.Models;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<ApiResponse<string>>> Register([FromBody] RegisterRequest request)
        {
            var user = new User { Name = request.Name, Email = request.Email, Phone = request.Phone };
            var result = await _authService.RegisterAsync(user, request.Password);
            return result.StatusCode == 201 ? Created(string.Empty, result) : BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<string>>> Login([FromBody] LoginRequest request)
        {
            var result = await _authService.LoginAsync(request.Email, request.Password);
            return result.StatusCode == 200 ? Ok(result) : Unauthorized(result);
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<ApiResponse<User>>> GetCurrentUser()
        {
            var userIdClaim = User.FindFirst("nameid")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(ApiResponse<User>.Error("Invalid token", 401));

            var result = await _authService.GetUserByIdAsync(userId);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }

        [HttpPut("me")]
        [Authorize]
        public async Task<ActionResult<ApiResponse<User>>> UpdateUser([FromBody] User user)
        {
            var userIdClaim = User.FindFirst("nameid")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(ApiResponse<User>.Error("Invalid token", 401));

            var result = await _authService.UpdateUserAsync(userId, user);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }

        [HttpPost("change-password")]
        [Authorize]
        public async Task<ActionResult<ApiResponse<bool>>> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var userIdClaim = User.FindFirst("nameid")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(ApiResponse<bool>.Error("Invalid token", 401));

            var result = await _authService.ChangePasswordAsync(userId, request.CurrentPassword, request.NewPassword);
            return result.StatusCode == 200 ? Ok(result) : BadRequest(result);
        }
    }

    public class RegisterRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Phone { get; set; }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class ChangePasswordRequest
    {
        public string CurrentPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
