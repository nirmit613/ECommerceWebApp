using AutoMapper;
using ECommerce.Models.Interfaces;
using ECommerce.Models.Models;
using ECommerce.Services.DTO;
using ECommerce.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
namespace ECommerce.Services.Services
{
    public class ProductService:IProductService
    {
        #region Fields
        private readonly IMapper _mapper;
        private readonly IProductRepository _productRepository ;
        private readonly string _uploadsFolderPath;
        private readonly IWebHostEnvironment _webHostEnvironment;
        #endregion
        #region Constructors
        public ProductService(IMapper mapper, IProductRepository productRepository, string uploadsFolderPath,IWebHostEnvironment webHostEnvironment)
        {
            _mapper = mapper;
            _productRepository = productRepository;
            _uploadsFolderPath = uploadsFolderPath;
            _webHostEnvironment = webHostEnvironment;
        }
        #endregion
        #region Methods
        public ResponseDTO GetProducts()
        {
            var response = new ResponseDTO();
            try
            {
                var data = _mapper.Map<List<Product>>(_productRepository.GetProducts().ToList());
                response.Status = 200;
                response.Message = "Ok";
                response.Data = data;
            }
            catch (Exception e)
            {
                response.Status = 500;
                response.Message = "Internal Server Error";
                response.Error = e.Message;
            }
            return response;
        }

        public ResponseDTO GetProductById(int id)
        {
            var response = new ResponseDTO();
            try
            {
                var product = _productRepository.GetProductById(id);
                if (product == null)
                {
                    response.Status = 404;
                    response.Message = "Not Found";
                    response.Error = "Product not found";
                    return response;
                }
                var result = _mapper.Map<Product>(product);

                response.Status = 200;
                response.Message = "Ok";
                response.Data = result;
            }
            catch (Exception e)
            {
                response.Status = 500;
                response.Message = "Internal Server Error";
                response.Error = e.Message;
            }
            return response;
        }

        public ResponseDTO AddProduct(AddProductDTO product)
        {
            var response = new ResponseDTO();
            try
            {
                if (product.ProductPhotoUrl != null && product.ProductPhotoUrl.Length > 0)
                {
                    product.ProductPhotoUrl = "/" + _uploadsFolderPath + "/" + Path.GetFileName(product.ProductPhotoUrl);
                }
                var newProduct = _mapper.Map<Product>(product);
                var productId = _productRepository.AddProduct(newProduct);

                if (productId > 0)
                {
                    response.Status = 200;
                    response.Message = "Product added successfully";
                    response.Data = productId;
                }
                else
                {
                    response.Status = 400;
                    response.Message = "Failed to add product";
                }

            }
            catch (Exception e)
            {
                response.Status = 500;
                response.Message = "Internal Server Error";
                response.Error = e.Message;
            }
            return response;
        }

        public ResponseDTO UpdateProduct(UpdateProductDTO product)
        {
            var response = new ResponseDTO();
            try
            {
                var productById = _productRepository.GetProductById(product.Id);
                if (productById == null)
                {
                    response.Status = 404;
                    response.Message = "Not Found";
                    response.Error = "product not found";
                    return response;
                }
                var updateFlag = _productRepository.UpdateProduct(_mapper.Map<Product>(product));
                if (updateFlag)
                {
                    response.Status = 204;
                    response.Message = "Updated";
                }
                else
                {
                    response.Status = 400;
                    response.Message = "Not Updated";
                    response.Error = "Could not update product";
                }
            }
            catch(Exception e)
            {
                response.Status = 500;
                response.Message = "Internal Server Error";
                response.Error = e.Message;
            }
            return response;
        }

        public ResponseDTO DeleteProduct(int id)
        {
            var response = new ResponseDTO();
            try
            {
                var productById = _productRepository.GetProductById(id);
                if (productById == null)
                {
                    response.Status = 404;
                    response.Message = "Not Found";
                    response.Error = "User not found";
                    return response;
                }
                var deleteFlag = _productRepository.DeleteProduct(productById);
                if (deleteFlag)
                {
                    response.Status = 204;
                    response.Message = "Deleted";
                }
                else
                {
                    response.Status = 400;
                    response.Message = "Not Deleted";
                    response.Error = "Could not delete user";
                }
            }
            catch (Exception e)
            {
                response.Status = 500;
                response.Message = "Internal Server Error";
                response.Error = e.Message;
            }
            return response;
        }
        #endregion
    }
}
