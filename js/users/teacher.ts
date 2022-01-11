import User from "../models/user";

export default class Teacher extends User {
    grade: string;
    specialization: string;
    department: string;

    constructor() {
        super();
    }
}