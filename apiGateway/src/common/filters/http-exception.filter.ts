import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { error, timeStamp } from "console";
import path from "path";

@Catch()
export class AllExceptionFilter implements ExceptionFilter{
    private readonly logger= new Logger(AllExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx= host.switchToHttp();
        const res= ctx.getResponse();
        const req= ctx.getRequest();

        const status= exception instanceof HttpException? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const msg = exception instanceof HttpException ? exception.getResponse(): exception;

        this.logger.error(`Status ${status} Error: ${JSON.stringify(msg)}`)

        res.status(status).json({
            timeStamp: new Date().toISOString(),
            path: req.url,
            error: msg,
        })
    }

}