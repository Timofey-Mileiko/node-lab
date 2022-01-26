import { Lesson } from "../types/models";

export class LessonBuilder {
    private lesson: Lesson = new Lesson();

    constructor() {
        this.lesson.id = Math.floor(Math.random() * 101);
    }

    public addName(name: string){
        this.lesson.name = name;
    }

    public addCourse(course: string) {
        this.lesson.course = course;
    }

    public addDate(date: string) {
        this.lesson.date = date;
    }

    public addType(type: string) {
        this.lesson.type = type;
    }

    public build(): Lesson {
        return this.lesson;
    }
}