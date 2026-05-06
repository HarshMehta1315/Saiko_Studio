using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaikoStudio.API.Interfaces;
using SaikoStudio.API.Models;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistService _wishlistService;

        public WishlistController(IWishlistService wishlistService)
        {
            _wishlistService = wishlistService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<ApiResponse<List<Wishlist>>>> GetWishlist()
        {
            var userIdClaim = User.FindFirst("nameid")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(ApiResponse<List<Wishlist>>.Error("Invalid token", 401));

            var result = await _wishlistService.GetWishlistAsync(userId);
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ApiResponse<Wishlist>>> AddToWishlist([FromBody] AddToWishlistRequest request)
        {
            var userIdClaim = User.FindFirst("nameid")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(ApiResponse<Wishlist>.Error("Invalid token", 401));

            var result = await _wishlistService.AddToWishlistAsync(userId, request.ProductId);
            return result.StatusCode == 201 ? Created(string.Empty, result) : BadRequest(result);
        }

        [HttpDelete("{productId}")]
        [Authorize]
        public async Task<ActionResult<ApiResponse<bool>>> RemoveFromWishlist(Guid productId)
        {
            var userIdClaim = User.FindFirst("nameid")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(ApiResponse<bool>.Error("Invalid token", 401));

            var result = await _wishlistService.RemoveFromWishlistAsync(userId, productId);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }
    }

    public class AddToWishlistRequest
    {
        public Guid ProductId { get; set; }
    }
}
