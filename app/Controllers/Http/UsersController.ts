import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';

export default class UsersController {
  public async index() {
    try {
      const users = await User.all();
      if (!users) {
        return { message: "Cet utilisateur n'existe pas.", success: false };
      }
      return { users, success: true };
    } catch (error) {
      return { error, success: false };
    }
  }

  public async store({ request }) {
    try {
      const payload = await request.validate(CreateUserValidator);

      const user = await User.create(payload);
      if (user.$isPersisted) {
        return { message: 'The user has been registered', success: true };
      }
    } catch (error) {
      return { error, success: false };
    }
  }
}
