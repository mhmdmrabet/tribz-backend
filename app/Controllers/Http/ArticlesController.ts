import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Article from 'App/Models/Article';
import Brand from 'App/Models/Brand';
import CreateArticleValidator from 'App/Validators/CreateArticleValidator';

export default class ArticlesController {
  public async index() {
    const articles = await Article.all();
    return articles;
  }

  public async show({ params }) {
    const article = await Article.findOrFail(params.id);
    await article.load('picturesArticles');
    await article.load('brand');
    return article;
  }

  public async store({ request }: HttpContextContract) {
    const brandId = request.input('brandId');
    const brand = await Brand.findOrFail(brandId);
    const payload = await request.validate(CreateArticleValidator);
    const article = await brand.related('articles').create(payload);
    return article;
  }

  public async update({ request, params, response }: HttpContextContract) {
    const article = await Article.findOrFail(params.id);
    const payload = await request.validate(CreateArticleValidator);
    await article.merge(payload).save();
    response.noContent();
  }

  public async destroy({ params, response }: HttpContextContract) {
    const article = await Article.findOrFail(params.id);
    await article.delete();
    response.noContent();
  }
}
