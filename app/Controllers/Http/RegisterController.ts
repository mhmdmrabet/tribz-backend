import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Mail from '@ioc:Adonis/Addons/Mail';
import User from 'App/Models/User';
import RegisterValidator from 'App/Validators/RegisterValidator';
import Encryption from '@ioc:Adonis/Core/Encryption';

export default class RegisterController {
  public async register({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator);
    await User.create(payload);
    const { email, password } = payload;
    await auth.use('web').attempt(email, password);
    const encrypted = Encryption.encrypt(`verify-email-for-${auth.user?.id}`);
    await Mail.sendLater((message) => {
      message
        .from('mohamed@tanke.fr')
        .to(email)
        .subject('Welcome')
        .htmlView('emails/welcome', {
          user: {
            fullName: `${auth.user?.fullName}`,
          },
          redirectUrlWithUuid: `http://localhost:3333/api/register/verify/${encrypted}`,
        });
    });
    return response.created({ message: 'Check your email adress', success: true });
  }

  public async verifyEmail({ params }: HttpContextContract) {
    const key = params.uuid;
    const decriptedKey: string = Encryption?.decrypt(key)!;
    const userId = decriptedKey.split('verify-email-for-')[1];
    const user = await User.findOrFail(userId);
    if (user.mailActivated) {
      return { message: 'Your email has already been validated', success: false };
    }
    await user.merge({ mailActivated: true }).save();
    return { message: `Mail activated : ${user.mailActivated}`, success: true };
  }
}
