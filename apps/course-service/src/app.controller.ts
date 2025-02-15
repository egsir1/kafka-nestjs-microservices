import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { of } from 'rxjs';

@Controller()
export class CourseController {
  constructor() {}

  @MessagePattern('course.create')
  handleCreateCourse(@Payload() course: any) {
    return of({ message: 'Course' });
  }

  @MessagePattern('course.get-all')
  handleGetAllCourses() {
    return of({ message: 'Course' });
  }

  @MessagePattern('course.get-by-id')
  handleGetCourseById(@Payload() id: string) {
    return of({ message: 'Course' });
  }

  @MessagePattern('course.update')
  handleUpdateCourse(@Payload() { id, updates }: { id: string; updates: any }) {
    return of({ message: 'Course' });
  }

  @MessagePattern('course.delete')
  handleDeleteCourse(@Payload() id: string) {
    return of({ message: 'Course' });
  }
}
