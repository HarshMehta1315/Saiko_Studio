using Microsoft.EntityFrameworkCore;
using SaikoStudio.API.Data;
using SaikoStudio.API.Interfaces;
using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Services
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Category> _categoryRepository;
        private readonly AppDbContext _context;

        public ProductService(IRepository<Product> productRepository, IRepository<Category> categoryRepository, AppDbContext context)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _context = context;
        }

        public async Task<ApiResponse<PagedResult<Product>>> GetProductsAsync(int pageNumber, int pageSize, Guid? categoryId = null)
        {
            try
            {
                var query = categoryId.HasValue
                    ? await _productRepository.GetPagedAsync(pageNumber, pageSize, p => p.CategoryId == categoryId.Value)
                    : await _productRepository.GetPagedAsync(pageNumber, pageSize);

                return ApiResponse<PagedResult<Product>>.Ok(query);
            }
            catch (Exception ex)
            {
                return ApiResponse<PagedResult<Product>>.Error($"Error fetching products: {ex.Message}");
            }
        }

        public async Task<ApiResponse<Product>> GetProductByIdAsync(Guid id)
        {
            try
            {
                var product = await _context.Products
                    .Include(p => p.Images)
                    .Include(p => p.Variants)
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (product == null)
                    return ApiResponse<Product>.Error("Product not found", 404);

                return ApiResponse<Product>.Ok(product);
            }
            catch (Exception ex)
            {
                return ApiResponse<Product>.Error($"Error fetching product: {ex.Message}");
            }
        }

        public async Task<ApiResponse<Product>> GetProductBySlugAsync(string slug)
        {
            try
            {
                var product = await _context.Products
                    .Include(p => p.Images.OrderBy(i => i.SortOrder))
                    .Include(p => p.Variants)
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Slug == slug);

                if (product == null)
                    return ApiResponse<Product>.Error("Product not found", 404);

                return ApiResponse<Product>.Ok(product);
            }
            catch (Exception ex)
            {
                return ApiResponse<Product>.Error($"Error fetching product: {ex.Message}");
            }
        }

        public async Task<ApiResponse<Product>> CreateProductAsync(Product product)
        {
            try
            {
                await _productRepository.AddAsync(product);
                await _context.SaveChangesAsync();
                return ApiResponse<Product>.Created(product);
            }
            catch (Exception ex)
            {
                return ApiResponse<Product>.Error($"Error creating product: {ex.Message}");
            }
        }

        public async Task<ApiResponse<Product>> UpdateProductAsync(Guid id, Product product)
        {
            try
            {
                var existing = await _productRepository.GetByIdAsync(id);
                if (existing == null)
                    return ApiResponse<Product>.Error("Product not found", 404);

                existing.Title = product.Title;
                existing.Slug = product.Slug;
                existing.Description = product.Description;
                existing.Price = product.Price;
                existing.CompareAtPrice = product.CompareAtPrice;
                existing.Stock = product.Stock;
                existing.Status = product.Status;
                existing.CategoryId = product.CategoryId;
                existing.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                return ApiResponse<Product>.Ok(existing);
            }
            catch (Exception ex)
            {
                return ApiResponse<Product>.Error($"Error updating product: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> DeleteProductAsync(Guid id)
        {
            try
            {
                var product = await _productRepository.GetByIdAsync(id);
                if (product == null)
                    return ApiResponse<bool>.Error("Product not found", 404);

                await _productRepository.DeleteAsync(product);
                await _context.SaveChangesAsync();
                return ApiResponse<bool>.Ok(true);
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Error($"Error deleting product: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<Category>>> GetCategoriesAsync()
        {
            try
            {
                var categories = await _categoryRepository.GetAllAsync();
                return ApiResponse<List<Category>>.Ok(categories.ToList());
            }
            catch (Exception ex)
            {
                return ApiResponse<List<Category>>.Error($"Error fetching categories: {ex.Message}");
            }
        }

        public async Task<ApiResponse<Category>> GetCategoryBySlugAsync(string slug)
        {
            try
            {
                var category = await _context.Categories
                    .Include(c => c.Products)
                    .FirstOrDefaultAsync(c => c.Slug == slug);

                if (category == null)
                    return ApiResponse<Category>.Error("Category not found", 404);

                return ApiResponse<Category>.Ok(category);
            }
            catch (Exception ex)
            {
                return ApiResponse<Category>.Error($"Error fetching category: {ex.Message}");
            }
        }
    }
}
