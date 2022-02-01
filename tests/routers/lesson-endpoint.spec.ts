import request from 'supertest';
import app from "../../src/app";
import expectedData from "../expected-data/lessons";
import {setupDatabase} from "../fixtures/setup-database";
import {pool} from "../../src/db";

beforeEach(async () => {
    await setupDatabase()
    await request(app)
        .post('/lesson/upload')
        .attach('file', 'tests/fixtures/lessons.csv')
        .expect(201);
});

test('Should create lessons from uploaded csv file', async () => {
    const lessons = await pool.query(`SELECT * from lesson`)

    expect(lessons.rows).toEqual(expectedData);
});

test('Should get lessons', async () => {
    const result = await request(app)
        .get('/lesson/list')
        .expect(200);


    const lessons = await pool.query(`SELECT * from lesson`)

    expect(result.body).toEqual(lessons.rows);
});

test('Should set up teacher ', async () => {
    const lessons = await pool.query(`SELECT * from lesson`);
    const user = await pool.query(`SELECT * from "user"`);

    await request(app)
        .patch('/lesson/set-teacher')
        .send({
            lessonId: lessons.rows[0].id,
            teacherId: user.rows[0].id
        })
        .expect(200);

    const changedLessons = await pool.query(`SELECT * from lesson where id = ${lessons.rows[0].id}`);

    expect(changedLessons.rows[0].teacher_id).toEqual(user.rows[0].id);
});