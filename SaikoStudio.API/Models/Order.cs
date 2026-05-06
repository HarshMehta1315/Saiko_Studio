using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SaikoStudio.API.Helper;

namespace SaikoStudio.API.Models
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TaxAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal ShippingAmount { get; set; }

        public OrderStatusType Status { get; set; } = OrderStatusType.Pending;
        public PaymentStatusType PaymentStatus { get; set; } = PaymentStatusType.Pending;
        public PaymentMethodType PaymentMethod { get; set; }

        public string? TrackingNumber { get; set; }
        public string? ShippingAddress { get; set; }
        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ShippedAt { get; set; }
        public DateTime? DeliveredAt { get; set; }

        public Guid UserId { get; set; }
        public User? User { get; set; }

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }
}
