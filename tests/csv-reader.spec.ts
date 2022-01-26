import {LessonsStorage} from "../src/lesson/storage";
import {Lesson} from "../src/lesson/types/models";
import CsvFilesReader from "../src/common/csv-files-reader";
import expectedData from "./expected-data/lessons";
import {LessonBuilder} from "../src/lesson/builders";

describe('CSV reader', () => {
    let lessonsStorage: LessonsStorage;
    let lessonsData: Lesson[] | void;
    
    beforeEach(async () => {
        lessonsStorage = LessonsStorage.getInstance();
        lessonsData = await CsvFilesReader.readCsvFile('./data/lessons.csv');
    })
    
    it('read data from csv files', async () => {
        expect(lessonsData).toEqual(expectedData);
    });

    it('has to write lessons to storage', () => {
        if(lessonsData) {
            lessonsData.forEach((lessonData) => {
                const lessonBuilder = new LessonBuilder();

                lessonBuilder.addCourse(lessonData.course);
                lessonBuilder.addDate(lessonData.date);
                lessonBuilder.addName(lessonData.name);
                lessonBuilder.addType(lessonData.type);

                const lesson: Lesson = lessonBuilder.build();

                lessonsStorage.addLesson(lesson);

            });

            expect(lessonsStorage.getLessons()).toEqual(expectedData);
        }
    })
})