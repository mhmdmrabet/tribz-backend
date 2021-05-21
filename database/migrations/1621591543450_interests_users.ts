import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class InterestsUsers extends BaseSchema {
  protected tableName = 'interests_users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.uuid('user_id').unsigned().references('users.id');
      table.integer('interest_id').unsigned().references('interest.id');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
