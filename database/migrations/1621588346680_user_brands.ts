import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserBrands extends BaseSchema {
  protected tableName = 'user_brand';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('user_id').unsigned().references('users.id');
      table.integer('brand_id').unsigned().references('brands.id');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
