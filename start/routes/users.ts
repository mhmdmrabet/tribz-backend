import Route from '@ioc:Adonis/Core/Route';
import UsersController from 'App/Controllers/Http/UsersController';

Route.group(() => {
  Route.group(() => {
    Route.get('', async () => {
      return new UsersController().findAll();
    });
  }).prefix('/users');
}).prefix('/api');
