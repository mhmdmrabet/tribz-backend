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
  public async userOrders({ auth, response }: HttpContextContract) {
    const id = await auth.user?.id;
    const user = await User.findOrFail(id);
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
        id: fullArticle!.id,
        title: fullArticle!.title,
        price: fullArticle!.price,
      };

      // ==> Renvoi l'order formatter
      return {
        article,
        motivation: order.$extras.pivot_motivation,
        post: order.$extras.pivot_post,
        status: order.$extras.pivot_status,
      };
    });

    // == Si le user n'a pas d'order
    if (!orders.length) {
      return response.ok({
        data: orders,
        message: 'This user has no pending order',
        success: true,
      });
    }

    return { data: orders, success: true };
  }

  public async store({ response, request, auth }: HttpContextContract) {
    // === https://docs.adonisjs.com/reference/orm/relations/many-to-many#attach
    try {
      const id = await auth.user!.id;
      const user = await User.findOrFail(id);
      const { motivation, status, articleId } = request.body();
      const article = await Article.findOrFail(articleId);
      await user.related('articles').attach({
        [article.id]: {
          motivation,
          status,
        },
      });

      return response.created({ message: 'Orders has been registred', success: true });
    } catch (error) {
      let message = error;
      if (error.code === '23505') {
        message = 'Unique violation';
      }
      return response.badRequest({ message, success: false });
    }
  }

  // ==> Detruit tout les rows de cette order ,
  // Ça ne doit pas poser problème car un un user n'a qu'un seul article
  // https://docs.adonisjs.com/reference/orm/relations/many-to-many#detach
  public async destroy({ params, auth }: HttpContextContract) {
    const userId = await auth.user?.id;
    const user = await User.findOrFail(userId);
    // == Remove the relationship from the pivot table
    await user.related('articles').detach([params.articleId]);

    return { message: 'The order has been deleted', success: true };
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { post, motivation, status } = request.body();
      const rows: Promise<any> = await Database.from('article_user')
        .where('id', params.id)
        .update(
          {
            status,
            motivation,
            post,
            updated_at: DateTime.now().toSQL(),
          },
          // Column to returns
          ['status', 'motivation', 'post', 'updated_at']
        )
        .first();
      return response.ok({ order: rows, success: true });
    } catch (error) {
      return response.badRequest({ message: error, success: false });
    }
  }

  public async index() {
    try {
      const rows = await Database.from('article_user')
        .join('users', 'users.id', '=', 'article_user.user_id')
        .join('articles', 'articles.id', '=', 'article_user.article_id')
        .select('article_user.id as orderId')
        .select('users.first_name as firstName')
        .select('users.last_name as lastName')
        .select('articles.title')
        .select('articles.price')
        .select('article_user.status')
        .select('article_user.motivation')
        .select('article_user.post');

      return { orders: rows, success: true };
    } catch (error) {
      return { message: error, success: false };
    }
  }
}
