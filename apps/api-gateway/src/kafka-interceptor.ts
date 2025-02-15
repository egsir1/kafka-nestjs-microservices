import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class KafkaReplyInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    if (!handler) {
      return next.handle();
    }

    const topic = this.reflector.get<string>('kafka-reply-topic', handler);

    if (topic) {
      console.log(`Kafka Reply Topic from Interceptor: ${topic}`);
    }

    return next.handle();
  }
}
