import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class LogRequest {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const userRole = (await auth.use('web').authenticate()).role;
    if (userRole !== 'admin') {
      response.unauthorized({ message: 'Must be logged in', success: false });
      return;
    }
    await next();
  }
}
