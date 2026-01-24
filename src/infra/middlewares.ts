import { errors } from "@vinejs/vine";
import { AxiosError } from "axios";
import type { Express, NextFunction, Request, Response } from "express";

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
        if (err instanceof AxiosError) {
            console.error(`AXIOS ERROR > ${err}`)

            return res.status(err.status!).json();
        }
        console.error(`unknown error > ${err}`)
        return res.status(500).json({
            error: 'Internal server error'
        });
    }

}