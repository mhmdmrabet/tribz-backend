import Factory from '@ioc:Adonis/Lucid/Factory';
import Article from 'App/Models/Article';
import Brand from 'App/Models/Brand';
import Interest from 'App/Models/Interest';
import User from 'App/Models/User';

export const UserFactory = Factory.define(User, () => {
  return {
    email: 'mohamed@tanke.fr',
    password: 'mohamedpwd',
    role: 'admin',
    firstName: 'Mohamed',
    country: 'France',
  };
}).build();

export const ArticleFactory = Factory.define(Article, () => {
  return {
    title: 'Robe',
    stock: 12,
    price: 39.99,
  };
})
  .relation('brand', () => BrandFactory)
  .build();

export const BrandFactory = Factory.define(Brand, () => {
  return {
    title: 'Zara',
    subtitle: 'prêt-à-porter',
    description: 'Marque internationnal du groupe Inditex',
    logo: 'zara',
  };
})
  .relation('articles', () => ArticleFactory)
  .build();

export const InterestFactory = Factory.define(Interest, () => {
  return {
    name: 'Mode',
  };
}).build();
