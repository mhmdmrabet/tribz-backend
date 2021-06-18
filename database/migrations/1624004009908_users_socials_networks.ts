import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UsersSocialsNetworks extends BaseSchema {
  protected tableName = 'users_socials_networks';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('user_id').unsigned().references('users.id').notNullable();
      table.text('token').notNullable();
      table.timestamp('expires_in');
      table.text('social_network').defaultTo('instagram');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
