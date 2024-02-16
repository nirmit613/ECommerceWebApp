﻿using ECommerce.Models.Models;

namespace ECommerce.Models.Interfaces
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetOrders();
        Order GetOrderById(int id);
        IEnumerable<Order> GetOrderByUserId(int userId);
        int PlaceOrder(Order order);
        bool CancelOrder(Order order);
        bool CompleteOrder(Order order);
        bool DeleteOrder(Order order);


    }
}
