import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Article from 'App/Models/Article';

export default class ArticleSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const uniqueKey = 'id';

    await Article.updateOrCreateMany(uniqueKey, []);
  }
}
