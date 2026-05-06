using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaikoStudio.API.Models
{
    public class Coupon
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Code { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountValue { get; set; }

        public bool IsPercentage { get; set; } = true;

        [Column(TypeName = "decimal(18,2)")]
        public decimal? MinPurchaseAmount { get; set; }

        public int UsageLimit { get; set; } = 0;
        public int UsedCount { get; set; } = 0;

        public DateTime? ExpiresAt { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
