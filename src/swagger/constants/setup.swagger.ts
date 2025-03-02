import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app) {
  const projectDescription = `
  This project is designed to ...
  `;
  const config = new DocumentBuilder()
    .setTitle('Nest API Project')
    .setDescription(projectDescription)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
