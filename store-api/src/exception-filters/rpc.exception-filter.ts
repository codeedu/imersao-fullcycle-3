import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { status } from 'grpc';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    console.error(exception);

    const code =
      typeof exception.getError() === 'object'
        ? (exception.getError() as any).code
        : -1;

    let statusError;

    switch (code) {
      case status.FAILED_PRECONDITION:
        statusError = 422;
        break;
      default:
        statusError = 400;
    }

    return response.status(statusError).json({
      message: exception.message,
    });
  }
}
