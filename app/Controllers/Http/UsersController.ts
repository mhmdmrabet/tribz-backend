import User from 'App/Models/User';

export default class UsersController {
  public async findAll() {
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

  public async findOne(params) {
    try {
      const user = await User.find(params.id);
      if (!user) {
        return { message: "Cet utilisateur n'existe pas.", success: false };
      }
      return { user, success: true };
    } catch (error) {
      return { error, success: false };
    }
  }
}
