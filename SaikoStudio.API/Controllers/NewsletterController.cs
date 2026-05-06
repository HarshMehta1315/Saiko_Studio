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
    public class NewsletterController : ControllerBase
    {
        private readonly IRepository<NewsletterSubscriber> _subscriberRepository;
        private readonly AppDbContext _context;

        public NewsletterController(IRepository<NewsletterSubscriber> subscriberRepository, AppDbContext context)
        {
            _subscriberRepository = subscriberRepository;
            _context = context;
        }

        [HttpPost("subscribe")]
        [AllowAnonymous]
        public async Task<ActionResult<ApiResponse<NewsletterSubscriber>>> Subscribe([FromBody] SubscribeRequest request)
        {
            var existing = await _subscriberRepository.FindAsync(s => s.Email == request.Email);
            if (existing.Any())
                return ApiResponse<NewsletterSubscriber>.Error("Email already subscribed", 400);

            var subscriber = new NewsletterSubscriber { Email = request.Email };
            await _subscriberRepository.AddAsync(subscriber);
            await _context.SaveChangesAsync();

            return ApiResponse<NewsletterSubscriber>.Created(subscriber, "Subscribed successfully");
        }

        [HttpGet("subscribers")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<PagedResult<NewsletterSubscriber>>>> GetSubscribers([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var result = await _subscriberRepository.GetPagedAsync(page, pageSize);
            return ApiResponse<PagedResult<NewsletterSubscriber>>.Ok(result);
        }

        [HttpDelete("unsubscribe/{email}")]
        [AllowAnonymous]
        public async Task<ActionResult<ApiResponse<bool>>> Unsubscribe(string email)
        {
            var subscribers = await _subscriberRepository.FindAsync(s => s.Email == email);
            var subscriber = subscribers.FirstOrDefault();

            if (subscriber == null)
                return ApiResponse<bool>.Error("Email not found", 404);

            subscriber.IsActive = false;
            await _subscriberRepository.UpdateAsync(subscriber);
            await _context.SaveChangesAsync();

            return ApiResponse<bool>.Ok(true, "Unsubscribed successfully");
        }
    }

    public class SubscribeRequest
    {
        public string Email { get; set; } = string.Empty;
    }
}
