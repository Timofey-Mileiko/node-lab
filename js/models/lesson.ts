import Teacher from "../users/teacher";

export default class Lesson {
    public subject: string;
    public teacher: Teacher;
    public time: string;
    public classroom: string;
    id: number;
}