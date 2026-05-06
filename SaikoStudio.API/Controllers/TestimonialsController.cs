using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaikoStudio.API.Data;
using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestimonialsController : ControllerBase
    {
        private readonly IRepository<Testimonial> _testimonialRepository;
        private readonly AppDbContext _context;

        public TestimonialsController(IRepository<Testimonial> testimonialRepository, AppDbContext context)
        {
            _testimonialRepository = testimonialRepository;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<Testimonial>>>> GetTestimonials([FromQuery] bool approvedOnly = true)
        {
            var testimonials = approvedOnly
                ? await _testimonialRepository.FindAsync(t => t.IsApproved)
                : await _testimonialRepository.GetAllAsync();

            return ApiResponse<List<Testimonial>>.Ok(testimonials.OrderByDescending(t => t.CreatedAt).ToList());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Testimonial>>> GetTestimonial(Guid id)
        {
            var testimonial = await _testimonialRepository.GetByIdAsync(id);
            if (testimonial == null)
                return ApiResponse<Testimonial>.Error("Testimonial not found", 404);

            return ApiResponse<Testimonial>.Ok(testimonial);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<Testimonial>>> CreateTestimonial(Testimonial testimonial)
        {
            await _testimonialRepository.AddAsync(testimonial);
            await _context.SaveChangesAsync();
            return ApiResponse<Testimonial>.Created(testimonial);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<Testimonial>>> UpdateTestimonial(Guid id, Testimonial testimonial)
        {
            var existing = await _testimonialRepository.GetByIdAsync(id);
            if (existing == null)
                return ApiResponse<Testimonial>.Error("Testimonial not found", 404);

            testimonial.Id = id;
            await _testimonialRepository.UpdateAsync(testimonial);
            await _context.SaveChangesAsync();
            return ApiResponse<Testimonial>.Ok(testimonial);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteTestimonial(Guid id)
        {
            var testimonial = await _testimonialRepository.GetByIdAsync(id);
            if (testimonial == null)
                return ApiResponse<bool>.Error("Testimonial not found", 404);

            await _testimonialRepository.DeleteAsync(testimonial);
            await _context.SaveChangesAsync();
            return ApiResponse<bool>.Ok(true);
        }
    }
}
