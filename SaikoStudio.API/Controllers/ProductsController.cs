using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaikoStudio.API.Interfaces;
using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<PagedResult<Product>>>> GetProducts([FromQuery] int page = 1, [FromQuery] int pageSize = 12, [FromQuery] Guid? categoryId = null)
        {
            var result = await _productService.GetProductsAsync(page, pageSize, categoryId);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Product>>> GetProduct(Guid id)
        {
            var result = await _productService.GetProductByIdAsync(id);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }

        [HttpGet("slug/{slug}")]
        public async Task<ActionResult<ApiResponse<Product>>> GetProductBySlug(string slug)
        {
            var result = await _productService.GetProductBySlugAsync(slug);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<ApiResponse<List<Category>>>> GetCategories()
        {
            var result = await _productService.GetCategoriesAsync();
            return Ok(result);
        }

        [HttpGet("categories/{slug}")]
        public async Task<ActionResult<ApiResponse<Category>>> GetCategoryBySlug(string slug)
        {
            var result = await _productService.GetCategoryBySlugAsync(slug);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<Product>>> CreateProduct(Product product)
        {
            var result = await _productService.CreateProductAsync(product);
            return result.StatusCode == 201 ? CreatedAtAction(nameof(GetProduct), new { id = product.Id }, result) : BadRequest(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<Product>>> UpdateProduct(Guid id, Product product)
        {
            var result = await _productService.UpdateProductAsync(id, product);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteProduct(Guid id)
        {
            var result = await _productService.DeleteProductAsync(id);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }
    }
}
