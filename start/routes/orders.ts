import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.resource('orders', 'OrdersController').only(['update', 'store']);
  Route.get('orders', 'OrdersController.userOrders');
  // === PERMET DE RECUPERER TOUTES LES COMMANDES
  // ACCESIBLE SEULEMENT A L'ADMIN
  Route.get('admin/orders', 'OrdersController.index').middleware('authAdmin');
  Route.delete('orders/:articleId', 'OrdersController.destroy');
})
  .prefix('api')
  .middleware('auth');
