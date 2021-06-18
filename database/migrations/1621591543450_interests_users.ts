import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class InterestsUsers extends BaseSchema {
  protected tableName = 'interests_users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('user_id').unsigned().references('users.id').onDelete('CASCADE');
      table.integer('interest_id').unsigned().references('interests.id').onDelete('CASCADE');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
