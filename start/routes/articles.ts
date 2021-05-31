import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.resource('articles', 'ArticlesController').apiOnly();
}).prefix('/api');
