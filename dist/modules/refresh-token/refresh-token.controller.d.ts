import { RefreshTokenService } from './refresh-token.service';
import { Request, Response } from 'express';
export declare class RefreshTokenController {
    private readonly refreshTokenService;
    constructor(refreshTokenService: RefreshTokenService);
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    validate(body: {
        token: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    rotate(body: {
        oldToken: string;
    }, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
