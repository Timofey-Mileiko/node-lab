import {AdministratorBuilder, StudentBuilder, TeacherBuilder} from "../src/user/builders";
import {Administrator, Student, Teacher} from "../src/user/types/users";

describe('Common users fields', () => {
    let administratorBuilder: AdministratorBuilder;
    let studentBuilder: StudentBuilder;
    let teacherBuilder: TeacherBuilder;

    beforeEach(() => {
        administratorBuilder = new AdministratorBuilder();
        studentBuilder = new StudentBuilder();
        teacherBuilder = new TeacherBuilder();
    });

    it(`Users have first names.`, () => {
        administratorBuilder.addFirstName('Ted');
        studentBuilder.addFirstName('Bob');
        teacherBuilder.addFirstName('Tatyana');

        const administrator: Administrator = administratorBuilder.build();
        const student: Student = studentBuilder.build();
        const teacher: Teacher = teacherBuilder.build();

        expect(administrator.firstName).toBe('Ted');
        expect(student.firstName).toBe('Bob');
        expect(teacher.firstName).toBe('Tatyana');
    });

    it(`Users have last names.`, () => {
        administratorBuilder.addLastName('Lasso');
        studentBuilder.addLastName('Chan');
        teacherBuilder.addLastName('Nepomniachtchiya');

        const administrator: Administrator = administratorBuilder.build();
        const student: Student = studentBuilder.build();
        const teacher: Teacher = teacherBuilder.build();

        expect(administrator.lastName).toBe('Lasso');
        expect(student.lastName).toBe('Chan');
        expect(teacher.lastName).toBe('Nepomniachtchiya');
    });

    it(`Users have age.`, () => {
        administratorBuilder.addAge(34);
        studentBuilder.addAge(35);
        teacherBuilder.addAge(45);

        const administrator: Administrator = administratorBuilder.build();
        const student: Student = studentBuilder.build();
        const teacher: Teacher = teacherBuilder.build();

        expect(administrator.age).toBe(34);
        expect(student.age).toBe(35);
        expect(teacher.age).toBe(45);
    });

    it(`Users have gender.`, () => {
        administratorBuilder.addGender('male');
        studentBuilder.addGender('male');
        teacherBuilder.addGender('female');

        const administrator: Administrator = administratorBuilder.build();
        const student: Student = studentBuilder.build();
        const teacher: Teacher = teacherBuilder.build();

        expect(administrator.gender).toBe('male');
        expect(student.gender).toBe('male');
        expect(teacher.gender).toBe('female');
    });

    it(`Users have type.`, () => {
        const administrator: Administrator = administratorBuilder.build();
        const student: Student = studentBuilder.build();
        const teacher: Teacher = teacherBuilder.build();

        expect(administrator.role).toBe('Administrator');
        expect(student.role).toBe('Student');
        expect(teacher.role).toBe('Teacher');
    });
});

