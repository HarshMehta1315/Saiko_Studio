using System.ComponentModel.DataAnnotations;

namespace SaikoStudio.API.Models
{
    public class CartItem
    {
        [Key]
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        public string SessionId { get; set; } = string.Empty;

        public Guid? UserId { get; set; }
        public User? User { get; set; }

        public Guid ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
