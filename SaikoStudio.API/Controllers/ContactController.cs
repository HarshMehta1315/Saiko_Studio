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
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<ApiResponse<ContactMessage>>> SubmitMessage([FromBody] ContactMessage message)
        {
            var result = await _contactService.SubmitContactMessageAsync(message);
            return result.StatusCode == 201 ? Created(string.Empty, result) : BadRequest(result);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<PagedResult<ContactMessage>>>> GetMessages([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var result = await _contactService.GetContactMessagesAsync(page, pageSize);
            return Ok(result);
        }

        [HttpPut("{id}/read")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ApiResponse<bool>>> MarkAsRead(Guid id)
        {
            var result = await _contactService.MarkAsReadAsync(id);
            return result.StatusCode == 200 ? Ok(result) : StatusCode(result.StatusCode, result);
        }
    }
}
