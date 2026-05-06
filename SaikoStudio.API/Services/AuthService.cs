using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SaikoStudio.API.Data;
using SaikoStudio.API.Interfaces;
using SaikoStudio.API.Models;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<ApiResponse<string>> RegisterAsync(User user, string password)
        {
            try
            {
                if (await _context.Users.AnyAsync(u => u.Email == user.Email))
                    return ApiResponse<string>.Error("Email already exists", 400);

                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);

                var customerRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Customer");
                if (customerRole == null)
                {
                    customerRole = new Role { Name = "Customer", Description = "Regular customer" };
                    _context.Roles.Add(customerRole);
                    await _context.SaveChangesAsync();
                }
                user.RoleId = customerRole.Id;

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

                return ApiResponse<string>.Created("Registration successful");
            }
            catch (Exception ex)
            {
                return ApiResponse<string>.Error($"Error registering user: {ex.Message}");
            }
        }

        public async Task<ApiResponse<string>> LoginAsync(string email, string password)
        {
            try
            {
                var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == email);
                if (user == null)
                    return ApiResponse<string>.Error("Invalid credentials", 401);

                if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                    return ApiResponse<string>.Error("Invalid credentials", 401);

                var token = GenerateJwtToken(user);
                return ApiResponse<string>.Ok(token);
            }
            catch (Exception ex)
            {
                return ApiResponse<string>.Error($"Error logging in: {ex.Message}");
            }
        }

        public async Task<ApiResponse<User>> GetUserByIdAsync(Guid id)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Addresses)
                    .Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (user == null)
                    return ApiResponse<User>.Error("User not found", 404);

                return ApiResponse<User>.Ok(user);
            }
            catch (Exception ex)
            {
                return ApiResponse<User>.Error($"Error fetching user: {ex.Message}");
            }
        }

        public async Task<ApiResponse<User>> UpdateUserAsync(Guid id, User user)
        {
            try
            {
                var existing = await _context.Users.FindAsync(id);
                if (existing == null)
                    return ApiResponse<User>.Error("User not found", 404);

                existing.Name = user.Name;
                existing.Phone = user.Phone;
                existing.Email = user.Email;

                await _context.SaveChangesAsync();
                return ApiResponse<User>.Ok(existing);
            }
            catch (Exception ex)
            {
                return ApiResponse<User>.Error($"Error updating user: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                    return ApiResponse<bool>.Error("User not found", 404);

                if (!BCrypt.Net.BCrypt.Verify(currentPassword, user.PasswordHash))
                    return ApiResponse<bool>.Error("Current password is incorrect", 400);

                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
                await _context.SaveChangesAsync();
                return ApiResponse<bool>.Ok(true);
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Error($"Error changing password: {ex.Message}");
            }
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "SaikoStudioSecretKey12345678901234567890"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var roleName = "Customer";
            if (user.Role != null)
                roleName = user.Role.Name;

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, roleName)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"] ?? "SaikoStudio",
                audience: _configuration["Jwt:Audience"] ?? "SaikoStudio",
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
