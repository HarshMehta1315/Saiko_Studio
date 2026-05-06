using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SaikoStudio.API.Helper;

namespace SaikoStudio.API.Models
{
    public class Payment
    {
        [Key]
        public Guid Id { get; set; }

        public string TransactionId { get; set; } = string.Empty;
        public string? GatewayResponse { get; set; }
        public string? Gateway { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        public PaymentStatusType Status { get; set; } = PaymentStatusType.Pending;
        public PaymentMethodType PaymentMethod { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ProcessedAt { get; set; }

        public Guid OrderId { get; set; }
        public Order? Order { get; set; }
    }
}
