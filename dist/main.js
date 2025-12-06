"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const config_swagger_1 = require("./config/config.swagger");
const common_1 = require("@nestjs/common");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    console.log('MongoDB URI:', configService.get('MONGODB_URI'));
    const nodeEnv = configService.get('nodeEnv');
    if (nodeEnv === 'development') {
        const { config, path } = (0, config_swagger_1.createSwaggerConfig)();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup(path, app, document);
    }
    app.enableCors({
        origin: 'http://localhost:3001',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionFilter());
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/#/`);
}
bootstrap();
//# sourceMappingURL=main.js.map