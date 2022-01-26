import {AdministratorBuilder, StudentBuilder, TeacherBuilder} from "./builders";
import {UsersStorage} from "./storage";
import {administratorLevels} from "./types/enums";
import {Administrator, Student, Teacher} from "./types/users";
import {User} from "./types/models";

export default class UserService {
    storage: UsersStorage = UsersStorage.getInstance();

    update(id: number, key: string, value: number | string): User{
        return this.storage.changeUserById(id, key, value);
    }


    delete(id: number) {
        this.storage.deleteUserById(id);
    }

    createStudent(
        faculty: string,
        group: string,
        speciality: string,
        firstName: string,
        lastName: string,
        age: number,
        gender: string,
    ): Student {
        const studentBuilder = new StudentBuilder();

        studentBuilder.addFaculty(faculty);
        studentBuilder.addGroup(group);
        studentBuilder.addSpeciality(speciality);
        studentBuilder.addFirstName(firstName);
        studentBuilder.addLastName(lastName);
        studentBuilder.addAge(age);
        studentBuilder.addGender(gender);

        const student = studentBuilder.build()

        this.storage.addUser(student);

        return student;
    }

    createTeacher(
        department: string,
        specialization: string,
        grade: string,
        firstName: string,
        lastName: string,
        age: number,
        gender: string,
    ): Teacher {
        const teacherBuilder = new TeacherBuilder();

        teacherBuilder.addDepartment(department);
        teacherBuilder.addSpecialization(specialization);
        teacherBuilder.addGrade(grade);
        teacherBuilder.addFirstName(firstName);
        teacherBuilder.addLastName(lastName);
        teacherBuilder.addAge(age);
        teacherBuilder.addGender(gender);

        const teacher = teacherBuilder.build()

        this.storage.addUser(teacher);

        return teacher;
    }

    createAdministrator(
        firstName: string,
        lastName: string,
        age: number,
        gender: string,
        administratorLevel: administratorLevels
    ): Administrator {
        const administratorBuilder = new AdministratorBuilder();

        administratorBuilder.addFirstName(firstName);
        administratorBuilder.addLastName(lastName);
        administratorBuilder.addAge(age);
        administratorBuilder.addGender(gender);
        administratorBuilder.addAdministratorLevel(administratorLevel);

        const administrator = administratorBuilder.build();

        this.storage.addUser(administrator);

        return administrator
    }

    getAll(): User[]{
        return this.storage.getUsers();
    }
}

export const userService = new UserService();