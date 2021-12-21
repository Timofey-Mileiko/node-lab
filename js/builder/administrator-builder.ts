/// <reference path="../models/administrator-builder.model.ts" />
/// <reference path="../users/administrator.ts" />
// <reference path="./types/types.ts">

namespace Users {
    export class AdministratorBuilder extends AdministratorBuilderModel{
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