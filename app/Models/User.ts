import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ isPrimary: true })
  public email: string;

  @column()
  public password: string;

  @column()
  public firstName: string;

  @column()
  public lastName: string;

  @column()
  public gender: string;

  @column()
  public birthday: string;

  @column()
  public address: string;

  @column()
  public country: string;

  @column()
  public city: string;

  @column()
  public zipCode: string;

  @column()
  public phoneNumber: string;

  @column()
  public credit: number;

  @column()
  public status: string;

  @column()
  public mailActivated: boolean;

  @column()
  public phoneNumberActivated: boolean;

  @column()
  public role: string;

  @column()
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
