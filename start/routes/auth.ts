import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  // === REGISTER ROUTE
  Route.group(() => {
    Route.post('', 'AuthController.register');
    Route.get('verify/:uuid', 'AuthController.verifyEmail');
  }).prefix('register');

  // === LOGIN
  Route.get('login', 'AuthController.pageLogin');
  Route.post('login', 'AuthController.login');

  // === LOGOUT
  Route.get('logout', 'AuthController.logout');
}).prefix('api');
