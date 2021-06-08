import Route from '@ioc:Adonis/Core/Route';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

// == https://api.instagram.com/oauth/authorize?client_id=****&redirect_uri=****&scope=user_profile,user_media&response_type=code
Route.group(() => {
  Route.get('auth', async ({ request }: HttpContextContract) => {
    const { code } = request.qs();
    return { code };
  });
}).prefix('api');
