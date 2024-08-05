import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { format } from 'date-and-time';

import { StudentRepository } from './student.repository';
import { Student } from './entities/student.entity';
import { StudentDTO } from './dto/student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async findOne(id: string) {
    try {
      const studentDTO = await this.studentRepository.findOne(id);

      if (studentDTO) {
        return new Student(studentDTO);
      }

      return undefined;
    } catch (e) {
      throw e;
    }
  }

  async findByName(name: string) {
    try {
      const studentsDTO = await this.studentRepository.findByName(name);

      const students: Student[] = [];

      if (studentsDTO.length > 0) {
        studentsDTO.forEach((student) => {
          students.push(new Student(student));
        });
      }

      return students;
    } catch (e) {
      throw e;
    }
  }

  async create(studentDTO: StudentDTO) {
    try {
      const now = new Date();

      studentDTO.id = v4();
      studentDTO.createdAt = format(now, 'YYYY/MM/DD HH:mm:ss');
      studentDTO.updatedAt = format(now, 'YYYY/MM/DD HH:mm:ss');
      studentDTO.isDeleted = false;

      const addedStudentDTO = await this.studentRepository.create(studentDTO);

      return addedStudentDTO.id;
    } catch (e) {
      throw e;
    }
  }

  async remove(id: string) {
    try {
      return await this.studentRepository.remove(id);
    } catch (e) {
      throw e;
    }
  }
}
