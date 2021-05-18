import Factory from '@ioc:Adonis/Lucid/Factory';
import Brand from 'App/Models/Brand';

export const BrandFactory = Factory.define(Brand, ({ faker }) => {
  return {
    title: 'Zara',
    subtitle: 'prêt-à-porter',
    description: faker.lorem.paragraphs(2),
    logo: faker.lorem.word(1),
  };
}).build();
