import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import PictureArticle from 'App/Models/PictureArticle';
import CreatePictureValidator from 'App/Validators/CreatePictureValidator';

export default class PicturesArticlesController {
  public async index() {
    const pictures = await PictureArticle.all();
    return pictures;
  }

  public async show({ params }: HttpContextContract) {
    const picture = await PictureArticle.findOrFail(params.id);
    return picture;
  }

  public async store({ response, request }: HttpContextContract) {
    const payload = await request.validate(CreatePictureValidator);
    const picture = await PictureArticle.create(payload);
    response.created(picture);
  }

  public async update({ params, request }: HttpContextContract) {
    const picture = await PictureArticle.findOrFail(params.id);
    await picture.merge(request.body()).save();
    return picture;
  }

  public async destroy({ params, response }: HttpContextContract) {
    const picture = await PictureArticle.findOrFail(params.id);
    await picture.delete();
    if (picture.$isDeleted) {
      response.ok({ message: 'Picture deleted', success: true });
    } else {
      response.badRequest();
    }
  }
}
