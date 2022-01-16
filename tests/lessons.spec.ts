import LessonBuilder from "../js/builders/lesson-builder";
import Lesson from "../js/models/lesson";

describe('Lesson', () => {
    let lessonBuilder: LessonBuilder;

    beforeEach(() => {
        lessonBuilder = new LessonBuilder();
    });

    it('Lesson has "a401" classroom.', () => {
        lessonBuilder.addName('Chemistry');

        const lesson: Lesson = lessonBuilder.build();

        expect(lesson.name).toBe('Chemistry');
    });

    it('Lesson has right teacher.', () => {
        lessonBuilder.addCourse('Medicine');

        const lesson: Lesson = lessonBuilder.build();

        expect(lesson.course).toBe('Medicine');
    });

    it('Lesson has "Chemistry" subject.', () => {
        lessonBuilder.addType('lecture');

        const lesson: Lesson = lessonBuilder.build();

        expect(lesson.type).toBe('lecture');
    });

    it('Lesson has "15:00" time.', () => {
        lessonBuilder.addDate('01/12/2022');

        const lesson: Lesson = lessonBuilder.build();

        expect(lesson.date).toBe('01/12/2022');
    });
});

