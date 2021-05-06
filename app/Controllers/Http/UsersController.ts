import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
  public async findAll(ctx: HttpContextContract) {
    const users = await User.all();

    return users;
  }
}
