/// <reference path="../users/administrator.ts" />
/// <reference path="./types/types.ts">
/// <reference path="./models/user-builder.ts">

namespace Users {
    export class AdministratorBuilder extends UserBuilderModel{
        protected user: Administrator = new Administrator();

        constructor() {
            super();
            this.user.role = 'Administrator';
        }

        public addAdministratorLevel(administratorLevel: administratorLevels) {
            this.user.administratorLevel = administratorLevel;
        }

        public createUser(): Administrator {
            return this.user;
        }
    }
}