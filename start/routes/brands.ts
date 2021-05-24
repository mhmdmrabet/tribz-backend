import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.resource('brands', 'BrandsController').apiOnly();
}).prefix('/api');
