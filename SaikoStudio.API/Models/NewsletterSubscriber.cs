using System.ComponentModel.DataAnnotations;

namespace SaikoStudio.API.Models
{
    public class NewsletterSubscriber
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public DateTime SubscribedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
    }
}
