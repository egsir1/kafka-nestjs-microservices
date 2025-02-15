import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { KafkaReplyTopic } from './kafka-reply.decorator';

export const replyTopics = [
  'course.create',
  'course.get-all',
  'course.get-by-id',
  'course.update',
  'course.delete',
];

@Controller('courses')
export class CourseController {
  constructor(
    @Inject('COURSE_SERVICE') private readonly courseClient: ClientKafka,
  ) {}

  @Post('create')
  @KafkaReplyTopic('course.create')
  createCourse(@Body() course: any) {
    return firstValueFrom(this.courseClient.send('course.create', course));
  }

  @Get()
  getAllCourses() {
    return firstValueFrom(this.courseClient.send('course.get-all', {}));
  }

  @Get(':id')
  getCourseById(@Param('id') id: string) {
    return firstValueFrom(this.courseClient.send('course.get-by-id', id));
  }

  @Put(':id')
  updateCourse(@Param('id') id: string, @Body() updates: Record<string, any>) {
    return firstValueFrom(
      this.courseClient.send('course.update', { id, updates }),
    );
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return firstValueFrom(this.courseClient.send('course.delete', id));
  }
}
