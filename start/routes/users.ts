import Route from '@ioc:Adonis/Core/Route';
import UsersController from 'App/Controllers/Http/UsersController';

Route.group(() => {
  Route.group(() => {
    Route.get('', async (ctx) => {
      return new UsersController().findAll(ctx);
    });
  }).prefix('/users');
}).prefix('/api');
