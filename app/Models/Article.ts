import { DateTime } from 'luxon';
import {
  BaseModel,
  belongsTo,
  column,
  BelongsTo,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm';
import Brand from './Brand';
import PictureArticle from './PictureArticle';
import User from './User';

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public pictureHeader: string;

  @column()
  public stock: number;

  @column()
  public size: string;

  @column()
  public mention: string;

  @column()
  public overview: string;

  @column()
  public websiteLink: string;

  @column()
  public price: number;

  @column()
  public sizeMeasure: string;

  @column()
  public weightMeasure: string;

  @column()
  public dateLimit: DateTime;

  @column()
  public articleCompleted: boolean;

  @column()
  public brandId: number;

  @belongsTo(() => Brand)
  public brand: BelongsTo<typeof Brand>;

  @hasMany(() => PictureArticle)
  public picturesArticles: HasMany<typeof PictureArticle>;

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
