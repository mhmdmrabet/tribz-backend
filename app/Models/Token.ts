import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo, beforeSave } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: string;

  @column()
  public token: string;

  @column.date()
  public expiresIn: any;

  @column()
  public socialNetwork: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @beforeSave()
  public static async TransformSecondsInDateTime(token: Token) {
    if (token.$dirty.expiresIn) {
      const nowInSeconds = DateTime.now().toSeconds();
      const expiresInFormatDate = DateTime.fromSeconds(token.expiresIn + nowInSeconds);
      token.expiresIn = expiresInFormatDate;
    }
  }
}
