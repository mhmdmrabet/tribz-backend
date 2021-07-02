import Token from 'App/Models/Token';

export const getTokenBySocialNetworkAndId = async (userId, socialNetwork) => {
  try {
    const token = await Token.query()
      .where('user_id', userId)
      .where('social_network', socialNetwork)
      .first();
    return token;
  } catch (error) {
    return error;
  }
};
