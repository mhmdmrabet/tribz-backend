import Route from '@ioc:Adonis/Core/Route';
import './users';

Route.group(() => {
  Route.get('', async () => {
    return { message: 'Hello in API' };
  });
}).prefix('/api');
