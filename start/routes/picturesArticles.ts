import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.resource('pictures-articles', 'PicturesArticlesController').apiOnly();
}).prefix('/api');
