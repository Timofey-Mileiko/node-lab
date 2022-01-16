import request from 'supertest';
import app from "../src/app";
import LessonsStorage from "../js/storage/lessons-storage";
import expectedData from "./expected-data/lessons";

test('Should create lessons from uploaded csv file', async () => {
    await request(app)
        .post('/lesson/upload')
        .attach('file', 'tests/fixtures/lessons.csv')
        .expect(200);

    const lessonsStorage = LessonsStorage.getInstance();
    expect(lessonsStorage.getLessons()).toEqual(expectedData);
});