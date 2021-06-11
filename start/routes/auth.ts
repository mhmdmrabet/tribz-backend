import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  // === REGISTER ROUTE
  Route.post('', 'AuthController.register');

  // === VERIFY EMAIL
  Route.get('verify-email', 'AuthController.sendMailForVerifyMail');
  Route.get('verify-email/:uuid', 'AuthController.verifyEmail');

  // === LOGIN
  Route.get('login', 'AuthController.pageLogin');
  Route.post('login', 'AuthController.login');

  // === LOGOUT
  Route.get('logout', 'AuthController.logout');
}).prefix('api');
