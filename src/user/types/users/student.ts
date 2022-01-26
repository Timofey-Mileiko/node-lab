import {User} from "../models";

export class Student extends User {
    public faculty: string;
    public group: string;
    public speciality: string;

    constructor() {
        super();
    }
}