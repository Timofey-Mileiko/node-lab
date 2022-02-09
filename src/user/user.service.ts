import {UsersStorage} from "./storage";
import {administratorLevels} from "./types/enums";
import {User as UserEntity} from './entities'
import {getRepository} from "typeorm";

export default class UserService {
    storage: UsersStorage = UsersStorage.getInstance();

    async update(
        updateString: string,
        id: number,
        body: {[key: string]: string | number},
        allowedUpdates: string[]
    ): Promise<UserEntity> {
        const returningKeys = allowedUpdates.map((string) => {
            if(string === 'group') return `"${string}"`
            return string;
        });

        const userRepository = getRepository(UserEntity);
        const updatedUser = await userRepository.createQueryBuilder('user')
            .update(UserEntity)
            .set(body)
            .where("id = :id", { id })
            .returning(returningKeys)
            .execute();

        return updatedUser.raw;
    }

    async delete(id: number) {
        const userRepository = getRepository(UserEntity);
        await userRepository.createQueryBuilder('user').createQueryBuilder()
            .delete()
            .from(UserEntity)
            .where("id = :id", {id})
            .execute();
    }

    async createStudent(
        faculty: string,
        group: string,
        speciality: string,
        firstName: string,
        lastName: string,
        age: number,
        gender: string,
        role: string
    ): Promise<UserEntity> {
        const userRepository = getRepository(UserEntity);
        const createdUser = await userRepository.createQueryBuilder('user')
            .insert()
            .into(UserEntity)
            .values({firstName, lastName, age, gender, role, speciality, group, faculty})
            .returning(['firstName', 'lastName', 'age', 'gender', 'role', 'speciality', 'group', 'faculty'])
            .execute();

        return createdUser.raw;
    }

    async createTeacher(
        department: string,
        specialization: string,
        grade: string,
        firstName: string,
        lastName: string,
        age: number,
        gender: string,
        role: string
    ): Promise<UserEntity> {
        const userRepository = getRepository(UserEntity);
        const createdUser = await userRepository.createQueryBuilder('user')
            .insert()
            .into(UserEntity)
            .values({firstName, lastName, age, gender, role, department, specialization, grade})
            .returning(['firstName', 'lastName', 'age', 'gender', 'role', 'department', 'specialization', 'grade'])
            .execute();

        return createdUser.raw;
    }

    async createAdministrator(
        firstName: string,
        lastName: string,
        age: number,
        gender: string,
        administratorLevel: administratorLevels,
        role: string
    ): Promise<UserEntity> {
        const userRepository = getRepository(UserEntity);
        const createdUser = await userRepository.createQueryBuilder('user')
            .insert()
            .into(UserEntity)
            .values({firstName, lastName, age, gender, role, administratorLevel})
            .returning(['firstName', 'lastName', 'age', 'gender', 'role', 'department', 'specialization', 'grade'])
            .execute();

        return createdUser.raw;
    }

    async getAll(): Promise<UserEntity[]> {
        const userRepository = getRepository(UserEntity);
        return await userRepository.createQueryBuilder('user')
            .select()
            .where({})
            .getMany();
    }

    async getUserById(id:number): Promise<UserEntity[]> {
        const userRepository = getRepository(UserEntity);
        return await userRepository.createQueryBuilder('user')
            .select()
            .where("id = :id", {id})
            .getMany();
    }
}

export const userService = new UserService();