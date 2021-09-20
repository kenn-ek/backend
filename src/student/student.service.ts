import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { students } from 'src/db';
import { CreateStudentDto, FindStudentResponseDto, StudentResponseDto, UpdateStudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
    private students = students

    getStudents(): FindStudentResponseDto[] {
        return this.students
    }

    getStudentById(studentId: string): FindStudentResponseDto {
        return this.students.find(student => {
            return student.id === studentId
        })
    }

    createStudent(payload: CreateStudentDto): StudentResponseDto {
        let newStudent = {
            id: uuid(),
            ...payload
        }

        this.students.push(newStudent);
        return newStudent;
    }

    updateStudent(payload: UpdateStudentDto, studentId: string): StudentResponseDto {
        let updateStudent: StudentResponseDto;

        const updateStudentList = this.students.map(student => {
            if (student.id === studentId) {
                updateStudent = {
                    id: student.id,
                    ...payload
                }
                return updateStudent;
            }
            else return student
        })

        this.students = updateStudentList;
        return updateStudent;
    }


    getStudentsByTeacherId(teacherId: string): FindStudentResponseDto[] {
        return students.filter(students => {
            return students.teacher === teacherId
        })
    }

    updateStudentTeacher(teacherId: string, studentId: string): StudentResponseDto {
        let updateStudent: StudentResponseDto;

        const updateStudentList = this.students.map(student => {
            if (student.id === studentId) {
                updateStudent = {
                    ...student,
                    teacher: teacherId
                }
                return updateStudent;
            }
            else return student
        })

        this.students = updateStudentList;
        return updateStudent;
    }

}
