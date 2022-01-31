import {Lesson} from "./types/models";
import {LessonBuilder} from "./builders";
import {LessonsStorage} from "./storage";
import {pool} from "../db";

const lessonsStorage = LessonsStorage.getInstance();

export default class LessonService {
    async create(lessons: Lesson[] | void) {
        if(lessons) {
            let queryString: string = `INSERT INTO lesson (name, course, date, type) VALUES `;

            lessons.forEach((lesson, index, array) => {
                if(index === array.length - 1) {
                    queryString += `('${lesson.name}', '${lesson.course}', '${lesson.date}', '${lesson.type}') `;
                    return;
                }

                queryString += `('${lesson.name}', '${lesson.course}', '${lesson.date}', '${lesson.type}'), `;
            });

            queryString += 'RETURNING *;'

            const lessonsQueryResult = await pool.query(queryString);

            return lessonsQueryResult.rows;
        }
    }

    async getByUserId(id:number) {
        const lessons = await pool.query(`SELECT * from lesson where teacher_id = $1`, [id]);

        return lessons.rows;
    }

    async getAll() {
        const lessons = await pool.query(`SELECT * from lesson`);

        return lessons.rows;
    }

    async setTeacher(lessonId: number, teacherId: number) {
        const lesson = await pool.query(`UPDATE lesson set teacher_id = ${teacherId} where id = ${lessonId} RETURNING *`);

        return lesson.rows[0];
    }
}

export const lessonService = new LessonService();