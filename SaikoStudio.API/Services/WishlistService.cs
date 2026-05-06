using Microsoft.EntityFrameworkCore;
using SaikoStudio.API.Data;
using SaikoStudio.API.Interfaces;
using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Services
{
    public class WishlistService : IWishlistService
    {
        private readonly IRepository<Wishlist> _wishlistRepository;
        private readonly AppDbContext _context;

        public WishlistService(IRepository<Wishlist> wishlistRepository, AppDbContext context)
        {
            _wishlistRepository = wishlistRepository;
            _context = context;
        }

        public async Task<ApiResponse<List<Wishlist>>> GetWishlistAsync(Guid userId)
        {
            try
            {
                var items = await _context.Wishlists
                    .Include(w => w.Product)
                    .ThenInclude(p => p.Images.OrderBy(i => i.SortOrder))
                    .Where(w => w.UserId == userId)
                    .ToListAsync();

                return ApiResponse<List<Wishlist>>.Ok(items);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<Wishlist>>.Error($"Error fetching wishlist: {ex.Message}");
            }
        }

        public async Task<ApiResponse<Wishlist>> AddToWishlistAsync(Guid userId, Guid productId)
        {
            try
            {
                var existing = await _context.Wishlists
                    .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId);

                if (existing != null)
                    return ApiResponse<Wishlist>.Error("Product already in wishlist", 400);

                var wishlistItem = new Wishlist
                {
                    UserId = userId,
                    ProductId = productId
                };

                await _wishlistRepository.AddAsync(wishlistItem);
                await _context.SaveChangesAsync();
                return ApiResponse<Wishlist>.Created(wishlistItem);
            }
            catch (Exception ex)
            {
                return ApiResponse<Wishlist>.Error($"Error adding to wishlist: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> RemoveFromWishlistAsync(Guid userId, Guid productId)
        {
            try
            {
                var item = await _context.Wishlists
                    .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId);

                if (item == null)
                    return ApiResponse<bool>.Error("Item not found in wishlist", 404);

                await _wishlistRepository.DeleteAsync(item);
                await _context.SaveChangesAsync();
                return ApiResponse<bool>.Ok(true);
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Error($"Error removing from wishlist: {ex.Message}");
            }
        }
    }
}
