using Microsoft.AspNetCore.Mvc;
using SaikoStudio.API.Interfaces;
using SaikoStudio.API.Models;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<CartItem>>>> GetCart([FromQuery] string? sessionId, [FromQuery] Guid? userId)
        {
            var result = await _cartService.GetCartAsync(sessionId, userId);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<CartItem>>> AddToCart([FromBody] AddToCartRequest request)
        {
            var result = await _cartService.AddToCartAsync(request.SessionId, request.UserId, request.ProductId, request.Quantity);
            return result.StatusCode == 201 ? Created(string.Empty, result) : BadRequest(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> UpdateCartItem(Guid id, [FromBody] UpdateCartItemRequest request)
        {
            var result = await _cartService.UpdateCartItemQuantityAsync(id, request.Quantity);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> RemoveFromCart(Guid id)
        {
            var result = await _cartService.RemoveFromCartAsync(id);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }

        [HttpDelete("clear")]
        public async Task<ActionResult<ApiResponse<bool>>> ClearCart([FromQuery] string? sessionId, [FromQuery] Guid? userId)
        {
            var result = await _cartService.ClearCartAsync(sessionId, userId);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }
    }

    public class AddToCartRequest
    {
        public string? SessionId { get; set; }
        public Guid? UserId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; } = 1;
    }

    public class UpdateCartItemRequest
    {
        public int Quantity { get; set; }
    }
}
