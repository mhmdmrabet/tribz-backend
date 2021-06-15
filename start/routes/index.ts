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

// === API INSTAGRAM
const INSTAGRAM_APP_REDIRECT_URI = 'https://tribz-pg.herokuapp.com/api/instagram/';

const INSTAGRAM_APP_SECRET = 'cdf7355c723e42aa3fe588046b0d8a28';

const INSTAGRAM_APP_ID = '313087903749198';

const API_BASE_URL = 'https://api.instagram.com/';

Route.get('/instagram', async ({ view }) => {
  const html = await view.render('instagram', {
    appId: INSTAGRAM_APP_ID,
    redirectUri: INSTAGRAM_APP_REDIRECT_URI,
    apiBaseUrl: API_BASE_URL,
    instagramAppSecret: INSTAGRAM_APP_SECRET,
  });
  return html;
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
}).prefix('/api');

// === AUTH FACEBOOK
Route.get('/facebook/redirect', async ({ ally }) => {
  return ally.use('facebook').redirect();
});

Route.get('/facebook/callback', async ({ ally }) => {
  const facebook = ally.use('facebook');

  if (facebook.accessDenied()) {
    return 'Access was denied';
  }

  if (facebook.stateMisMatch()) {
    return 'Request expired. Retry again';
  }

  if (facebook.hasError()) {
    return facebook.getError();
  }

  const user = await facebook.user();

  return { token: user.token.token };
});

// === FACTORY
Route.group(() => {
  Route.get('/user-factory', async ({ response }) => {
    await UserFactory.with('brands', 1, (brands) => brands.with('articles', 1))
      .with('interests', 1)
      .create();

    return response.created({ message: "Let's Go !", success: true });
  });
}).prefix('/api');
