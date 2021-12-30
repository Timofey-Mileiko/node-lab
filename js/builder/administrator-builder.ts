import UserBuilderModel from "../models/user-builder";
import Administrator from "../users/administrator";
import {administratorLevels} from "../types/types";

export default class AdministratorBuilder extends UserBuilderModel{
    protected user: Administrator = new Administrator();

    constructor() {
        super();
        this.user.role = 'Administrator';
    }

    public addAdministratorLevel(administratorLevel: administratorLevels) {
        this.user.administratorLevel = administratorLevel;
    }

    public build(): Administrator {
        return this.user;
    }
}