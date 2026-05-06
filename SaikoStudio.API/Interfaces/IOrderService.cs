using SaikoStudio.API.Helper;
using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Interfaces
{
    public interface IOrderService
    {
        Task<ApiResponse<PagedResult<Order>>> GetOrdersAsync(int pageNumber, int pageSize, Guid? userId = null);
        Task<ApiResponse<Order>> GetOrderByIdAsync(Guid id);
        Task<ApiResponse<Order>> CreateOrderAsync(Order order, List<OrderItem> items);
        Task<ApiResponse<Order>> UpdateOrderStatusAsync(Guid id, OrderStatusType status);
        Task<ApiResponse<bool>> DeleteOrderAsync(Guid id);
    }
}
