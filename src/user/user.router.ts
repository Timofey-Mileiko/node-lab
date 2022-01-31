import {Router} from "express";
import {NamedRouter} from "../common/types/tuples";
import {userService} from "./user.service";
import {updateUser} from "./utils";
import {User} from "./types/models";

const router = Router();

router.get('/list', async (req, res) => {
    try{
        const users = await userService.getAll();

        res.send(users);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const user = await userService.getUserById(Number(id));

        res.json(user);
    }catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }
});

router.post('/', async (req, res) => {
    const {role} = req.query;

    const {firstName = '', lastName = '', age = 0, gender = ''} = req.body;

    try{
        switch (role) {
            case 'Administrator':
                const {administratorLevel = 0} = req.body;

                const administrator = await userService.createAdministrator(firstName,lastName,age,gender,administratorLevel, role);

                res.status(201).json(administrator);

                break;
            case 'Student':
                const {faculty = '', group = '', speciality = ''} = req.body;

                const student = await userService.createStudent(faculty, group, speciality, firstName, lastName, age, gender, role);

                res.status(201).json(student);

                break;
            case 'Teacher':
                const {department='', specialization='', grade=''} = req.body;

                const teacher = await userService.createTeacher(department, specialization, grade, firstName, lastName, age, gender, role);

                res.status(201).json(teacher);

                break;
            default:
                res.status(404).json({message: 'Something went wrong'});
        }
    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'})
    }

});

router.patch('/', async (req, res) => {
    const {id, role} = req.query;
    const allowedUpdates = ['firstName', 'lastName', 'age', 'gender'];
    const updates = Object.keys(req.body);

    if(typeof id === "undefined"){
        res.status(400).json({message: 'ID is required'});
        return;
    }

    const idTypeNumber = +id;
    let updatedUser: User;
    let updateUserString: string | void;

    try{
        switch (role) {
            case 'Administrator':
                allowedUpdates.push('administratorLevel');

                updateUserString = updateUser(
                    updates,
                    allowedUpdates,
                    res
                );

                if(!updateUserString) return;

                updatedUser = await userService.update(updateUserString, idTypeNumber, req.body, allowedUpdates);

                res.json(updatedUser);

                break;
            case 'Student':
                allowedUpdates.push('faculty', 'group', 'speciality');

                updateUserString = updateUser(
                    updates,
                    allowedUpdates,
                    res
                );

                if(!updateUserString) return;

                updatedUser = await userService.update(updateUserString, idTypeNumber, req.body, allowedUpdates);

                res.json(updatedUser);

                break;
            case 'Teacher':
                allowedUpdates.push('department', 'specialization', 'grade');

                updateUserString = updateUser(
                    updates,
                    allowedUpdates,
                    res
                );

                if(!updateUserString) return;

                updatedUser = await userService.update(updateUserString, idTypeNumber, req.body, allowedUpdates);

                res.json(updatedUser);

                break;
            default:
                res.status(404).json({message: 'Something went wrong'});
        }
    } catch (e) {
        res.status(500).json({message: 'Something went wrong...'});
    }
});

router.delete('/', async (req, res) => {
    const {id} = req.query;

    if(typeof id === "undefined"){
        res.status(400).json({message: 'ID is required'});
        return;
    }

    const idTypeNumber = + id;

    try{
        await userService.delete(idTypeNumber);

        res.json({message: `User with id ${id} was deleted`})
    }catch (e) {
        res.status(500).json({message: 'Something went wrong...'});
    }
});

export const UserRouter: NamedRouter = ['/user', router]