import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import Article from './Article';
import User from './User';

export default class Brand extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public subtitle: string;

  @column()
  public description: string;

  @column()
  public logo: string;

  @hasMany(() => Article)
  public articles: HasMany<typeof Article>;

  @manyToMany(() => User, {
    pivotTable: 'user_brand',
    pivotTimestamps: true,
  })
  public users: ManyToMany<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
