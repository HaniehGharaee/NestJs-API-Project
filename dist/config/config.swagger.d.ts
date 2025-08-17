export declare const createSwaggerConfig: () => {
    config: Omit<import("@nestjs/swagger").OpenAPIObject, "paths">;
    path: string;
};
