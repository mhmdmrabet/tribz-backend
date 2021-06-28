import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  // === REGISTER ROUTE
  Route.post('register', 'AuthController.register');

  // === VERIFY EMAIL
  Route.get('verify-email', 'AuthController.sendMailForVerifyMail');

  // === LOGIN
  Route.get('login', 'AuthController.pageLogin');
  Route.post('login', 'AuthController.login');

  // === LOGOUT
  Route.get('logout', 'AuthController.logout');

  // === VALIDATE EMAIL
  Route.get('/verify/:email', 'AuthController.verifyEmail').as('verifyEmail');
}).prefix('api');
