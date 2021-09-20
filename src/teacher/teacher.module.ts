import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ValidStudentMiddleware } from '../common/middleware/validStudent.middleware';
import { StudentModule } from 'src/student/student.module';
import { StudentTeacherController } from './student.controller';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
    imports: [StudentModule],
    controllers: [TeacherController, StudentTeacherController],
    providers: [TeacherService]
})
export class TeacherModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidStudentMiddleware).forRoutes({
            path: 'students/:studentId',
            method: RequestMethod.GET
        });

        consumer.apply(ValidStudentMiddleware).forRoutes({
            path: 'students/:studentId',
            method: RequestMethod.PUT
        })
    }
}
