import {AdministratorBuilder, StudentBuilder, TeacherBuilder} from "./builders";
import {UsersStorage} from "./storage";
import {administratorLevels} from "./types/enums";
import {Administrator, Student, Teacher} from "./types/users";
import {User} from "./types/models";
import {pool} from "../db";

export default class UserService {
    storage: UsersStorage = UsersStorage.getInstance();

    async update(
        updateString: string,
        id: number,
        body: {[key: string]: string | number},
        allowedUpdates: string[]
    ) {
        const returningKeys = allowedUpdates.map((string) => {
            if(string === 'group') return `"${string}"`
            return string;
        });

        const user = await pool.query(`UPDATE "user" set ${updateString} RETURNING ${returningKeys}, id`, [...Object.values(body), id])

        return user.rows[0];
    }

    async delete(id: number) {
        const users = await pool.query('DELETE FROM "user" where id = $1', [id]);
        return users.rows;
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
    ): Promise<Student> {
        const createdUser = await pool.query(`INSERT INTO "user" (firstname, lastname, age, gender, role, speciality, "group", faculty)
                           values ($1, $2, $3, $4, $5, $6, $7, $8)
                           RETURNING firstname, lastname, age, gender, role, speciality, "group", faculty, id`,
            [
                firstName,
                lastName,
                age,
                gender,
                role,
                speciality,
                group,
                faculty
            ]);

         return createdUser.rows[0];
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
    ): Promise<Teacher> {
        const createdUser = await pool.query(`INSERT INTO "user" (firstname, lastname, age, gender, role, department, specialization, grade)
                           values ($1, $2, $3, $4, $5, $6, $7, $8)
                           RETURNING firstname, lastname, age, gender, role, department, specialization, grade, id`,
            [
                firstName,
                lastName,
                age,
                gender,
                role,
                department,
                specialization,
                grade
            ]);

        return createdUser.rows[0];
    }

    async createAdministrator(
        firstName: string,
        lastName: string,
        age: number,
        gender: string,
        administratorLevel: administratorLevels,
        role: string
    ): Promise<Administrator> {
        const createdUser = await pool.query(`INSERT INTO "user" (firstname, lastname, age, gender, role, administratorLevel)
                           values ($1, $2, $3, $4, $5, $6)
                           RETURNING firstname, lastname, age, gender, role, administratorLevel, id`,
            [
                firstName,
                lastName,
                age,
                gender,
                role,
                administratorLevel
            ]
        );

        return createdUser.rows[0];
    }

    async getAll(): Promise<User[]> {
        const users = await pool.query('SELECT * FROM "user"');
        return users.rows;
    }

    async getUserById(id:number) {
        const users = await pool.query('SELECT * FROM "user" where id = $1', [id]);

        return users.rows[0]
    }
}

export const userService = new UserService();