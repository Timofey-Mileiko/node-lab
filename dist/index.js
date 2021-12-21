"use strict";
//<reference path="../types/types.ts">
var Users;
(function (Users) {
    class UsersStorage {
        constructor() {
            this.users = [];
        }
        static getInstance() {
            if (!UsersStorage.instance) {
                UsersStorage.instance = new UsersStorage();
            }
            return UsersStorage.instance;
        }
        addUser(user) {
            this.users.push(user);
        }
        changeUserById(id, key, value) {
            const currentUser = this.users.filter(user => user.id === id)[0];
            currentUser[key] = value;
            this.users = this.users.filter(user => user.id !== id);
            this.users.push(currentUser);
        }
        deleteUserById(id) {
            this.users.filter(user => user.id !== id);
        }
        getUsers() {
            return this.users;
        }
    }
    Users.UsersStorage = UsersStorage;
})(Users || (Users = {}));
/// <reference path="./a-user-builder.model.ts">
var Users;
(function (Users) {
    class StudentBuilderModel extends Users.UserBuilderModel {
        addFaculty(faculty) { }
        addGroup(group) { }
        addSpeciality(speciality) { }
    }
    Users.StudentBuilderModel = StudentBuilderModel;
})(Users || (Users = {}));
/// <reference path="./a-user-builder.model.ts" />
var Users;
(function (Users) {
    class UserModel {
        constructor(builder) {
            this.id = Math.floor(Math.random() * 1000) + 1;
            this.firstName = builder.firstName;
            this.lastName = builder.lastName;
            this.age = builder.age;
            this.gender = builder.gender;
            this.role = builder.role;
        }
    }
    Users.UserModel = UserModel;
})(Users || (Users = {}));
/// <reference path="../models/user.model.ts" />
/// <reference path="../models/student-builder.model.ts" />
var Users;
(function (Users) {
    class Student extends Users.UserModel {
        constructor(builder) {
            super(builder);
            this.faculty = builder.faculty;
            this.group = builder.group;
            this.speciality = builder.speciality;
        }
    }
    Users.Student = Student;
})(Users || (Users = {}));
/// <reference path="../models/student-builder.model.ts" />
/// <reference path="../users/student.ts" />
var Users;
(function (Users) {
    class StudentBuilder extends Users.StudentBuilderModel {
        constructor() {
            super();
            this.role = 'Student';
        }
        addFaculty(faculty) {
            this.faculty = faculty;
            return this;
        }
        addGroup(group) {
            this.group = group;
            return this;
        }
        addSpeciality(speciality) {
            this.speciality = speciality;
            return this;
        }
        createUser() {
            return new Users.Student(this);
        }
    }
    Users.StudentBuilder = StudentBuilder;
})(Users || (Users = {}));
// <reference path="./a-user-builder.model.ts">
var Users;
(function (Users) {
    // @ts-ignore
    class TeacherBuilderModel extends Users.UserBuilderModel {
        addGrade(grade) { }
        addSpecialization(specialization) { }
        addDepartment(department) { }
    }
    Users.TeacherBuilderModel = TeacherBuilderModel;
})(Users || (Users = {}));
/// <reference path="../models/user.model.ts" />
/// <reference path="../models/teacher-builder.model.ts" />
var Users;
(function (Users) {
    class Teacher extends Users.UserModel {
        constructor(builder) {
            super(builder);
            this.grade = builder.grade;
            this.specialization = builder.specialization;
            this.department = builder.department;
        }
    }
    Users.Teacher = Teacher;
})(Users || (Users = {}));
/// <reference path="../models/teacher-builder.model.ts" />
/// <reference path="../users/teacher.ts" />
var Users;
(function (Users) {
    class TeacherBuilder extends Users.TeacherBuilderModel {
        constructor() {
            super();
            this.role = 'Teacher';
        }
        addGrade(grade) {
            this.grade = grade;
            return this;
        }
        addSpecialization(specialization) {
            this.specialization = specialization;
            return this;
        }
        addDepartment(department) {
            this.department = department;
            return this;
        }
        createUser() {
            return new Users.Teacher(this);
        }
    }
    Users.TeacherBuilder = TeacherBuilder;
})(Users || (Users = {}));
// <reference path="./a-user-builder.model.ts">
// <reference path="./types/types.ts">
var Users;
(function (Users) {
    class AdministratorBuilderModel extends Users.UserBuilderModel {
        addAdministratorLevel(administratorLevel) { }
    }
    Users.AdministratorBuilderModel = AdministratorBuilderModel;
})(Users || (Users = {}));
/// <reference path="../models/user.model.ts" />
/// <reference path="../models/administrator-builder.model.ts" />
// <reference path="./types/types.ts">
var Users;
(function (Users) {
    class Administrator extends Users.UserModel {
        constructor(builder) {
            super(builder);
            this.administratorLevel = builder.administratorLevel;
        }
        changeUserById(id, key, value) {
            if (this.administratorLevel === Users.administratorLevels.advanced ||
                this.administratorLevel === Users.administratorLevels.basic) {
                const usersStorage = Users.UsersStorage.getInstance();
                usersStorage.changeUserById(id, key, value);
            }
            else {
                console.log(`you can't do this`);
            }
        }
        deleteUserById(id) {
            if (this.administratorLevel === Users.administratorLevels.advanced) {
                const usersStorage = Users.UsersStorage.getInstance();
                usersStorage.deleteUserById(id);
            }
            else {
                console.log(`you can't do this`);
            }
        }
    }
    Users.Administrator = Administrator;
})(Users || (Users = {}));
/// <reference path="../models/administrator-builder.model.ts" />
/// <reference path="../users/administrator.ts" />
// <reference path="./types/types.ts">
var Users;
(function (Users) {
    class AdministratorBuilder extends Users.AdministratorBuilderModel {
        constructor() {
            super();
            this.role = 'Administrator';
        }
        addAdministratorLevel(administratorLevel) {
            this.administratorLevel = administratorLevel;
            return this;
        }
        createUser() {
            return new Users.Administrator(this);
        }
    }
    Users.AdministratorBuilder = AdministratorBuilder;
})(Users || (Users = {}));
/// <reference path="./storage/users-storage.ts" />
/// <reference path="./builder/student-builder.ts" />
/// <reference path="./builder/teacher-builder.ts" />
/// <reference path="./builder/administrator-builder.ts" />
/// <reference path="./users/administrator.ts" />
/// <reference path="./users/student.ts" />
/// <reference path="./users/teacher.ts" />
var Users;
(function (Users) {
    class UsersCRUD {
        constructor() {
            this.storage = Users.UsersStorage.getInstance();
        }
        addStudent(faculty, group, speciality, firstName, lastName, age, gender) {
            const studentBuilder = new Users.StudentBuilder();
            studentBuilder.addFaculty(faculty);
            studentBuilder.addGroup(group);
            studentBuilder.addSpeciality(speciality);
            studentBuilder.addFirstName(firstName);
            studentBuilder.addLastName(lastName);
            studentBuilder.addAge(age);
            studentBuilder.addGender(gender);
            const student = studentBuilder.createUser();
            this.storage.addUser(student);
        }
        addTeacher(department, specialization, grade, firstName, lastName, age, gender) {
            const teacherBuilder = new Users.TeacherBuilder();
            teacherBuilder.addDepartment(department);
            teacherBuilder.addSpecialization(specialization);
            teacherBuilder.addGrade(grade);
            teacherBuilder.addFirstName(firstName);
            teacherBuilder.addLastName(lastName);
            teacherBuilder.addAge(age);
            teacherBuilder.addGender(gender);
            const teacher = teacherBuilder.createUser();
            this.storage.addUser(teacher);
        }
        addAdministrator(firstName, lastName, age, gender) {
            const administratorBuilder = new Users.AdministratorBuilder();
            administratorBuilder.addFirstName(firstName);
            administratorBuilder.addLastName(lastName);
            administratorBuilder.addAge(age);
            administratorBuilder.addGender(gender);
            const administrator = administratorBuilder.createUser();
            this.storage.addUser(administrator);
        }
    }
    const usersController = new UsersCRUD();
    usersController.addStudent('Medicine', 'a8.14', 'Doctor', 'Bob', 'Chan', 19, 'male');
    usersController.addTeacher('Health and Social Security', 'Anesthesiology', 'Teacher Training Centre', 'Tatyana', 'Nepomniachtchiya', 42, 'female');
    usersController.addAdministrator('Ted', 'Lasso', 34, 'male');
    console.log(usersController.storage.getUsers());
})(Users || (Users = {}));
var Users;
(function (Users) {
    class UserBuilderModel {
        createUser() { }
        addFirstName(firstName) {
            this.firstName = firstName;
        }
        addLastName(lastName) {
            this.lastName = lastName;
        }
        addAge(age) {
            this.age = age;
        }
        addGender(gender) {
            this.gender = gender;
        }
    }
    Users.UserBuilderModel = UserBuilderModel;
})(Users || (Users = {}));
//<reference path="../users/student">
//<reference path="../users/teacher">
//<reference path="../users/administrator">
var Users;
(function (Users) {
    let administratorLevels;
    (function (administratorLevels) {
        administratorLevels[administratorLevels["basic"] = 0] = "basic";
        administratorLevels[administratorLevels["advanced"] = 1] = "advanced";
    })(administratorLevels = Users.administratorLevels || (Users.administratorLevels = {}));
})(Users || (Users = {}));
