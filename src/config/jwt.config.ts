export default () => ({
  jwt: {
    accessTokenExpiresIn: '3h',
    refreshTokenExpiresIn: '7d',
    secret: process.env.JWT_SECRET || 'defaultSecretKey',
  },
});
