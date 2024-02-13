using ECommerce.Models.Interfaces;
using ECommerce.Models.Models;

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
            order.Status = "Cancelled";
            _context.SaveChanges();
            return true;
        }

        public bool CompleteOrder(Order order)
        {
            order.Status = "Completed";
            _context.SaveChanges();
            return true;
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
