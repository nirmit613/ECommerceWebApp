﻿using AutoMapper;
using ECommerce.Models.Interfaces;
using ECommerce.Models.Models;
using ECommerce.Services.DTO;
using ECommerce.Services.Interfaces;

namespace ECommerce.Services.Services
{
    public class CartService:ICartService
    {
        #region Fields 
        private readonly ICartRepository _cartRepository;
        private readonly IUserRepository _userRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        #endregion

        #region Constructor
        public CartService(IMapper mapper,ICartRepository cartRepository,IProductRepository productRepository,IUserRepository userRepository)
        {
            _mapper = mapper;
            _cartRepository = cartRepository;
            _userRepository = userRepository;
            _productRepository = productRepository;
        }
        #endregion
        #region Methods
        public ResponseDTO AddToCart(int userId, int productId, int quantity)
        {
            var response = new ResponseDTO();
            try
            {
                var existingCartItem = _cartRepository.GetCartItem(userId, productId);

                if (existingCartItem != null)
                {
                    existingCartItem.Quantity += quantity;
                    _cartRepository.UpdateCartItem(existingCartItem);
                }
                else
                {
                    var newCartItem = new CartItem
                    {
                        UserId = userId,
                        ProductId = productId,
                        Quantity = quantity
                    };
                    _cartRepository.AddToCart(newCartItem);
                }
                response.Status = 200;
                response.Message = "Item added to cart successfully.";
            }
            catch (Exception e)
            {
                response.Status = 500;
                response.Message = "Internal Server Error";
                response.Error = e.Message;
            }
            return response;
        }
        public ResponseDTO RemoveFromCart(int cartItemId)
        {
            var response = new ResponseDTO();
            try
            {
                var cartItem = _cartRepository.GetCartItemById(cartItemId);
                if (cartItem == null)
                {
                    response.Status = 404;
                    response.Message = "Not Found";
                    response.Error = "Cart item not found";
                    return response;
                }

                _cartRepository.DeleteCartItem(cartItem);

                response.Status = 200;
                response.Message = "Item removed from cart successfully.";
            }
            catch (Exception e)
            {
                response.Status = 500;
                response.Message = "Internal Server Error";
                response.Error = e.Message;
            }
            return response;
        }
        public ResponseDTO GetCartItem(int userId, int productId)
        {
            var response = new ResponseDTO();
            try
            {
                var cartItem = _cartRepository.GetCartItem(userId, productId);
                if (cartItem == null)
                {
                    response.Status = 404;
                    response.Message = "Not Found";
                    response.Error = "Cart item not found";
                }
                else
                {
                    response.Status = 200;
                    response.Message = "Ok";
                    response.Data = cartItem;
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

        public ResponseDTO GetCartItemById(int cartItemId)
        {
            var response = new ResponseDTO();
            try
            {
                var cartItem = _cartRepository.GetCartItemById(cartItemId);
                if (cartItem == null)
                {
                    response.Status = 404;
                    response.Message = "Not Found";
                    response.Error = "Cart item not found";
                }
                else
                {
                    response.Status = 200;
                    response.Message = "Ok";
                    response.Data = cartItem;
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

        public ResponseDTO GetCartItemsByUserId(int userId)
        {
            var response = new ResponseDTO();
            try
            {
                var cartItems = _cartRepository.GetCartItemByUserId(userId).ToList();
                response.Status = 200;
                response.Message = "Ok";
                response.Data = cartItems;
            }
            catch (Exception e)
            {
                response.Status = 500;
                response.Message = "Internal Server Error";
                response.Error = e.Message;
            }
            return response;
        }

        public ResponseDTO UpdateCartItem(UpdateCartItemDTO cartItem)
        {
            var response = new ResponseDTO();
            try
            {
                var CartItemById = _cartRepository.GetCartItemById(cartItem.Id);
                if (CartItemById == null)
                {
                    response.Status = 404;
                    response.Message = "Not Found";
                    response.Error = "Item not found";
                    return response;
                }
                var updateFlag = _cartRepository.UpdateCartItem(_mapper.Map<CartItem>(cartItem));
                if (updateFlag)
                {
                    response.Status = 204;
                    response.Message = "Updated";
                }
                else
                {
                    response.Status = 400;
                    response.Message = "Not Updated";
                    response.Error = "Could not update Cart item";
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
