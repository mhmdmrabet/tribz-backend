import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Brand from 'App/Models/Brand';
import CreateBrandValidator from 'App/Validators/CreateBrandValidator';

export default class BrandsController {
  public async index() {
    try {
      const brands = await Brand.all();
      return brands;
    } catch (error) {
      return { error, success: false };
    }
  }

  public async show({ params }) {
    const brand = await Brand.findOrFail(params.id);
    return brand;
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateBrandValidator);

    const brand = await Brand.create(payload);

    if (brand.$isPersisted) {
      return { message: 'The brand has been saved', success: true };
    } else {
      return { message: 'Error', success: false };
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const brand = await Brand.findOrFail(params.id);
    await brand.merge(request.body()).save();
    if (brand.$isPersisted) {
      return brand;
    } else {
      return { message: 'Error', success: false };
    }
  }

  public async destroy({ params }) {
    const brand = await Brand.findOrFail(params.id);
    await brand.delete();

    if (brand.$isDeleted) {
      return { message: 'The brand has been deleted', success: true };
    } else {
      return { message: 'Error', success: false };
    }
  }
}
