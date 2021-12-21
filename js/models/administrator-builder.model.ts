// <reference path="./user-builder.model.ts">
// <reference path="./types/types.ts">

namespace Users {
    export abstract class AdministratorBuilderModel extends UserBuilderModel {
        administratorLevel: administratorLevels

        public addAdministratorLevel(administratorLevel: administratorLevels) {}
    }
}