﻿using ECommerce.Models.Models;

namespace ECommerce.Models.Interfaces
{
    public interface IProductRatingRepository
    {
        ProductRating GetProductRatingById(int id);
        IEnumerable<ProductRating> GetProductRatingsByProductId(int productId);
        int AddProductRating(ProductRating productRating);
        bool UpdateProductRating(ProductRating productRating);
        bool DeleteProductRating(ProductRating productRating);
        double GetAverageProductRating(int productId);
        double GetAllProductsAverageRating();
    }
}
