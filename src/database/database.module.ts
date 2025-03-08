import { Module, OnModuleDestroy, Inject } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        const dbName = configService.get<string>('MONGODB_DBNAME');
        const username = configService.get<string>('mongodb.username');
        const password = configService.get<string>('mongodb.password');

        // Check if the necessary configurations (uri and dbName) are present
        if (!uri) {
          throw new Error('MongoDB URI is required');
        }
        if (!dbName) {
          throw new Error('MongoDB database name is required');
        }

        // Setup connection options
        const connectionOptions: any = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName,
        };

        // Add authentication options if username and password are provided
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

            // Returning the connection object for use by MongooseModule
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(
    @Inject(getConnectionToken()) private readonly connection: Connection,
  ) {}

  async onModuleDestroy() {
    await this.connection.close();
  }
}
