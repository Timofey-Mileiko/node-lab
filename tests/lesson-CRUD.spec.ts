import {LessonBuilder} from "../src/lesson/builders";
import {Lesson} from "../src/lesson/types/models";
import {LessonsStorage} from "../src/lesson/storage";

describe('Lesson', () => {
    let firstLessonBuilder: LessonBuilder;
    let secondLessonBuilder: LessonBuilder;
    let firstLesson: Lesson;
    let secondLesson: Lesson;
    let storage: LessonsStorage;

    beforeEach(() => {
        firstLessonBuilder = new LessonBuilder();
        secondLessonBuilder = new LessonBuilder();

        firstLessonBuilder.addName('Chemistry');
        firstLessonBuilder.addCourse('Medicine');
        firstLessonBuilder.addType('lecture');
        firstLessonBuilder.addDate('01/12/2022');

        secondLessonBuilder.addName('Math');
        secondLessonBuilder.addCourse('Programming');
        secondLessonBuilder.addType('workshop');
        secondLessonBuilder.addDate('02/12/2022');

        firstLesson = firstLessonBuilder.build();
        secondLesson = secondLessonBuilder.build();

        storage = new LessonsStorage();
    });

    it('Lesson has added to storage.', () => {
        storage.addLesson(firstLesson);
        storage.addLesson(secondLesson);

        expect(storage.getLessons()).toEqual([firstLesson, secondLesson]);
    });

    it('has changed lesson in store', () => {
        storage.addLesson(firstLesson);

        const oldLesson = JSON.parse(JSON.stringify(firstLesson));

        expect(oldLesson).toMatchObject(storage.getLessons()[0]);

        storage.changeLessonById(firstLesson.id, 'date', '04/12/2022');

        expect(oldLesson).not.toMatchObject(storage.getLessons()[0]);
    });

    it('Lesson has deleted.', () => {
        storage.addLesson(firstLesson);
        storage.addLesson(secondLesson);

        expect(storage.getLessons().length).toBe(2);

        storage.deleteLessonById(firstLesson.id)

        expect(storage.getLessons().length).toBe(1);
    });
});