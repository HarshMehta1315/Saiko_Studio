using Microsoft.EntityFrameworkCore;
using SaikoStudio.API.Data;
using SaikoStudio.API.Helper;
using SaikoStudio.API.Interfaces;
using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Order> _orderRepository;
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;

        public OrderService(IRepository<Order> orderRepository, AppDbContext context, IEmailService emailService)
        {
            _orderRepository = orderRepository;
            _context = context;
            _emailService = emailService;
        }

        public async Task<ApiResponse<PagedResult<Order>>> GetOrdersAsync(int pageNumber, int pageSize, Guid? userId = null)
        {
            try
            {
                var query = userId.HasValue
                    ? await _orderRepository.GetPagedAsync(pageNumber, pageSize, o => o.UserId == userId.Value)
                    : await _orderRepository.GetPagedAsync(pageNumber, pageSize);

                return ApiResponse<PagedResult<Order>>.Ok(query);
            }
            catch (Exception ex)
            {
                return ApiResponse<PagedResult<Order>>.Error($"Error fetching orders: {ex.Message}");
            }
        }

        public async Task<ApiResponse<Order>> GetOrderByIdAsync(Guid id)
        {
            try
            {
                var order = await _context.Orders
                    .Include(o => o.Items)
                    .ThenInclude(oi => oi.Product)
                    .Include(o => o.User)
                    .FirstOrDefaultAsync(o => o.Id == id);

                if (order == null)
                    return ApiResponse<Order>.Error("Order not found", 404);

                return ApiResponse<Order>.Ok(order);
            }
            catch (Exception ex)
            {
                return ApiResponse<Order>.Error($"Error fetching order: {ex.Message}");
            }
        }

        public async Task<ApiResponse<Order>> CreateOrderAsync(Order order, List<OrderItem> items)
        {
            try
            {
                order.OrderNumber = $"SS-{DateTime.UtcNow:yyyyMMdd}-{new Random().Next(1000, 9999)}";
                order.CreatedAt = DateTime.UtcNow;

                await _context.Orders.AddAsync(order);
                await _context.OrderItems.AddRangeAsync(items);
                await _context.SaveChangesAsync();

                if (!string.IsNullOrEmpty(order.User?.Email))
                {
                    await _emailService.SendOrderConfirmationAsync(order.User.Email, order.OrderNumber, order.TotalAmount);
                }

                return ApiResponse<Order>.Created(order);
            }
            catch (Exception ex)
            {
                return ApiResponse<Order>.Error($"Error creating order: {ex.Message}");
            }
        }

        public async Task<ApiResponse<Order>> UpdateOrderStatusAsync(Guid id, OrderStatusType status)
        {
            try
            {
                var order = await _context.Orders.FindAsync(id);
                if (order == null)
                    return ApiResponse<Order>.Error("Order not found", 404);

                order.Status = status;

                if (status == OrderStatusType.Shipped)
                    order.ShippedAt = DateTime.UtcNow;
                else if (status == OrderStatusType.Delivered)
                    order.DeliveredAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                return ApiResponse<Order>.Ok(order);
            }
            catch (Exception ex)
            {
                return ApiResponse<Order>.Error($"Error updating order status: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> DeleteOrderAsync(Guid id)
        {
            try
            {
                var order = await _orderRepository.GetByIdAsync(id);
                if (order == null)
                    return ApiResponse<bool>.Error("Order not found", 404);

                await _orderRepository.DeleteAsync(order);
                await _context.SaveChangesAsync();
                return ApiResponse<bool>.Ok(true);
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Error($"Error deleting order: {ex.Message}");
            }
        }
    }
}
