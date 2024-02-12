using ECommerce.Models.Interfaces;
using ECommerce.Models.Models;
using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Models.Repository
{
    public class ProductRepository:IProductRepository
    {
        #region Fields
        private readonly AppDbContext _context;
        #endregion
        #region Constructor
        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }
        #endregion

        #region Methods
        public IEnumerable<Product> GetProducts()
        {
            return _context.Products.Include(p => p.ProductCategories)
            .ThenInclude(pc => pc.Category)
            .ToList();
        }
        public Product GetProductById(int id)
        {
            return _context.Products.FirstOrDefault(u => u.Id == id);
        }

        public int AddProduct(Product product)
        {
            _context.Add(product);
            if (_context.SaveChanges() > 0)
                return product.Id;
            else
                return 0;
        }

        public bool UpdateProduct(Product product)
        {
            var existingProduct = _context.Products.Find(product.Id);
            if (existingProduct != null)
            {
                existingProduct.ProductName = product.ProductName;
                existingProduct.ProductPhotoUrl = product.ProductPhotoUrl;
                existingProduct.Quantity = product.Quantity;
                existingProduct.Price = product.Price;
                existingProduct.ProductCategories = product.ProductCategories;

                _context.Entry(existingProduct).State = EntityState.Modified;
            }
            return _context.SaveChanges()>0;
        }
       public bool DeleteProduct(Product product)
        {
            _context.Remove(product);
            return _context.SaveChanges() > 0;

        }
        public IEnumerable<ProductCategory> GetProductsCategories()
        {
            return _context.ProductCategories.ToList();

        }

        public IEnumerable<Category> GetCategories()
        {
            return _context.Categories.ToList();
        }

        public Category GetCategoryById(int id)
        {
            return _context.Categories.FirstOrDefault(c => c.Id == id);
        }
        #endregion
    }
}
