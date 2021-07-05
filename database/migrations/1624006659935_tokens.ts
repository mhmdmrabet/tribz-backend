import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Tokens extends BaseSchema {
  protected tableName = 'tokens';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('user_id').unsigned().references('users.id').notNullable().onDelete('CASCADE');
      table.text('facebook_user_id');
      table.text('token').notNullable();
      table.timestamp('expires_in');
      table.text('social_network').defaultTo('facebook');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
