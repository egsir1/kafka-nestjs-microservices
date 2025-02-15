import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { KafkaReplyInterceptor } from './kafka-interceptor';
import { CourseController } from './course.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'payment-consumer',
          },
        },
      },
      {
        name: 'COURSE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'course-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AuthController, AppController, CourseController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: KafkaReplyInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
