using System.ComponentModel.DataAnnotations;

namespace SaikoStudio.API.Models
{
    public class Address
    {
        [Key]
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public string Country { get; set; } = "India";
        public string? Phone { get; set; }
        public bool IsDefault { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}
