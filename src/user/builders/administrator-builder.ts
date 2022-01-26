import {UserBuilderModel} from "../types/models";
import {Administrator} from "../types/users";
import {administratorLevels} from "../types/enums";

export class AdministratorBuilder extends UserBuilderModel{
    protected user: Administrator = new Administrator();

    constructor() {
        super();
        this.user.role = 'Administrator';
        this.user.id = Math.floor(Math.random() * 101);
    }

    public addAdministratorLevel(administratorLevel: administratorLevels) {
        this.user.administratorLevel = administratorLevel;
    }

    public build(): Administrator {
        return this.user;
    }
}