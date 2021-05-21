import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.resource('users', 'UsersController').only(['store', 'update', 'index', 'destroy', 'show']);
}).prefix('/api');
