import LessonBuilder from "../js/builder/lesson-builder";
import Teacher from "../js/users/teacher";
import Lesson from "../js/models/lesson";
import TeacherBuilder from "../js/builder/teacher-builder";
import LessonsStorage from "../js/storage/lessons-storage";
import User from "../js/models/user";

describe('Lesson', () => {
    let firstLessonBuilder: LessonBuilder;
    let secondLessonBuilder: LessonBuilder;
    let firstLesson: Lesson;
    let secondLesson: Lesson;
    let firstTeacher: Teacher;
    let secondTeacher: Teacher;
    let firstTeacherBuilder: TeacherBuilder;
    let secondTeacherBuilder: TeacherBuilder;
    let storage: LessonsStorage;

    beforeEach(() => {
        firstTeacherBuilder = new TeacherBuilder();

        firstTeacherBuilder.addDepartment('Health and Social Security');
        firstTeacherBuilder.addSpecialization('Anesthesiology');
        firstTeacherBuilder.addGrade('Teacher Training Centre');
        firstTeacherBuilder.addFirstName('Tatyana');
        firstTeacherBuilder.addLastName('Nepomniachtchiya');
        firstTeacherBuilder.addAge(42);
        firstTeacherBuilder.addGender('female');

        secondTeacherBuilder = new TeacherBuilder();

        secondTeacherBuilder.addDepartment('Colon and rectal surgeon');
        secondTeacherBuilder.addSpecialization('Cardiologist');
        secondTeacherBuilder.addGrade('Dnipro Medical Institute');
        secondTeacherBuilder.addFirstName('Pauline');
        secondTeacherBuilder.addLastName('Johnson');
        secondTeacherBuilder.addAge(45);
        secondTeacherBuilder.addGender('female');

        firstTeacher = firstTeacherBuilder.build();
        secondTeacher = secondTeacherBuilder.build();

        firstLessonBuilder = new LessonBuilder();
        secondLessonBuilder = new LessonBuilder();


        firstLessonBuilder.addTeacher(firstTeacher);
        firstLessonBuilder.addTime('16:45');
        firstLessonBuilder.addSubject('Chemistry');
        firstLessonBuilder.addClassroom('302b');

        secondLessonBuilder.addTeacher(secondTeacher);
        secondLessonBuilder.addTime('16:35');
        secondLessonBuilder.addSubject('Chemistry');
        secondLessonBuilder.addClassroom('302b');

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

        storage.changeLessonById(firstLesson.id, 'time', '12:00');

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