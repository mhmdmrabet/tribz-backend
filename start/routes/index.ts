import Env from '@ioc:Adonis/Core/Env';
import Route from '@ioc:Adonis/Core/Route';
import axios from 'axios';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UserFactory } from 'Database/factories';
import './users';
import './brands';
import './articles';
import './interest';
import './picturesArticles';
import './orders';
import './instagram';
import './auth';

const REDIRECT_URI = 'https://tribz-pg.herokuapp.com/api/instagram/';
const CLIENT_SECRET = Env.get('FACEBOOK_CLIENT_SECRET');
const APP_ID = Env.get('FACEBOOK_CLIENT_ID');

//== BASE ROUTE
Route.get('', async ({ response }: HttpContextContract) => {
  response.redirect('api');
});

// === API INSTAGRAM
Route.get('instagram', async ({ request }: HttpContextContract) => {
  try {
    const { code } = request.qs();
    // ==> Echange code contre TOKEN
    const response = await axios.get(
      `https://graph.facebook.com/v11.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${CLIENT_SECRET}&code=${code}`
    );
    return { data: response.data };
  } catch (error) {
    return { error };
  }
}).prefix('api');

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

// == FACEBOOK LOGIN
Route.get('facebook/login', async ({ response }: HttpContextContract) => {
  response
    .redirect()
    .toPath(
      `https://www.facebook.com/v11.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&state=26`
    );
}).prefix('api');

// === FACTORY
Route.group(() => {
  Route.get('/user-factory', async ({ response }) => {
    await UserFactory.with('brands', 1, (brands) => brands.with('articles', 1))
      .with('interests', 1)
      .create();

    return response.created({ message: "Let's Go !", success: true });
  });
}).prefix('api');
