import Lesson from "../models/lesson";
import Teacher from "../users/teacher";

export default class LessonBuilder {
    private lesson: Lesson = new Lesson();

    constructor() {
        this.lesson.id = Math.floor(Math.random() * 101);
    }

    public addTeacher(teacher: Teacher){
        this.lesson.teacher = teacher;
    }

    public addSubject(subject: string) {
        this.lesson.subject = subject;
    }

    public addTime(time: string) {
        this.lesson.time = time;
    }

    public addClassroom(classroom: string) {
        this.lesson.classroom = classroom;
    }

    public build(): Lesson {
        return this.lesson;
    }
}