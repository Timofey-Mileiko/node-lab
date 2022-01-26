import request from 'supertest';
import app from "../src/app";
import expectedData from "./expected-data/lessons";
import {LessonsStorage} from "../src/lesson/storage";

test('Should create lessons from uploaded csv file', async () => {
    await request(app)
        .post('/lesson/upload')
        .attach('file', 'tests/fixtures/lessons.csv')
        .expect(200);

    const lessonsStorage = LessonsStorage.getInstance();
    expect(lessonsStorage.getLessons()).toEqual(expectedData);
});