import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClientKafka,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { replyTopics as authReplyTopics } from './auth.controller';
import { replyTopics as courseReplyTopics } from './course.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
      },
      consumer: {
        groupId: 'api-gateway-consumer',
      },
    },
  });

  await app.startAllMicroservices();

  const authKafka = app.get<ClientKafka>('AUTH_SERVICE');
  const courseKafka = app.get<ClientKafka>('COURSE_SERVICE');

  const allReplyTopics = [...authReplyTopics, ...courseReplyTopics];

  allReplyTopics.forEach((topic) => {
    authKafka.subscribeToResponseOf(topic);
    // authKafka.subscribeToResponseOf(`${topic}.reply`);

    courseKafka.subscribeToResponseOf(topic);
    // courseKafka.subscribeToResponseOf(`${topic}.reply`);
  });
  console.log(
    `********** Subscribed to Kafka reply topics: ${allReplyTopics.join(', ')}`,
  );

  // Connect the client so that it is ready before first request
  await authKafka.connect();
  await courseKafka.connect();

  await app.listen(3000);
  console.log('Gateway is running on http://localhost:3000');
}

bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});
