import Route from '@ioc:Adonis/Core/Route';
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

//== BASE ROUTE
Route.get('', async ({ response }: HttpContextContract) => {
  response.redirect('api');
});

// === API INSTAGRAM
Route.get('instagram', async ({ request }: HttpContextContract) => {
  const { code } = request.qs();
  return { code };
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
    appId: '3967004026686709',
    redirectUri: 'https://tribz-pg.herokuapp.com/api/instagram/',
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
