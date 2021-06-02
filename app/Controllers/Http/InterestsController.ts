import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Interest from 'App/Models/Interest';
import CreateInterestValidator from 'App/Validators/CreateInterestValidator';

export default class InterestsController {
  public async index() {
    const interests = await Interest.all();
    return interests;
  }

  public async store({ response, request }: HttpContextContract) {
    const payload = await request.validate(CreateInterestValidator);
    await Interest.create(payload);
    response.created();
  }

  public async show({ params }: HttpContextContract) {
    const interest = await Interest.findOrFail(params.id);
    await interest.load('users');
    return { interest };
  }

  public async update({ params, request }: HttpContextContract) {
    const interest = await Interest.findOrFail(params.id);
    await interest.merge(request.body()).save();
    return interest;
  }

  public async destroy({ params }: HttpContextContract) {
    const interest = await Interest.findOrFail(params.id);
    await interest.delete();
  }
}
