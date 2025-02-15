import { SetMetadata } from '@nestjs/common';
export const KafkaReplyTopic = (topic: string) =>
  SetMetadata('kafka-reply-topic', topic);
