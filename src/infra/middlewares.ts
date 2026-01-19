import { errors } from "@vinejs/vine";
import type { Express, NextFunction,Request,Response } from "express";

export class Middlewares {

    constructor(private readonly app: Express) { }

    public registerMiddlewares() {
        this.app.use(this.errorHandler);
    }

    private errorHandler(
        err: unknown,
        _req: Request,
        res: Response,
        _next: NextFunction
    ): Response {
        if (err instanceof errors.E_VALIDATION_ERROR) {
            return res.status(422).json({
                errors: err.messages
            });
        }
        console.error(`unknown error > ${err}`)
        return res.status(500).json({
            error: 'Internal server error'
        });
    }

}