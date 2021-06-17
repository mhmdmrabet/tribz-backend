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

const APP_ID = '3967004026686709';
const REDIRECT_URI = 'https://tribz-pg.herokuapp.com/api/instagram/';
const CLIENT_SECRET = 'c8cae55054729256699875b8b37eae7b';

//== BASE ROUTE
Route.get('', async ({ response }: HttpContextContract) => {
  response.redirect('api');
});

// === API INSTAGRAM
Route.get('instagram', async ({ request }: HttpContextContract) => {
  try {
    const { code } = request.qs();
    // ==> Echange code contre TOKEN
    const accessToken = await axios.get(
      `https://graph.facebook.com/v11.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${CLIENT_SECRET}&code=${code}`
    );
    return { accessToken };
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
Route.get('facebook/login', async ({ view }) => {
  const html = await view.render('facebook', {
    appId: APP_ID,
    redirectUri: REDIRECT_URI,
    apiBaseUrl: 'https://www.facebook.com/v11.0/dialog/oauth?',
  });
  return html;
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
