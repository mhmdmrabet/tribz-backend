import User from 'App/Models/User';

export default class UsersController {
  public async findAll() {
    const users = await User.all();

    return users;
  }
}
