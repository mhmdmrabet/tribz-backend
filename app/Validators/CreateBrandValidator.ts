import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateBrandValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}, [rules.unique({ table: 'brands', column: 'title' })]),
    subtitle: schema.string.optional(),
    description: schema.string.optional(),
    logo: schema.string.optional({ trim: true }),
  });

  public messages = {};
}
