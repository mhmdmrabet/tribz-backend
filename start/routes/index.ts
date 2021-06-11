import Route from '@ioc:Adonis/Core/Route';
import { UserFactory } from 'Database/factories';
import './users';
import './brands';
import './articles';
import './interest';
import './picturesArticles';
import './orders';
import './instagram';
import './auth';

// === HOMEPAGE
Route.get('', async ({ auth, response }) => {
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

// === FACTORY
Route.group(() => {
  Route.get('/user-factory', async ({ response }) => {
    await UserFactory.with('brands', 1, (brands) => brands.with('articles', 1))
      .with('interests', 1)
      .create();

    return response.created({ message: "Let's Go !", success: true });
  });
}).prefix('/api');
