export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  nodeEnv: process.env.nodeEnv,
  jwt: {
    secret: process.env.JWT_SECRET || 'default_jwt_secret',
    expiresIn: process.env.JWT_EXPIRES || '20m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
  },
  seed: {
    categoryDrug: {
      doc: 'Enable drug category seed',
      format: Boolean,
      default: process.env.ENABLE_DRUG_CATEGORY_SEED,
    },
  },
});
