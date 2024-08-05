import { CreateStudentDTO } from './create-student.dto';
import { StudentDTO, StudentDTOI } from './student.dto';

export const fromCreateStudentDTO = (dto: CreateStudentDTO): StudentDTO => {
  const basicStructure = {
    firstName: dto.firstName,
    lastName: dto.lastName,
    dateOfBirth: dto.dateOfBirth,
    gender: dto.gender,
    email: dto.email,
    phone: dto.phone,
    address: dto.address,
    enrollmentDate: dto.enrollmentDate,
    courses: dto.courses,
  };

  return new StudentDTO(basicStructure as StudentDTOI);
};
