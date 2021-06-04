import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Article from 'App/Models/Article';
import User from 'App/Models/User';
import { DateTime } from 'luxon';

export default class OrdersController {
  /**
   * Récupère les orders d'un user
   * @returns []
   */
  public async userOrders() {
    const user = await User.findOrFail('e0a96603-71c3-4e50-9f25-d9e2e124cb74');
    await user.load('articles');

    const articles = user.articles;

    // === Création d'un tableau Orders pour afficher les commandes d'un utilisateur
    // Je boucle sur les articles que posséde l'utilisateur
    const orders = articles.map((order) => {
      // ==> J'essaye de trouver uniquement l'article de la commande
      let fullArticle = user.articles.find(
        (article) => article.id === order.$extras.pivot_article_id
      );

      // ==> Récupération uniquement des info qui nous intérésse
      const article = {
        id: fullArticle?.id,
        title: fullArticle?.title,
        price: fullArticle?.price,
      };

      // ==> Renvoi l'order formatter
      return {
        article,
        motivation: order.$extras.pivot_motivation,
        post: order.$extras.pivot_post,
        status: order.$extras.pivot_status,
      };
    });

    return orders;
  }

  public async store({ response, request }: HttpContextContract) {
    // === https://docs.adonisjs.com/reference/orm/relations/many-to-many#attach
    try {
      const user = await User.findOrFail('e0a96603-71c3-4e50-9f25-d9e2e124cb74');
      const { motivation, status, articleId } = request.body();
      const article = await Article.findOrFail(articleId);
      await user.related('articles').attach({
        [article.id]: {
          motivation,
          status,
        },
      });

      response.created();
    } catch (error) {
      let message = error;
      if (error.code === '23505') {
        message = 'Unique violation';
      }
      response.badRequest({ message });
    }
  }

  // ==> Detruit tout les rows de cette order ,
  // Ça ne doit pas poser problème car un un user n'a qu'un seul article
  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail('9126caff-2390-4b50-9086-f3bca3e9376a');
    await user.related('articles').query();
    await user.related('articles').detach([params.articleId]);

    return { message: 'Go to Data Base' };
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const { post, motivation, status } = request.body();
      const rows = await Database.from('article_user').where('id', 1).update(
        {
          status,
          motivation,
          post,
          updated_at: DateTime.now().toString(),
        },
        ['status', 'motivation', 'post', 'updated_at']
      );
      response.ok({ order: rows[0] });
    } catch (error) {
      response.badRequest({ error });
    }
  }
}
