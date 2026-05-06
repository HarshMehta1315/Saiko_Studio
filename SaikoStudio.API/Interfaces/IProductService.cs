using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Interfaces
{
    public interface IProductService
    {
        Task<ApiResponse<PagedResult<Product>>> GetProductsAsync(int pageNumber, int pageSize, Guid? categoryId = null);
        Task<ApiResponse<Product>> GetProductByIdAsync(Guid id);
        Task<ApiResponse<Product>> GetProductBySlugAsync(string slug);
        Task<ApiResponse<Product>> CreateProductAsync(Product product);
        Task<ApiResponse<Product>> UpdateProductAsync(Guid id, Product product);
        Task<ApiResponse<bool>> DeleteProductAsync(Guid id);
        Task<ApiResponse<List<Category>>> GetCategoriesAsync();
        Task<ApiResponse<Category>> GetCategoryBySlugAsync(string slug);
    }
}
