import Route from '@ioc:Adonis/Core/Route';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UserFactory } from 'Database/factories';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Mail from '@ioc:Adonis/Addons/Mail';
import User from 'App/Models/User';
import './users';
import './brands';
import './articles';
import './interest';
import './picturesArticles';
import './orders';
import './instagram';

Route.group(() => {
  Route.get('', async () => {
    await UserFactory.with('brands', 1, (brands) => brands.with('articles', 1))
      .with('interests', 1)
      .create();

    return { message: 'Va voir la Base de données !' };
  });
}).prefix('/api');

Route.group(() => {
  Route.post('signup', async ({ request, response, auth }: HttpContextContract) => {
    const newUserSchema = schema.create({
      firstName: schema.string.optional(),
      lastName: schema.string.optional(),
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({ escape: true, trim: true }, [
        rules.minLength(8),
        rules.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!-@#$%^&*_?]).{8,}/),
      ]),
    });

    const payload = await request.validate({ schema: newUserSchema });
    await User.create(payload);
    const { email, password } = payload;
    await auth.use('web').attempt(email, password);
    await Mail.sendLater((message) => {
      message
        .from('mohamed@tanke.fr')
        .to(email)
        .subject('Welcome')
        .htmlView('emails/welcome', {
          user: {
            fullName: `${auth.user?.firstName} ${auth.user?.lastName}`,
          },
          redirectUrlWithUuid: `http://localhost:3333/api/verify/${auth.user?.id}`,
        });
    });
    response.created({ message: 'Check your email adress' });
  });
}).prefix('api');

Route.get('login', async () => {
  return { message: 'Page de connexion', success: true };
}).prefix('/api');

Route.post('login', async ({ auth, request, response }) => {
  const { email, password } = request.only(['email', 'password']);

  try {
    await auth.use('web').attempt(email, password);
    return { user: auth.user };
  } catch (error) {
    return response.badRequest({ message: 'Invalid credentials', success: false });
  }
}).prefix('/api');

Route.get('logout', async ({ auth, response }) => {
  await auth.use('web').logout();
  response.redirect('/api/login');
}).prefix('/api');

Route.get('dashboard', async ({ auth, response }) => {
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
