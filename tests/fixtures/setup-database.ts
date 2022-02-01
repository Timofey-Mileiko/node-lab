import {pool} from "../../src/db";

export const setupDatabase = async () => {
    await pool.query(`DELETE
                      from lesson`);
    await pool.query(`DELETE
                      from "user"`);

    await pool.query(`INSERT INTO "user" (department, specialization, grade, gender, firstName, lastName, age)
                      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
            'Health and Social Security',
            'Anesthesiology',
            'Teacher Training Centre',
            'female',
            'Tatyana',
            'Nepomniachtchiya',
            42
        ]);
}