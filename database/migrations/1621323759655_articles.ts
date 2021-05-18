import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Articles extends BaseSchema {
  protected tableName = 'articles';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.text('title').notNullable();
      table.text('picture_header');
      table.integer('stock');
      table.text('size');
      table.text('mention');
      table.text('overview');
      table.text('website_link');
      table.decimal('price', 5, 2);
      table.text('size_measure');
      table.text('weight_measure');
      table.timestamp('date_limit');
      table.boolean('article_completed').defaultTo(false);
      table.integer('brand_id');
      table.foreign('brand_id').references('id').inTable('brands').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
