import { Router } from 'express'
import { NamedRouter } from '../common/types/tuples'
import {lessonService} from './lesson.service';
import fs from 'fs';
import CsvFilesReader from "../common/csv-files-reader";
import {client} from "../common/db/database.redis";

const router = Router()

router.post('/upload', (req, res) => {
    const filestream = fs.createWriteStream(`${process.cwd()}/data/lessons.csv`);

    filestream.on("error", (error) => {
        console.error(error)
        res.status(500).json({error: 'something went wrong'});
    });

    req.pipe(filestream);

    req.on('end', () => {
        filestream.close(async () => {
            const lessonsArray = await CsvFilesReader.readCsvFile('data/lessons.csv')

            const lessons = await lessonService.create(lessonsArray);

            res.status(201).json(lessons)
        });
    });
});

router.get('/list', async (req, res) => {
    const {id} = req.query;

    try {
        if(id) {
            const lessons = await lessonService.getByUserId(Number(id))

            res.json(lessons);
            return;
        }
        const data = await client.get('lessons');

        if(data){
            res.json(JSON.parse(data));

            return;
        }

        const lessons = await lessonService.getAll();
        client.set('lessons', JSON.stringify(lessons));
        res.json(lessons);
    }catch (e) {
        res.status(500).json({message: 'something went wrong...'});

    }




});

router.patch('/set-teacher', async (req, res) => {
    const {lessonId, teacherId} = req.body;

    if(lessonId && teacherId){
        const lesson = await lessonService.setTeacher(Number(lessonId), Number(teacherId))

        res.json(lesson)

        return;
    }

    res.status(400).json({message: 'lessonId and teacherID are required!'});
})

export const LessonRouter: NamedRouter = ['/lesson', router];