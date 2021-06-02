import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Article from './Article';

export default class PicturesArticle extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public path: string;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public articleId: number;

  @belongsTo(() => Article)
  public article: BelongsTo<typeof Article>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
