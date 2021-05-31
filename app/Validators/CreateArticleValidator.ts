import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateArticleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}, [rules.unique({ table: 'articles', column: 'title' })]),
    pictureHeader: schema.string.optional(),
    stock: schema.number.optional(),
    size: schema.string.optional(),
    mention: schema.string.optional(),
    overview: schema.string.optional(),
    websiteLink: schema.string.optional(),
    price: schema.number.optional(),
    sizeMeasure: schema.string.optional(),
    weightMeasure: schema.string.optional(),
    dateLimit: schema.date.optional(),
  });

  public messages = {};
}
