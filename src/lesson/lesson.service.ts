import Lesson from "../../js/models/lesson";
import LessonBuilder from "../../js/builders/lesson-builder";
import LessonsStorage from "../../js/storage/lessons-storage";

const lessonsStorage = LessonsStorage.getInstance();

export default class LessonService {
    private readonly users: Lesson[] = []

    create(lessons: Lesson[] | void) {

        if(lessons) {
            lessons.forEach((lesson) => {
                const lessonBuilder = new LessonBuilder();

                lessonBuilder.addCourse(lesson.course);
                lessonBuilder.addDate(lesson.date);
                lessonBuilder.addName(lesson.name);
                lessonBuilder.addType(lesson.type);

                lessonsStorage.addLesson(lessonBuilder.build());
            })
        }
    }

    getAll() {
        return lessonsStorage.getLessons();
    }
}

export const lessonService = new LessonService();