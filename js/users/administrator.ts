import User from "../models/user";
import {administratorLevels} from "../types/types";


export default class Administrator extends User {
    administratorLevel: administratorLevels;

    constructor() {
        super();
    }
}
