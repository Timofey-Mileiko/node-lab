import LessonBuilder from "../js/builder/lesson-builder";
import Lesson from "../js/models/lesson";
import Teacher from "../js/users/teacher";

describe('Lesson', () => {
    let lessonBuilder: LessonBuilder;
    let teacher: Teacher;

    beforeEach(() => {
        lessonBuilder = new LessonBuilder();
        teacher = new Teacher();
    });

    it('Lesson has "a401" classroom.', () => {
        lessonBuilder.addClassroom('a401');

        const lesson: Lesson = lessonBuilder.build();

        expect(lesson.classroom).toBe('a401');
    });

    it('Lesson has right teacher.', () => {
        lessonBuilder.addTeacher(teacher);

        const lesson: Lesson = lessonBuilder.build();

        expect(lesson.teacher).toBe(teacher);
    });

    it('Lesson has "Chemistry" subject.', () => {
        lessonBuilder.addSubject('Chemistry');

        const lesson: Lesson = lessonBuilder.build();

        expect(lesson.subject).toBe('Chemistry');
    });

    it('Lesson has "15:00" time.', () => {
        lessonBuilder.addTime('15:00');

        const lesson: Lesson = lessonBuilder.build();

        expect(lesson.time).toBe('15:00');
    });
});

