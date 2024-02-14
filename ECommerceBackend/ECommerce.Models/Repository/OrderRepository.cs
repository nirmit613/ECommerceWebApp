using ECommerce.Models.Interfaces;
using ECommerce.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Models.Repository
{
    public class OrderRepository : IOrderRepository
    {
        #region fields
        private readonly AppDbContext _context;
        #endregion

        #region constructors
        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }
        #endregion

        #region Methods
        public IEnumerable<Order> GetOrders()
        {
            return _context.Orders.ToList();
        }

        public Order GetOrderById(int id)
        {
            return _context.Orders.FirstOrDefault(o => o.Id == id);
        }

        public int PlaceOrder(Order order)
        {
            order.OrderDate = DateTime.Now;
            order.Status = "InProgress";
            _context.Orders.Add(order);
            _context.SaveChanges();
            return order.Id;
        }

        public bool CancelOrder(Order order)
        {
            var orders = _context.Orders.Find(order.Id);
            if (orders != null)
            {
                orders.Status = "Cancelled";
                _context.Entry(orders).State = EntityState.Modified;
            }
            return _context.SaveChanges() > 0;
        }

        public bool CompleteOrder(Order order)
        {
            var orders = _context.Orders.Find(order.Id);
            if(orders != null)
            {
                orders.Status = "Completed";
                _context.Entry(orders).State = EntityState.Modified;
            }
            return _context.SaveChanges() > 0;
        }

        public bool DeleteOrder(Order order)
        {
            _context.Orders.Remove(order);
            _context.SaveChanges();
            return true;
        }
    }
    #endregion
}
