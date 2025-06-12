import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error', code: 5000 };

    const message = typeof responseBody === 'string' ? responseBody : (responseBody as any).message;

    const code = typeof responseBody === 'string' ? status : ((responseBody as any).code ?? status);

    response.status(status).json({
      success: false,
      statusCode: status,
      code,
      message: message || '알 수 없는 오류가 발생했습니다.',
      timestamp: new Date().toISOString(),
    });
  }
}
