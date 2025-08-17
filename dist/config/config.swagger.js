"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSwaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const createSwaggerConfig = () => {
    const title = process.env.SWAGGER_TITLE || 'Pharmacy API';
    const description = process.env.SWAGGER_DESCRIPTION ||
        'API documentation for pharmacy online system';
    const version = process.env.SWAGGER_VERSION || '1.0';
    const path = process.env.SWAGGER_PATH || 'docs';
    const config = new swagger_1.DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion(version)
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token here',
    }, 'access-token')
        .build();
    return { config, path };
};
exports.createSwaggerConfig = createSwaggerConfig;
//# sourceMappingURL=config.swagger.js.map