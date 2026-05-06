namespace SaikoStudio.API.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
        Task SendContactFormNotificationAsync(string name, string email, string message);
        Task SendOrderConfirmationAsync(string to, string orderNumber, decimal total);
    }
}
