import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('orders', 'OrdersController.userOrders');
  Route.post('orders', 'OrdersController.store');
  Route.put('orders', 'OrdersController.update');
  Route.delete('orders/:articleId', 'OrdersController.destroy');
}).prefix('api');
