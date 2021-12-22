/// <reference path="../users/administrator.ts" />
/// <reference path="./types/types.ts">
/// <reference path="./models/user-builder.ts">

namespace Users {
    export class AdministratorBuilder extends UserBuilderModel{
        administratorLevel: administratorLevels;

        constructor() {
            super();
            this.role = 'Administrator';
        }

        public addAdministratorLevel(administratorLevel: administratorLevels): AdministratorBuilder {
            this.administratorLevel = administratorLevel;

            return this;
        }

        public createUser() {
            return new Administrator(this);
        }
    }
}