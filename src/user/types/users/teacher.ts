import {User} from "../models";

export class Teacher extends User {
    grade: string;
    specialization: string;
    department: string;

    constructor() {
        super();
    }
}