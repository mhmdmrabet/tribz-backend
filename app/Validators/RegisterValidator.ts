import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { regexPassword } from 'App/Utils/regex';

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string.optional({ trim: true, escape: true }, [
      rules.alpha({
        allow: ['space', 'dash'],
      }),
    ]),
    lastName: schema.string.optional({ trim: true }),
    email: schema.string({ trim: true, escape: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true, escape: true }, [
      rules.minLength(8),
      rules.regex(regexPassword),
    ]),
  });

  public messages = {};
}
