import {Lesson} from "./types/models";
import {LessonBuilder} from "./builders";
import {LessonsStorage} from "./storage";

const lessonsStorage = LessonsStorage.getInstance();

export default class LessonService {
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