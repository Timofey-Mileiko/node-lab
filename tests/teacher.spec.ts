import {TeacherBuilder} from "../src/user/builders";
import {Teacher} from "../src/user/types/users";

describe('Teacher', () => {
    let teacherBuilder: TeacherBuilder;

    beforeEach(() => {
        teacherBuilder = new TeacherBuilder();
    });

    it('Teacher has "Teacher Training Centre" grade.', () => {
        teacherBuilder.addGrade('Teacher Training Centre');

        const teacher: Teacher = teacherBuilder.build();

        expect(teacher.grade).toBe('Teacher Training Centre');
    });

    it('Teacher has "Health and Social Security" department.', () => {
        teacherBuilder.addDepartment('Health and Social Security');

        const teacher: Teacher = teacherBuilder.build();

        expect(teacher.department).toBe('Health and Social Security');
    });

    it('Teacher has "Anesthesiology" specialization.', () => {
        teacherBuilder.addSpecialization('Anesthesiology');

        const teacher: Teacher = teacherBuilder.build();

        expect(teacher.specialization).toBe('Anesthesiology');
    });
});
