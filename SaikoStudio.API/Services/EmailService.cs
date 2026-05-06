using MailKit.Net.Smtp;
using MimeKit;
using SaikoStudio.API.Interfaces;

namespace SaikoStudio.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                var smtpHost = _configuration["Email:SmtpHost"];
                var smtpPort = int.Parse(_configuration["Email:SmtpPort"] ?? "587");
                var smtpUser = _configuration["Email:SmtpUser"];
                var smtpPass = _configuration["Email:SmtpPass"];
                var fromEmail = _configuration["Email:FromEmail"] ?? "noreply@thesaikostudio.com";

                if (string.IsNullOrEmpty(smtpHost))
                {
                    _logger.LogWarning("Email configuration not set. Skipping email send.");
                    return;
                }

                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(fromEmail));
                email.To.Add(MailboxAddress.Parse(to));
                email.Subject = subject;

                var builder = new BodyBuilder { HtmlBody = body };
                email.Body = builder.ToMessageBody();

                using var smtp = new SmtpClient();
                await smtp.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(smtpUser, smtpPass);
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending email to {To}", to);
            }
        }

        public async Task SendContactFormNotificationAsync(string name, string email, string message)
        {
            var subject = $"New Contact Form Submission from {name}";
            var body = $@"
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Message:</strong></p>
                <p>{message}</p>
            ";
            await SendEmailAsync(_configuration["Email:AdminEmail"] ?? "thesaikostudio@gmail.com", subject, body);
        }

        public async Task SendOrderConfirmationAsync(string to, string orderNumber, decimal total)
        {
            var subject = $"Order Confirmation - {orderNumber}";
            var body = $@"
                <h2>Thank you for your order!</h2>
                <p><strong>Order Number:</strong> {orderNumber}</p>
                <p><strong>Total:</strong> ₹{total:N2}</p>
                <p>We will notify you once your order is shipped.</p>
                <br/>
                <p>Best regards,<br/>The Saiko Studio</p>
            ";
            await SendEmailAsync(to, subject, body);
        }
    }
}
