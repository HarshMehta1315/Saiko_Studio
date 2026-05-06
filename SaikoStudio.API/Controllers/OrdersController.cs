using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaikoStudio.API.Helper;
using SaikoStudio.API.Interfaces;
using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<ApiResponse<PagedResult<Order>>>> GetOrders([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var userIdClaim = User.FindFirst("nameid")?.Value;
            var isAdmin = User.IsInRole("Admin");

            Guid? userId = isAdmin ? null : (userIdClaim != null ? Guid.Parse(userIdClaim) : Guid.Empty);
            var result = await _orderService.GetOrdersAsync(page, pageSize, userId);
            return Ok(result);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ApiResponse<Order>>> GetOrder(Guid id)
        {
            var result = await _orderService.GetOrderByIdAsync(id);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<Order>>> CreateOrder([FromBody] CreateOrderRequest request)
        {
            var order = new Order
            {
                UserId = request.UserId,
                TotalAmount = request.TotalAmount,
                TaxAmount = request.TaxAmount,
                ShippingAmount = request.ShippingAmount,
                PaymentMethod = request.PaymentMethod,
                ShippingAddress = request.ShippingAddress,
                Notes = request.Notes
            };

            var items = request.Items.Select(i => new OrderItem
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList();

            var result = await _orderService.CreateOrderAsync(order, items);
            return result.StatusCode == 201 ? CreatedAtAction(nameof(GetOrder), new { id = order.Id }, result) : BadRequest(result);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<Order>>> UpdateOrderStatus(Guid id, [FromBody] UpdateOrderStatusRequest request)
        {
            var result = await _orderService.UpdateOrderStatusAsync(id, request.Status);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteOrder(Guid id)
        {
            var result = await _orderService.DeleteOrderAsync(id);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }
    }

    public class CreateOrderRequest
    {
        public Guid UserId { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal ShippingAmount { get; set; }
        public PaymentMethodType PaymentMethod { get; set; }
        public string? ShippingAddress { get; set; }
        public string? Notes { get; set; }
        public List<OrderItemRequest> Items { get; set; } = new();
    }

    public class OrderItemRequest
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }

    public class UpdateOrderStatusRequest
    {
        public OrderStatusType Status { get; set; }
    }
}
