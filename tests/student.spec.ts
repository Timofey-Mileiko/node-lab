import {StudentBuilder} from "../src/user/builders";
import {Student} from "../src/user/types/users";

describe('Student', () => {
    let studentBuilder: StudentBuilder;

    beforeEach(() => {
        studentBuilder = new StudentBuilder();
    });

    it('Student has "Medicine" faculty.', () => {
        studentBuilder.addFaculty('Medicine');

        const student: Student = studentBuilder.build();

        expect(student.faculty).toBe('Medicine');
    });

    it('Student has "a8.14" group.', () => {
        studentBuilder.addGroup('a8.14');

        const student: Student = studentBuilder.build();

        expect(student.group).toBe('a8.14');
    });

    it('Student has "Doctor" specialization.', () => {
        studentBuilder.addSpeciality('Doctor');

        const student: Student = studentBuilder.build();

        expect(student.speciality).toBe('Doctor');
    });
});

