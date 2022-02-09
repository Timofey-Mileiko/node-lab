import {getRepository} from "typeorm";
import {Lesson as LessonEntity} from './entities';
import {User as UserEntity} from "../user/entities";

export default class LessonService {
    async create(lessons: LessonEntity[]): Promise<LessonEntity> {
        const lessonRepository = getRepository(LessonEntity);
        const createdLessons = await lessonRepository.createQueryBuilder('lesson')
            .insert()
            .into(LessonEntity)
            .values(lessons)
            .returning(['id', 'name', 'type', 'course', 'date', 'teacher_id', ])
            .execute();
        return createdLessons.raw;
    }

    async getByUserId(id:number) {
        const lessonRepository = getRepository(LessonEntity);
        return await lessonRepository.createQueryBuilder('lesson')
            .select()
            .where("id = :id", {id})
            .getOne();
    }

    async getAll() {
        const lessonRepository = getRepository(LessonEntity);
        return await lessonRepository.createQueryBuilder('lesson')
            .select()
            .where({})
            .getMany();
    }

    async setTeacher(lessonId: number, teacherId: number) {
        const lessonRepository = getRepository(LessonEntity);
        const userRepository = getRepository(UserEntity);
        const teacher = await userRepository.findOne({id: teacherId, role: 'Teacher'});

        await lessonRepository.createQueryBuilder('lesson')
            .relation(LessonEntity, "teacher")
            .of(lessonId)
            .set(teacher);

    }
}

export const lessonService = new LessonService();