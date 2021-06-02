import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.resource('interests', 'InterestsController').apiOnly();
}).prefix('/api');
