import Route from '@ioc:Adonis/Core/Route';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

// == https://api.instagram.com/oauth/authorize?client_id=****&redirect_uri=****&scope=user_profile,user_media&response_type=code
Route.group(() => {
  Route.get('auth/', async ({ request }: HttpContextContract) => {
    const { code } = request.qs();
    const clientId = '2667165773583775';
    const clientSecret = 'b4e1ee3c2d415c3b5c66956863883541';
    const redirectUri = 'https://tribz-pg.herokuapp.com/api/auth/';
    const urlExchangeTheCodeForAToken = `https://api.instagram.com/oauth/access_token/client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&redirect_uri=${redirectUri}code=${code}`;

    return { urlExchangeTheCodeForAToken };
  });
}).prefix('api');
