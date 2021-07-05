import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { URL_PROD } from 'App/Utils/url';
import Route from '@ioc:Adonis/Core/Route';
import Mail from '@ioc:Adonis/Addons/Mail';
import User from 'App/Models/User';
import RegisterValidator from 'App/Validators/RegisterValidator';

export default class AuthController {
  // === VERIFY EMAIL
  public async sendMailForVerifyMail({ auth, response }: HttpContextContract) {
    try {
      const { fullName, email } = auth.user!;
      if (!auth.use('web').isLoggedIn) {
        return response.status(401).send({ message: 'Not authenticated', success: false });
      }

      await Mail.send((message) => {
        message
          .subject('Welcome in Tribz')
          .from('mohamed@tanke.fr')
          .to(email)
          .htmlView('emails/welcome', {
            user: {
              fullName: `${fullName}`,
            },
            redirectSignedUrl:
              URL_PROD +
              Route.builder().params({ email }).makeSigned('verifyEmail', { expiresIn: '30m' }),
          });
      });
      return { messages: 'The verification email has been sent', success: true };
    } catch (error) {
      return { message: error, success: false };
    }
  }

  // === REGISTER CONTROLLER
  public async register({ request, response, auth }: HttpContextContract) {
    try {
      const payload = await request.validate(RegisterValidator);
      await User.create(payload);
      const { email, password } = payload;
      await auth.use('web').attempt(email, password);
      return response.redirect('/verify-email');
    } catch (error) {
      return { message: error, success: false };
    }
  }

  // === VALIDATION EMAIL
  public async verifyEmail({ params, request }: HttpContextContract) {
    if (request.hasValidSignature()) {
      const user = await User.findByOrFail('email', params.email);
      if (user.mailActivated) {
        return { message: 'Your email has already been validated', success: false };
      }
      await user.merge({ mailActivated: true }).save();
      return { message: `Mail activated : ${user.mailActivated}`, success: true };
    }

    return { message: 'Signature is missing or URL was tampered.', success: false };
  }

  // === LOGIN
  public async pageLogin({ auth }) {
    await auth.use('web').attempt('mohamed@tanke.fr', 'mohamedpwd');
    return { message: 'Login Page', success: true };
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password']);

    try {
      await auth.use('web').attempt(email, password);
      return { data: { user: auth.user }, success: true };
    } catch (error) {
      return response.badRequest({ message: 'Invalid credentials', success: false });
    }
  }

  // === LOGOUT
  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout();
    response.redirect('/api/login');
  }
}
