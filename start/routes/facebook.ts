import Route from '@ioc:Adonis/Core/Route';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Env from '@ioc:Adonis/Core/Env';
import Token from 'App/Models/Token';
import axios from 'axios';

const REDIRECT_URI = 'https://tribz-pg.herokuapp.com/api/instagram/';
const CLIENT_SECRET = Env.get('FACEBOOK_CLIENT_SECRET');
const APP_ID = Env.get('FACEBOOK_CLIENT_ID');

// == FACEBOOK LOGIN
Route.get('facebook/login', async ({ response, auth }: HttpContextContract) => {
  const userId: string = await String(auth.user?.id);
  response
    .redirect()
    .toPath(
      `https://www.facebook.com/v11.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&state=${userId}`
    );
})
  .prefix('api')
  .middleware('auth');

// === API INSTAGRAM
Route.get('instagram', async ({ request, auth }: HttpContextContract) => {
  try {
    const userId: string = await String(auth.user?.id);
    const { code } = request.qs();

    // ==> Echange code contre TOKEN
    const response = await axios.get(
      `https://graph.facebook.com/v11.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${CLIENT_SECRET}&code=${code}`
    );

    const { access_token: token, expires_in: expiresIn } = response.data;

    // === Permet de récupérer les information du token
    // Afin d'extraire le facebook user id
    const tokenInformation = await axios.get(
      `https://graph.facebook.com/debug_token?input_token=${token}&access_token=3967004026686709|NOzXbOEXJyAKVdUhvihsuAgcQ0g`
    );
    const { user_id: facebookUserId } = tokenInformation.data.data;

    const socialNetwork = 'facebook';
    // ==> Create or Update Token in database
    await Token.updateOrCreate(
      { userId, socialNetwork },
      {
        facebookUserId,
        token,
        expiresIn,
        socialNetwork,
        userId,
      }
    );

    return {
      message: "The user's token has been registered",
      success: true,
    };
  } catch (error) {
    return { message: error, success: false };
  }
})
  .prefix('api')
  .middleware('auth');
