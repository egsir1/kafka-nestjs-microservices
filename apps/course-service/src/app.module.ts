import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CourseController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COURSE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
          },
          consumer: {
            groupId: 'course-service-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [CourseController],
})
export class AppModule {}
