export interface StudentDTOI {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  enrollmentDate: string;
  courses: string[];
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export class StudentDTO implements StudentDTOI {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  enrollmentDate: string;
  courses: string[];
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;

  constructor(obj: StudentDTOI) {
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.dateOfBirth = obj.dateOfBirth;
    this.gender = obj.gender;
    this.email = obj.email;
    this.phone = obj.phone;
    this.address = obj.address;
    this.enrollmentDate = obj.enrollmentDate;
    this.courses = obj.courses;
    this.createdAt = obj.createdAt;
    this.updatedAt = obj.updatedAt;
    this.isDeleted = obj.isDeleted;
  }
}
