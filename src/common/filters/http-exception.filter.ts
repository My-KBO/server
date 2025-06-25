import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BusinessException } from '../exceptions/business.exception';
import { ErrorCode } from '../constants/error/error-code';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = ErrorCode.INTERNAL_SERVER_ERROR;
    let message = '서버 내부 오류';

    // 비즈니스 예외 처리
    if (exception instanceof BusinessException) {
      code = exception.code;
      message = exception.message;
      status = this.mapErrorCodeToStatus(code);

      // HttpException 처리
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();

      // 메시지가 string | string[] | object 형태로 나올 수 있음
      if (typeof response === 'string') {
        message = response;
      } else if (Array.isArray((response as any).message)) {
        message = (response as any).message.join(', ');
      } else {
        message = (response as any).message || message;
      }
    }

    res.status(status).json({
      success: false,
      statusCode: status,
      code,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  private mapErrorCodeToStatus(code: string): number {
    switch (code) {
      case ErrorCode.User.USER_NOT_FOUND:
      case ErrorCode.Post.POST_NOT_FOUND:
      case ErrorCode.Comment.COMMENT_NOT_FOUND:
        return HttpStatus.NOT_FOUND;

      case ErrorCode.User.EMAIL_ALREADY_EXISTS:
      case ErrorCode.Post.POST_ALREADY_LIKED:
      case ErrorCode.Comment.COMMENT_ALREADY_LIKED:
        return HttpStatus.CONFLICT;

      case ErrorCode.UNAUTHORIZED_ACTION:
        return HttpStatus.UNAUTHORIZED;

      default:
        return HttpStatus.BAD_REQUEST;
    }
  }
}
