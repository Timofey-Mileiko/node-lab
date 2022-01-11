import User from "../models/user";

export default class Student extends User {
    public faculty: string;
    public group: string;
    public speciality: string;

    constructor() {
        super();
    }
}