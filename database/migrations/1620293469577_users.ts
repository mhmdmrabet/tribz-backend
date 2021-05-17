import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Users extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.defer(async () => {
      await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').exec();
    });

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery);
      table.text('email').unique().notNullable();
      table.text('password').notNullable();
      table.text('first_name');
      table.text('last_name');
      table.text('gender');
      table.date('birthday');
      table.text('address');
      table.text('country');
      table.text('city');
      table.text('zip_code');
      table.text('phone_number');
      table.integer('credit');
      table.text('status');
      table.boolean('mail_activated').defaultTo(false);
      table.boolean('phone_number_activated').defaultTo(false);
      table.text('role').defaultTo('user');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
