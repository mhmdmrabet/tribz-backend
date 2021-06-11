import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('', 'RegisterController.register');
  Route.get('verify/:uuid', 'RegisterController.verifyEmail');
}).prefix('api/register');
