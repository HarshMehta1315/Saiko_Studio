using System.ComponentModel.DataAnnotations;

namespace SaikoStudio.API.Models
{
    public class ProductImage
    {
        [Key]
        public Guid Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int SortOrder { get; set; }
        public Guid ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
