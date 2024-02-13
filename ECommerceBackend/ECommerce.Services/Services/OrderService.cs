using AutoMapper;
using ECommerce.Models.Interfaces;
using ECommerce.Models.Models;
using ECommerce.Models.Repository;
using ECommerce.Services.DTO;
using ECommerce.Services.Interfaces;

namespace ECommerce.Services.Services
{
    public class OrderService : IOrderService
    {
        #region Fields 
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        #endregion

        #region Constructors
        public OrderService(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }
        #endregion

        #region Methods
        public ResponseDTO GetOrders()
        {
            var response = new ResponseDTO();
            try
            {
                var data = _mapper.Map<List<Order>>(_orderRepository.GetOrders().ToList());
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
        public ResponseDTO GetOrderById(int id)
        {
            var response = new ResponseDTO();
            try
            {
                var order = _orderRepository.GetOrderById(id);
                if (order == null)
                {
                    response.Status = 404;
                    response.Message = "Not Found";
                    response.Error = "Order not found";
                    return response;
                }
                var result = _mapper.Map<Order>(order);

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
        public ResponseDTO CancelOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public ResponseDTO CompleteOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public ResponseDTO DeleteOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public ResponseDTO PlaceOrder(AddOrderDTO order)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
