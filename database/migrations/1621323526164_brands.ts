import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Brands extends BaseSchema {
  protected tableName = 'brands';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery);
      table.text('title').notNullable();
      table.text('subtitle');
      table.text('description');
      table.text('logo');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
