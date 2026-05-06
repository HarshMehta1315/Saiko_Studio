using Microsoft.EntityFrameworkCore;
using SaikoStudio.API.Data;
using SaikoStudio.API.Interfaces;
using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Services
{
    public class ContactService : IContactService
    {
        private readonly IRepository<ContactMessage> _contactRepository;
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;

        public ContactService(IRepository<ContactMessage> contactRepository, AppDbContext context, IEmailService emailService)
        {
            _contactRepository = contactRepository;
            _context = context;
            _emailService = emailService;
        }

        public async Task<ApiResponse<ContactMessage>> SubmitContactMessageAsync(ContactMessage message)
        {
            try
            {
                await _contactRepository.AddAsync(message);
                await _context.SaveChangesAsync();

                await _emailService.SendContactFormNotificationAsync(message.Name, message.Email, message.Message);

                return ApiResponse<ContactMessage>.Created(message, "Message sent successfully");
            }
            catch (Exception ex)
            {
                return ApiResponse<ContactMessage>.Error($"Error submitting message: {ex.Message}");
            }
        }

        public async Task<ApiResponse<PagedResult<ContactMessage>>> GetContactMessagesAsync(int pageNumber, int pageSize)
        {
            try
            {
                var messages = await _contactRepository.GetPagedAsync(pageNumber, pageSize);
                return ApiResponse<PagedResult<ContactMessage>>.Ok(messages);
            }
            catch (Exception ex)
            {
                return ApiResponse<PagedResult<ContactMessage>>.Error($"Error fetching messages: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> MarkAsReadAsync(Guid id)
        {
            try
            {
                var message = await _contactRepository.GetByIdAsync(id);
                if (message == null)
                    return ApiResponse<bool>.Error("Message not found", 404);

                message.IsRead = true;
                await _contactRepository.UpdateAsync(message);
                await _context.SaveChangesAsync();
                return ApiResponse<bool>.Ok(true);
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Error($"Error marking message as read: {ex.Message}");
            }
        }
    }
}
