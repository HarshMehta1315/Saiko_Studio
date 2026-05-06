using SaikoStudio.API.Models;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Interfaces
{
    public interface IAuthService
    {
        Task<ApiResponse<string>> RegisterAsync(User user, string password);
        Task<ApiResponse<string>> LoginAsync(string email, string password);
        Task<ApiResponse<User>> GetUserByIdAsync(Guid id);
        Task<ApiResponse<User>> UpdateUserAsync(Guid id, User user);
        Task<ApiResponse<bool>> ChangePasswordAsync(Guid userId, string currentPassword, string newPassword);
    }
}
