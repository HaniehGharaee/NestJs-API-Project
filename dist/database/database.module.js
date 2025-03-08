"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const mongoose_2 = require("mongoose");
let DatabaseModule = class DatabaseModule {
    constructor(connection) {
        this.connection = connection;
    }
    async onModuleDestroy() {
        await this.connection.close();
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService) => {
                    const uri = configService.get('MONGODB_URI');
                    const dbName = configService.get('MONGODB_DBNAME');
                    const username = configService.get('mongodb.username');
                    const password = configService.get('mongodb.password');
                    if (!uri) {
                        throw new Error('MongoDB URI is required');
                    }
                    if (!dbName) {
                        throw new Error('MongoDB database name is required');
                    }
                    const connectionOptions = {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        dbName,
                    };
                    if (username && password) {
                        connectionOptions.auth = { username, password };
                    }
                    return {
                        uri,
                        ...connectionOptions,
                        connectionFactory: (connection) => {
                            connection.on('connected', () => {
                                console.log('MongoDB connected');
                            });
                            connection.on('disconnected', () => {
                                console.log('MongoDB disconnected');
                            });
                            connection.on('error', (error) => {
                                console.error('MongoDB connection error:', error);
                            });
                            return connection;
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        exports: [mongoose_1.MongooseModule],
    }),
    __param(0, (0, common_1.Inject)((0, mongoose_1.getConnectionToken)())),
    __metadata("design:paramtypes", [mongoose_2.Connection])
], DatabaseModule);
//# sourceMappingURL=database.module.js.map