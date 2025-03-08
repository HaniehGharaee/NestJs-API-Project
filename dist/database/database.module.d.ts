import { OnModuleDestroy } from '@nestjs/common';
import { Connection } from 'mongoose';
export declare class DatabaseModule implements OnModuleDestroy {
    private readonly connection;
    constructor(connection: Connection);
    onModuleDestroy(): Promise<void>;
}
