import {Router} from "express";
import {NamedRouter} from "../common/types/tuples";
import {userService} from "./user.service";
import {updateUser} from "./utils";

const router = Router();

router.get('/list', (req, res) => {
    res.send(userService.getAll());
});

router.post('/', (req, res) => {
    const {role} = req.query;

    const {firstName = '', lastName = '', age = 0, gender = ''} = req.body;

    switch (role) {
        case 'Administrator':
            const {administratorLevel = 0} = req.body;

            const administrator = userService.createAdministrator(firstName,lastName,age,gender,administratorLevel);

            res.status(201).json(administrator);

            break;
        case 'Student':
            const {faculty = '', group = '', speciality = ''} = req.body;

            const student = userService.createStudent(faculty, group, speciality, firstName, lastName, age, gender);

            res.status(201).json(student);

            break;
        case 'Teacher':
            const {department='', specialization='', grade=''} = req.body;

            const teacher = userService.createTeacher(department, specialization, grade, firstName, lastName, age, gender);

            res.status(201).json(teacher);

            break;
        default:
            res.status(404).json({message: 'Something went wrong'});
    }
});

router.patch('/', (req, res) => {
    const {id, role} = req.query;
    const allowedUpdates = ['firstName', 'lastName', 'age', 'gender'];
    const updates = Object.keys(req.body);

    if(typeof id === "undefined"){
        res.status(400).json({message: 'ID is required'});
        return;
    }

    const idTypeNumber = +id;
    let updatedUser;

    switch (role) {
        case 'Administrator':
            allowedUpdates.push('administratorLevel');

            updatedUser = updateUser(
                updates,
                allowedUpdates,
                res,
                idTypeNumber,
                req
            );

            res.json(updatedUser);

            break;
        case 'Student':
            allowedUpdates.push('faculty', 'group', 'speciality');

            updatedUser = updateUser(
                updates,
                allowedUpdates,
                res,
                idTypeNumber,
                req
            );

            res.json(updatedUser);

            break;
        case 'Teacher':
            allowedUpdates.push('department', 'specialization', 'grade');

            updatedUser = updateUser(
                updates,
                allowedUpdates,
                res,
                idTypeNumber,
                req
            );

            res.json(updatedUser);

            break;
        default:
            res.status(404).json({message: 'Something went wrong'});
    }
});

router.delete('/', (req, res) => {
    const {id} = req.query;

    if(typeof id === "undefined"){
        res.status(400).json({message: 'ID is required'});
        return;
    }

    const idTypeNumber = + id;

    userService.delete(idTypeNumber);

    res.json({message: `User with id ${id} was deleted`})
});

export const UserRouter: NamedRouter = ['/user', router]