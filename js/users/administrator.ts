/// <reference path="../models/user.model.ts" />
/// <reference path="../builder/administrator-builder.ts" />
// <reference path="./types/types.ts">

namespace Users {
    export class Administrator extends UserModel {
        administratorLevel: administratorLevels

        constructor() {
            super();
        }
    }
}