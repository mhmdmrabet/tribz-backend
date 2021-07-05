import Route from '@ioc:Adonis/Core/Route';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UserFactory } from 'Database/factories';
import { getTokenBySocialNetworkAndId } from 'App/Utils/token';
import axios from 'axios';
import './users';
import './brands';
import './articles';
import './interest';
import './picturesArticles';
import './orders';
import './auth';
import './facebook';

//== BASE ROUTE
Route.get('', async ({ response }: HttpContextContract) => {
  response.send({ message: 'Backend Repo' });
});

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
}).prefix('api');

// === FACTORY
Route.get('/user-factory', async ({ response }) => {
  await UserFactory.with('brands', 1, (brands) => brands.with('articles', 1))
    .with('interests', 1)
    .create();

  return response.created({ message: "Let's Go !", success: true });
}).prefix('api');

// === Connexion with API
Route.get('/social-data/:socialNetwork', async ({ auth, params }: HttpContextContract) => {
  try {
    await auth.use('web').authenticate();
    const { socialNetwork } = params;
    const { id: userId } = auth.user!;
    const { token: accessToken } = await getTokenBySocialNetworkAndId(userId, socialNetwork);
    if (!accessToken) {
      return { data: 'Token not found', success: false };
    }
    const result = await axios.post('http://127.0.0.1:3000/users', {
      userId,
      accessToken,
    });
    if (!result.data.success) {
      return { message: result.data.message, success: false };
    }
    const { firstName, lastName } = result.data.data;
    return { data: { firstName, lastName }, success: true };
  } catch (error) {
    return error;
  }
}).prefix('api');
