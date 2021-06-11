import Route from '@ioc:Adonis/Core/Route';
import { UserFactory } from 'Database/factories';
import './users';
import './brands';
import './articles';
import './interest';
import './picturesArticles';
import './orders';
import './instagram';
import './register';

Route.group(() => {
  Route.get('/user-factory', async () => {
    await UserFactory.with('brands', 1, (brands) => brands.with('articles', 1))
      .with('interests', 1)
      .create();

    return { message: 'Va voir la Base de données !' };
  });
}).prefix('/api');

Route.get('login', async () => {
  return { message: 'Page de connexion', success: true };
}).prefix('/api');

Route.post('login', async ({ auth, request, response }) => {
  const { email, password } = request.only(['email', 'password']);

  try {
    await auth.use('web').attempt(email, password);
    return { user: auth.user };
  } catch (error) {
    return response.badRequest({ message: 'Invalid credentials', success: false });
  }
}).prefix('/api');

Route.get('logout', async ({ auth, response }) => {
  await auth.use('web').logout();
  response.redirect('/api/login');
}).prefix('/api');

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
