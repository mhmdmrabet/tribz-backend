import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';

export default class UsersController {
  public async index() {
    try {
      const users = await User.all();
      if (!users) {
        return { message: 'No result found.', success: false };
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

  public async update({ params, request }) {
    try {
      const user = await User.findOrFail(params.id);
      const userData = request.body();
      await user.merge(userData).save();
      if (user.$isPersisted) {
        return { message: 'The information has been updated', success: true };
      }
    } catch (error) {
      return { message: 'Information has not been updated', error, success: false };
    }
  }

  public async destroy({ params }) {
    try {
      const user = await User.findByOrFail('id', params.id);
      await user.delete();
    } catch (error) {
      return { error, success: false };
    }
  }
}
