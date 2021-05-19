import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Brand from 'App/Models/Brand';

export default class BrandSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'id';
    await Brand.updateOrCreateMany(uniqueKey, [
      {
        title: 'Zara',
        subtitle: 'Prêt-à-porter',
        description:
          "Zara SA, stylized as ZARA, is a Spanish apparel retailer based in Arteixo (A Coruña) in Galicia, Spain. The company specializes in fast fashion, and products include clothing, accessories, shoes, swimwear, beauty, and perfumes. It is the largest company in the Inditex group, the world's largest apparel retailer. Zara as of 2017 manages up to 20 clothing collections a year.",
        logo: 'zara',
      },
      {
        title: 'Bialetti',
        subtitle: 'Spécialiste de la cafetière italienne',
        description:
          "Alfonso Bialetti était un ingénieur italien devenu célèbre pour l'invention de la cafetière Moka Express . Conçue en 1933, la cafetière est une icône de style depuis les années 1950. Alors que de nombreuses variantes du Moka ont été développées, y compris le Mukka Express imprimé de vache Bialetti (qui fait du cappuccino ), le Moka Express est un classique séculaire. Bialetti a également été le fondateur de Bialetti Industries , la société italienne désormais géante d'articles de cuisine.",
        logo: 'bialetti',
      },
    ]);
  }
}
