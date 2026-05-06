using Microsoft.EntityFrameworkCore;
using SaikoStudio.API.Data;
using SaikoStudio.API.Interfaces;
using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Services
{
    public class CartService : ICartService
    {
        private readonly IRepository<CartItem> _cartRepository;
        private readonly AppDbContext _context;

        public CartService(IRepository<CartItem> cartRepository, AppDbContext context)
        {
            _cartRepository = cartRepository;
            _context = context;
        }

        public async Task<ApiResponse<List<CartItem>>> GetCartAsync(string? sessionId, Guid? userId)
        {
            try
            {
                var items = await _context.CartItems
                    .Include(ci => ci.Product)
                    .ThenInclude(p => p.Images.OrderBy(i => i.SortOrder))
                    .Where(ci => (userId.HasValue && ci.UserId == userId.Value) || (!userId.HasValue && ci.SessionId == sessionId))
                    .ToListAsync();

                return ApiResponse<List<CartItem>>.Ok(items);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<CartItem>>.Error($"Error fetching cart: {ex.Message}");
            }
        }

        public async Task<ApiResponse<CartItem>> AddToCartAsync(string? sessionId, Guid? userId, Guid productId, int quantity)
        {
            try
            {
                var existingItem = await _context.CartItems
                    .FirstOrDefaultAsync(ci =>
                        ci.ProductId == productId &&
                        ((userId.HasValue && ci.UserId == userId.Value) || (!userId.HasValue && ci.SessionId == sessionId)));

                if (existingItem != null)
                {
                    existingItem.Quantity += quantity;
                    await _context.SaveChangesAsync();
                    return ApiResponse<CartItem>.Ok(existingItem);
                }

                var cartItem = new CartItem
                {
                    ProductId = productId,
                    Quantity = quantity,
                    SessionId = sessionId ?? string.Empty,
                    UserId = userId
                };

                await _cartRepository.AddAsync(cartItem);
                await _context.SaveChangesAsync();

                return ApiResponse<CartItem>.Created(cartItem);
            }
            catch (Exception ex)
            {
                return ApiResponse<CartItem>.Error($"Error adding to cart: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> UpdateCartItemQuantityAsync(Guid cartItemId, int quantity)
        {
            try
            {
                var item = await _cartRepository.GetByIdAsync(cartItemId);
                if (item == null)
                    return ApiResponse<bool>.Error("Cart item not found", 404);

                if (quantity <= 0)
                {
                    await _cartRepository.DeleteAsync(item);
                }
                else
                {
                    item.Quantity = quantity;
                    await _cartRepository.UpdateAsync(item);
                }

                await _context.SaveChangesAsync();
                return ApiResponse<bool>.Ok(true);
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Error($"Error updating cart item: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> RemoveFromCartAsync(Guid cartItemId)
        {
            try
            {
                var item = await _cartRepository.GetByIdAsync(cartItemId);
                if (item == null)
                    return ApiResponse<bool>.Error("Cart item not found", 404);

                await _cartRepository.DeleteAsync(item);
                await _context.SaveChangesAsync();
                return ApiResponse<bool>.Ok(true);
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Error($"Error removing from cart: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> ClearCartAsync(string? sessionId, Guid? userId)
        {
            try
            {
                var items = await _context.CartItems
                    .Where(ci => (userId.HasValue && ci.UserId == userId.Value) || (!userId.HasValue && ci.SessionId == sessionId))
                    .ToListAsync();

                _context.CartItems.RemoveRange(items);
                await _context.SaveChangesAsync();
                return ApiResponse<bool>.Ok(true);
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Error($"Error clearing cart: {ex.Message}");
            }
        }
    }
}
