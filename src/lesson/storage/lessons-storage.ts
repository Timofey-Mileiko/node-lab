import {Lesson} from "../types/models";

export class LessonsStorage {
    private static instance: LessonsStorage;

    public static getInstance(): LessonsStorage {
        if(!LessonsStorage.instance){
            LessonsStorage.instance = new LessonsStorage();
        }

        return LessonsStorage.instance;
    }

    private lessons: Lesson[] = [];

    public addLesson(lesson: Lesson){
        this.lessons.push(lesson);
    }

    public changeLessonById(id: number, key: string, value: string | number) {
        const currentLesson: any = this.lessons.find(lesson => lesson.id === id);
        currentLesson[key] = value;
    }

    public deleteLessonById(id: number) {
        this.lessons = this.lessons.filter(lesson => lesson.id !== id);
    }

    public getLessons (): Lesson[] {
        return this.lessons;
    }
}