using SaikoStudio.API.Models;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Interfaces
{
    public interface IWishlistService
    {
        Task<ApiResponse<List<Wishlist>>> GetWishlistAsync(Guid userId);
        Task<ApiResponse<Wishlist>> AddToWishlistAsync(Guid userId, Guid productId);
        Task<ApiResponse<bool>> RemoveFromWishlistAsync(Guid userId, Guid productId);
    }
}
