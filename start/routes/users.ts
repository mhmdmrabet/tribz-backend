import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.group(() => {
    Route.get('', async () => {
      return { message: 'Users Route' };
    });
  }).prefix('/users');
}).prefix('/api');
