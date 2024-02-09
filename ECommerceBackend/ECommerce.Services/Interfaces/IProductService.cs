using ECommerce.Services.DTO;

namespace ECommerce.Services.Interfaces
{
    public interface IProductService
    {
        ResponseDTO GetProducts();
        ResponseDTO GetProductById(int id);
        ResponseDTO AddProduct(AddProductDTO product);
        ResponseDTO UpdateProduct(UpdateProductDTO updateProduct);
        ResponseDTO DeleteProduct(int id);

    }
}
