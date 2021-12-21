/// <reference path="./storage/users-storage.ts" />
/// <reference path="./builder/student-builder.ts" />
/// <reference path="./builder/teacher-builder.ts" />
/// <reference path="./builder/administrator-builder.ts" />
/// <reference path="./users/administrator.ts" />
/// <reference path="./users/student.ts" />
/// <reference path="./users/teacher.ts" />

namespace Users {
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
        ) {
            const studentBuilder = new StudentBuilder();

            studentBuilder.addFaculty(faculty);
            studentBuilder.addGroup(group);
            studentBuilder.addSpeciality(speciality);
            studentBuilder.addFirstName(firstName);
            studentBuilder.addLastName(lastName);
            studentBuilder.addAge(age);
            studentBuilder.addGender(gender);

            const student = studentBuilder.createUser()

            this.storage.addUser(student);
        }

        addTeacher(
            department: string,
            specialization: string,
            grade: string,
            firstName: string,
            lastName: string,
            age: number,
            gender: string,
        ) {
            const teacherBuilder = new TeacherBuilder();

            teacherBuilder.addDepartment(department);
            teacherBuilder.addSpecialization(specialization);
            teacherBuilder.addGrade(grade);
            teacherBuilder.addFirstName(firstName);
            teacherBuilder.addLastName(lastName);
            teacherBuilder.addAge(age);
            teacherBuilder.addGender(gender);

            const teacher = teacherBuilder.createUser()

            this.storage.addUser(teacher);
        }

        addAdministrator(
            firstName: string,
            lastName: string,
            age: number,
            gender: string,
        ) {
            const administratorBuilder = new AdministratorBuilder();

            administratorBuilder.addFirstName(firstName);
            administratorBuilder.addLastName(lastName);
            administratorBuilder.addAge(age);
            administratorBuilder.addGender(gender);

            const administrator = administratorBuilder.createUser();

            this.storage.addUser(administrator);
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

    usersController.addAdministrator(
        'Ted',
        'Lasso',
        34,
        'male'
    );

    console.log(usersController.storage.getUsers());
}