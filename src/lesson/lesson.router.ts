import { Router } from 'express'
import { NamedRouter } from '../common/types/tuples'
import {lessonService} from './lesson.service';
import fs from 'fs';
import CsvFilesReader from "../../js/csv-files-reader";

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
            const lessons = await CsvFilesReader.readCsvFile('data/lessons.csv')

            lessonService.create(lessons);

            res.send(lessonService.getAll())
        });
    });
})

export const LessonRouter: NamedRouter = ['/lesson', router];