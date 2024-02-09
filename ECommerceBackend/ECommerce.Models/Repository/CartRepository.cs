﻿using ECommerce.Models.Interfaces;
using ECommerce.Models.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Models.Repository
{
    public class CartRepository:ICartRepository
    {
        #region Fields
        private readonly AppDbContext _context;
        #endregion

        #region Constructor
        public CartRepository(AppDbContext context)
        {
            _context = context;
        }
        #endregion

        #region Methods
        public CartItem GetCartItemById(int id)
        {
            return _context.CartItems.FirstOrDefault(item => item.Id == id);
        }
        public int AddToCart(CartItem cartItem)
        {
            _context.Add(cartItem);
            if (_context.SaveChanges() > 0)
                return cartItem.Id;
            else
                return 0;
        }
        public bool UpdateCartItem(CartItem cartItem)
        {
            var existingProduct = _context.CartItems.Find(cartItem.Id);
            if (existingProduct != null)
            {
                existingProduct.Quantity = cartItem.Quantity;
                
                _context.Entry(existingProduct).State = EntityState.Modified;
            }
            return _context.SaveChanges() > 0;
        }
        public bool DeleteCartItem(CartItem cartItem)
        {
            _context.Remove(cartItem);
            return _context.SaveChanges() > 0;

        }
        public IEnumerable<CartItem> GetCartItemByUserId(int userId)
        {
            return _context.CartItems.Where(item => item.UserId == userId).ToList();
        }
        public CartItem GetCartItem(int userId, int productId)
        {
            return _context.CartItems.FirstOrDefault(item => item.UserId == userId && item.ProductId == productId);
        }
        #endregion
    }
}