"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const projectDescription = `
  This project is designed to ...
  `;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Nest API Project')
        .setDescription(projectDescription)
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
}
//# sourceMappingURL=setup.swagger.js.map