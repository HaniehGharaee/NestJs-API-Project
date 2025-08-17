
import { DocumentBuilder } from '@nestjs/swagger';

export const createSwaggerConfig = () => {
  const title = process.env.SWAGGER_TITLE || 'Pharmacy API';
  const description =
    process.env.SWAGGER_DESCRIPTION ||
    'API documentation for pharmacy online system';
  const version = process.env.SWAGGER_VERSION || '1.0';
  const path = process.env.SWAGGER_PATH || 'docs';

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token here',
      },
      'access-token', // name of the security scheme
    )
    .build();

  return { config, path };
};
