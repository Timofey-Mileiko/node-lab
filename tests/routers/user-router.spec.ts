import request from "supertest";
import app from "../../src/app";
import {UsersStorage} from "../../src/user/storage";

const usersStorage = UsersStorage.getInstance()

beforeEach(async () => {
    usersStorage.clearStorage();

    await request(app)
        .post('/user')
        .query({role: "Teacher"})
        .send({
            department: 'Health and Social Security',
            specialization: 'Anesthesiology',
            grade: 'Teacher Training Centre',
            gender: 'female',
            firstName: 'Tatyana',
            lastName: 'Nepomniachtchiya',
            age: 42
        });
})

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

    expect(response.body).toMatchObject({
        firstName: 'Tomas',
        lastName: 'Jerry',
        role: 'Student',
        age: 27,
        gender: 'male',
        faculty: 'Electronic',
        group: '8.6a',
        speciality: 'Medicine'
    })
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

    expect(patchResponse.body).toMatchObject({
        age: 43,
    })
});

test('Should delete user', async () => {
    const getResponse = await request(app)
        .get('/user/list')
        .expect(200);

    const testUser = getResponse.body[0];

    const patchResponse = await request(app)
        .delete('/user')
        .query({id: testUser.id})
        .expect(200);

    const users = usersStorage.getUsers()

    expect(users.length).toEqual(0)
});