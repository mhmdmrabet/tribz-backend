import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class PicturesArticles extends BaseSchema {
  protected tableName = 'pictures_articles';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.text('path').notNullable();
      table.text('title').notNullable();
      table.text('description');
      table.integer('article_id');
      table.foreign('article_id').references('id').inTable('articles').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
