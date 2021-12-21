/// <reference path="../models/user.model.ts" />
/// <reference path="../models/administrator-builder.model.ts" />
// <reference path="./types/types.ts">

namespace Users {
    export class Administrator extends UserModel {
        administratorLevel: administratorLevels

        constructor(builder: AdministratorBuilderModel) {
            super(builder);

            this.administratorLevel = builder.administratorLevel;
        }

        changeUserById(id: number, key: string, value: number | string) {
            if(
                this.administratorLevel === administratorLevels.advanced ||
                this.administratorLevel === administratorLevels.basic
            ) {
                const usersStorage = UsersStorage.getInstance();

                usersStorage.changeUserById(id, key, value);
            }else {
                console.log(`you can't do this`);
            }
        }

        deleteUserById(id: number) {
            if(this.administratorLevel === administratorLevels.advanced) {
                const usersStorage = UsersStorage.getInstance();

                usersStorage.deleteUserById(id);
            }else {
                console.log(`you can't do this`);
            }
        }
    }
}