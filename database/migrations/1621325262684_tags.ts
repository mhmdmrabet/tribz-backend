import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Tags extends BaseSchema {
  protected tableName = 'tags';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery);
      table.text('title').notNullable();
      table.uuid('article_id');
      table.foreign('article_id').references('id').inTable('articles').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
