using ECommerce.Models.Models;
using ECommerce.Services.DTO;

namespace ECommerce.Services.Interfaces
{
    public interface IOrderService
    {
        ResponseDTO GetOrders();
        ResponseDTO GetOrderById(int id);
        ResponseDTO PlaceOrder(AddOrderDTO order);
        ResponseDTO CancelOrder(int orderId);
        ResponseDTO CompleteOrder(int orderId);
        ResponseDTO DeleteOrder(int orderId);

    }
}
