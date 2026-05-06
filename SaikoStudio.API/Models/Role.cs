using System.ComponentModel.DataAnnotations;
using SaikoStudio.API.Helper;

namespace SaikoStudio.API.Models
{
    public class Role
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
