using System.ComponentModel.DataAnnotations;

namespace SaikoStudio.API.Models
{
    public class Review
    {
        [Key]
        public Guid Id { get; set; }
        public int Rating { get; set; }
        public string Content { get; set; } = string.Empty;

        public Guid? UserId { get; set; }
        public User? User { get; set; }

        public Guid ProductId { get; set; }
        public Product? Product { get; set; }

        public bool IsApproved { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
