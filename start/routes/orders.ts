import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('orders', 'OrdersController.userOrders');
  Route.post('orders', 'OrdersController.store');
}).prefix('api');
