import request from "supertest";
import app from "../../src/app";
import {pool} from "../../src/db";
import {setupDatabase} from "../fixtures/setup-database";

beforeEach(setupDatabase);

test('Should create user', async () => {
    const response = await request(app)
        .post('/user')
        .query({role: "Student"})
        .send({
            firstName: 'Tomas',
            lastName: 'Jerry',
            age: 27,
            gender: 'male',
            faculty: 'Electronic',
            group: '8.6a',
            speciality: 'Medicine'
        })
        .expect(201);

    const expectedUser = await pool.query(`SELECT firstname, lastname, age, gender, role, speciality, "group", faculty, id FROM "user" where id = ${response.body.id}`);

    expect(response.body).toMatchObject(expectedUser.rows[0]);
});

test('Should update user', async () => {
    const getResponse = await request(app)
        .get('/user/list')
        .expect(200);

    const testUser = getResponse.body[0];

    const patchResponse = await request(app)
        .patch('/user')
        .query({role: "Teacher", id: testUser.id})
        .send({
            age: 43,
        })
        .expect(200);

    const expectedUser = await pool.query(`SELECT age FROM "user" where id = ${patchResponse.body.id}`);

    expect(patchResponse.body).toMatchObject(expectedUser.rows[0])
});

test('Should delete user', async () => {
    const getResponse = await request(app)
        .get('/user/list')
        .expect(200);

    const testUser = getResponse.body[0];

    await request(app)
        .delete('/user')
        .query({id: testUser.id})
        .expect(200);

    const users = await pool.query(`SELECT * from "user"`);

    expect(users.rows.length).toEqual(0);
});

test('Should get users', async () => {
    const getResponse = await request(app)
        .get('/user/list')
        .expect(200);

    expect(getResponse.body.length).toEqual(1);
});