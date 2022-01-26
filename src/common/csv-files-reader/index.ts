import {readFile} from 'fs/promises';
import {Lesson} from "../../lesson/types/models";

export default class CsvFilesReader {
  private static fileContent: string;

  public static async readCsvFile (path: Buffer | string ): Promise<Lesson[] | void> {
    try {
       const buffer: Buffer = await readFile(path);

      this.fileContent = buffer.toString('utf8');

      return this.transformStringToObjects();
    } catch (error) {
      console.log(error);
    }
  }

  private static transformStringToObjects () {
    const regExp = new RegExp('\r\n');

    const rowsArray: string[] = this.fileContent.split(regExp);

    rowsArray.splice(0, 4);
    rowsArray.splice(rowsArray.length - 2, 2);

    const model = rowsArray.splice(0, 1)[0].split(',');

    const result: Lesson[] = rowsArray.map((row: string) => {
      return row.split(',')
          .reduce((accumulator, value, index) => {
            accumulator[model[index]] = value;
            return accumulator;
          }, {} as any);
    })

    return result;
  }
}