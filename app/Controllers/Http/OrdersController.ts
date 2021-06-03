import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Article from 'App/Models/Article';
import User from 'App/Models/User';

export default class OrdersController {
  public async userOrders() {
    const user = await User.findOrFail('99eac339-d753-4298-9811-5048440d0123');
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
    const user = await User.findOrFail('99eac339-d753-4298-9811-5048440d0123');
    const { motivation, status, articleId } = request.body();
    const article = await Article.findOrFail(articleId);
    await user.related('articles').attach({
      [article.id]: {
        motivation,
        status,
      },
    });

    response.created();
  }
}
