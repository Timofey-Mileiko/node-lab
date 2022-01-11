import UsersStorage from "./storage/users-storage";
import StudentBuilder from "./builder/student-builder";
import Student from "./users/student";
import Teacher from "./users/teacher";
import Administrator from "./users/administrator";
import TeacherBuilder from "./builder/teacher-builder";
import {administratorLevels} from "./types/types";
import AdministratorBuilder from "./builder/administrator-builder";

class UsersCRUD {
    storage: UsersStorage

    constructor() {
        this.storage = UsersStorage.getInstance();
    }

    addStudent(
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

        return student
    }

    addTeacher(
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

        return teacher
    }

    addAdministrator(
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

        return administrator;
    }

    changeUserById(id: number, key: string, value: number | string) {
        this.storage.changeUserById(id, key, value);

    }

    deleteUserById(id: number) {
        this.storage.deleteUserById(id);
    }
}

const usersController = new  UsersCRUD();

usersController.addStudent(
    'Medicine',
    'a8.14',
    'Doctor',
    'Bob',
    'Chan',
    19,
    'male'
);

usersController.addTeacher(
    'Health and Social Security',
    'Anesthesiology',
    'Teacher Training Centre',
    'Tatyana',
    'Nepomniachtchiya',
    42,
    'female'
);

const administratorUser = usersController.addAdministrator(
    'Ted',
    'Lasso',
    34,
    'male',
    administratorLevels.advanced
);

console.log(usersController.storage.getUsers());

usersController.changeUserById(administratorUser.id, 'age', 35);

console.log(usersController.storage.getUsers());

usersController.deleteUserById(administratorUser.id);

console.log(usersController.storage.getUsers());

const  iterator = usersController.storage.createIterator();

while(iterator.hasNext()) {
    if(iterator.current().role === `Teacher`) {
        console.log(`${iterator.current().firstName} ${iterator.current().lastName}`);
    }

    iterator.next();
}