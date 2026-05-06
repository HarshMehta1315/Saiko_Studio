using System.ComponentModel.DataAnnotations;

namespace SaikoStudio.API.Models
{
    public class ProductVariant
    {
        [Key]
        public Guid Id { get; set; }
        public string Size { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public int Stock { get; set; } = 0;
        public Guid ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
