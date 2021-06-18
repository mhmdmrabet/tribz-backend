import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserBrands extends BaseSchema {
  protected tableName = 'user_brand';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('user_id').unsigned().references('users.id').onDelete('CASCADE');
      table.integer('brand_id').unsigned().references('brands.id').onDelete('CASCADE');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
