import StudentBuilder from "../js/builder/student-builder";
import Student from "../js/users/student";
import TeacherBuilder from "../js/builder/teacher-builder";
import Teacher from "../js/users/teacher";
import AdministratorBuilder from "../js/builder/administrator-builder";
import Administrator from "../js/users/administrator";
import {administratorLevels} from "../js/types/types";
import UsersStorage from "../js/storage/users-storage";
import User from "../js/models/user";

describe('Administrator', () => {
    let studentBuilder: StudentBuilder;
    let teacherBuilder: TeacherBuilder;
    let administratorBuilder: AdministratorBuilder;

    let student: Student;
    let teacher: Teacher;
    let administrator: Administrator;

    let storage: UsersStorage

    beforeAll(() => {
        studentBuilder = new StudentBuilder();

        studentBuilder.addFaculty('Medicine');
        studentBuilder.addGroup('a8.14');
        studentBuilder.addSpeciality('Doctor');
        studentBuilder.addFirstName('Bob');
        studentBuilder.addLastName('Chan');
        studentBuilder.addAge(19);
        studentBuilder.addGender('male');

        student = studentBuilder.build();

        teacherBuilder = new TeacherBuilder();

        teacherBuilder.addDepartment('Health and Social Security');
        teacherBuilder.addSpecialization('Anesthesiology');
        teacherBuilder.addGrade('Teacher Training Centre');
        teacherBuilder.addFirstName('Tatyana');
        teacherBuilder.addLastName('Nepomniachtchiya');
        teacherBuilder.addAge(42);
        teacherBuilder.addGender('female');

        teacher = teacherBuilder.build();

        administratorBuilder = new AdministratorBuilder();

        administratorBuilder.addFirstName('Ted');
        administratorBuilder.addLastName('Lasso');
        administratorBuilder.addAge(34);
        administratorBuilder.addGender('male');
        administratorBuilder.addAdministratorLevel(administratorLevels.advanced);

        administrator = administratorBuilder.build();

        storage = new UsersStorage();
    });

    it(`has created all users types`, () => {

        const expectedStudent = {
            faculty: 'Medicine',
            group: 'a8.14',
            speciality: 'Doctor',
            firstName: 'Bob',
            lastName: 'Chan',
            age: 19,
            gender: 'male',
            role: 'Student'
        };

        const expectedTeacher = {
            department: 'Health and Social Security',
            specialization: 'Anesthesiology',
            grade: 'Teacher Training Centre',
            firstName: 'Tatyana',
            lastName: 'Nepomniachtchiya',
            age: 42,
            gender: 'female',
            role: 'Teacher'
        };

        const expectedAdministrator = {
            administratorLevel: administratorLevels.advanced,
            firstName: 'Ted',
            lastName: 'Lasso',
            age: 34,
            gender: 'male',
            role: 'Administrator'
        };

        expect(student).toMatchObject(expectedStudent);
        expect(teacher).toMatchObject(expectedTeacher);
        expect(administrator).toMatchObject(expectedAdministrator);
    });

    it('has written users in store', () => {
        storage.addUser(administrator);
        storage.addUser(student);
        storage.addUser(teacher);

        expect(storage.getUsers()).toEqual([administrator, student, teacher]);
    });

    it('has change users in store', () => {
        const oldStorage = JSON.parse(JSON.stringify(storage.getUsers()));

        expect(oldStorage).toEqual(storage.getUsers());

        storage.changeUserById(administrator.id, 'age', 78);

        expect(oldStorage).not.toEqual(storage.getUsers());

        const oldAdministrator = oldStorage.find((el: User) => el.id === administrator.id);

        expect(oldAdministrator.age).not.toEqual(administrator.id);
    });

    it('has deleted users from store', () => {
        const oldStorage = JSON.parse(JSON.stringify(storage.getUsers()));

        expect(oldStorage.length).toEqual(storage.getUsers().length);

        storage.deleteUserById(administrator.id);

        expect(oldStorage.length).not.toEqual(storage.getUsers().length);
    });
});

