import StudentBuilder from "../js/builder/student-builder";
import Student from "../js/users/student";

describe('Student', () => {
    let studentBuilder: StudentBuilder;

    beforeEach(() => {
        studentBuilder = new StudentBuilder();
    });

    it('Student has "Medicine" faculty.', () => {
        studentBuilder.addFaculty('Medicine');

        const teacher: Student = studentBuilder.build();

        expect(teacher.faculty).toBe('Medicine');
    });

    it('Student has "a8.14" group.', () => {
        studentBuilder.addGroup('a8.14');

        const teacher: Student = studentBuilder.build();

        expect(teacher.group).toBe('a8.14');
    });

    it('Student has "Doctor" specialization.', () => {
        studentBuilder.addSpeciality('Doctor');

        const teacher: Student = studentBuilder.build();

        expect(teacher.speciality).toBe('Doctor');
    });
});

