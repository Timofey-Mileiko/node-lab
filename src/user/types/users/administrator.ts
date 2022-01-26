import {User} from "../models";
import {administratorLevels} from "../enums";

export class Administrator extends User {
    administratorLevel: administratorLevels;

    constructor() {
        super();
    }
}
