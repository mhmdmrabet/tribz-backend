import { DateTime } from 'luxon';
import { BaseModel, beforeSave, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import Brand from './Brand';
import Interest from './Interest';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
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

  @manyToMany(() => Brand, {
    pivotTable: 'user_brand',
    pivotTimestamps: true,
  })
  public brands: ManyToMany<typeof Brand>;

  @manyToMany(() => Interest, {
    pivotTable: 'interests_users',
    pivotTimestamps: true,
  })
  public interests: ManyToMany<typeof Interest>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
