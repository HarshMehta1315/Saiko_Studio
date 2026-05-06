using SaikoStudio.API.Models;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Interfaces
{
    public interface ICartService
    {
        Task<ApiResponse<List<CartItem>>> GetCartAsync(string? sessionId, Guid? userId);
        Task<ApiResponse<CartItem>> AddToCartAsync(string? sessionId, Guid? userId, Guid productId, int quantity);
        Task<ApiResponse<bool>> UpdateCartItemQuantityAsync(Guid cartItemId, int quantity);
        Task<ApiResponse<bool>> RemoveFromCartAsync(Guid cartItemId);
        Task<ApiResponse<bool>> ClearCartAsync(string? sessionId, Guid? userId);
    }
}
