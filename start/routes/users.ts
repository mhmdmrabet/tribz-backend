import Route from '@ioc:Adonis/Core/Route';
import UsersController from 'App/Controllers/Http/UsersController';

Route.group(() => {
  Route.group(() => {
    Route.get('/', async () => {
      return new UsersController().findAll();
    });
    Route.get('/:id', async ({ params }) => {
      return new UsersController().findOne(params);
    });
  }).prefix('/users');
}).prefix('/api');
