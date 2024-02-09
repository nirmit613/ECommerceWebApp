using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerce.Models.Models
{
    public class Product
    {
        [Key] 
        public int Id { get; set; }
        [Required(ErrorMessage = "Product name is required")]
        [MaxLength(30, ErrorMessage = "Name can not be longer than 30 characters")]
        public string ProductName {  get; set; }

        [Required(ErrorMessage = "product photo URL is required")]
        public string ProductPhotoUrl { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        [Range(0, int.MaxValue, ErrorMessage = "Quantity must be a positive integer")]
        public int Quantity { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive number")]
        public double Price { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public List<ProductCategory> ProductCategories { get; set; }
    }
}
