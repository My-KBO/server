import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BusinessException } from '../exceptions/business.exception';
import { ErrorCode } from '../constants/error-code';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code: string = ErrorCode.INTERNAL_SERVER_ERROR;
    let message = '서버 내부 오류';

    if (exception instanceof BusinessException) {
      code = exception.code;
      message = exception.message;

      switch (code) {
        case ErrorCode.USER_NOT_FOUND:
          status = HttpStatus.NOT_FOUND;
          break;
        case ErrorCode.EMAIL_ALREADY_EXISTS:
          status = HttpStatus.CONFLICT;
          break;
        default:
          status = HttpStatus.BAD_REQUEST;
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      message = typeof response === 'string' ? response : (response as any).message;
    }

    res.status(status).json({
      success: false,
      statusCode: status,
      code,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
