import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ArticleUser extends BaseSchema {
  protected tableName = 'article_user';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.uuid('user_id').unsigned().references('users.id').onDelete('CASCADE');
      table.integer('article_id').unsigned().references('articles.id').onDelete('CASCADE');
      table.text('status').defaultTo('pending');
      table.text('motivation');
      table.boolean('post').defaultTo(false);
      table.timestamps(true);
      table.unique(['article_id', 'user_id']);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
