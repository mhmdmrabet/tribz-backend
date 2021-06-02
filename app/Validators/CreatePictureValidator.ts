import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreatePictureValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    path: schema.string({}, [rules.unique({ table: 'pictures_articles', column: 'path' })]),
    title: schema.string({}, [rules.unique({ table: 'pictures_articles', column: 'title' })]),
    description: schema.string.optional(),
  });

  public messages = {};
}
