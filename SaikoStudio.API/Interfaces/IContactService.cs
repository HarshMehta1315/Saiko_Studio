using SaikoStudio.API.Models;
using SaikoStudio.API.Repositories;
using SaikoStudio.API.ViewModels;

namespace SaikoStudio.API.Interfaces
{
    public interface IContactService
    {
        Task<ApiResponse<ContactMessage>> SubmitContactMessageAsync(ContactMessage message);
        Task<ApiResponse<PagedResult<ContactMessage>>> GetContactMessagesAsync(int pageNumber, int pageSize);
        Task<ApiResponse<bool>> MarkAsReadAsync(Guid id);
    }
}
