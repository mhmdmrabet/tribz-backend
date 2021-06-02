import Route from '@ioc:Adonis/Core/Route';
import { BrandFactory, InterestFactory, UserFactory } from 'Database/factories';
import './users';
import './brands';
import './articles';
import './interest';

Route.group(() => {
  Route.get('', async () => {
    await UserFactory.create();
    await BrandFactory.with('articles', 1).create();
    await InterestFactory.create();
    return { message: 'Va voir la Base de données !' };
  });
}).prefix('/api');

Route.get('login', async () => {
  return { message: 'Page de connexion', success: true };
});

Route.post('login', async ({ auth, request, response }) => {
  const { email, password } = request.only(['email', 'password']);
  try {
    await auth.use('web').attempt(email, password);
    response.redirect('/api/dashboard');
  } catch (error) {
    return response.badRequest('Invalid credentials');
  }
}).prefix('/api');

Route.post('logout', async ({ auth, response }) => {
  await auth.use('web').logout();
  response.redirect('/login');
});

Route.get('dashboard', async ({ auth, response }) => {
  try {
    await auth.use('web').authenticate();
    return { message: 'You are successfully connected to the application', success: true };
  } catch (error) {
    return response.badRequest({
      message: 'Please login to the app.',
      success: false,
    });
  }
}).prefix('/api');
