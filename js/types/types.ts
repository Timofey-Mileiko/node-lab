/// <reference path="../users/student">
/// <reference path="../users/teacher">
/// <reference path="../users/administrator">
/// <reference path="../storage/users-storage.ts">
/// <reference path="./models/user.model.ts">

namespace Users {
    export enum administratorLevels {
        basic,
        advanced,
    }

    export interface IUsersStorage {
        addUser(user: UserModel): void;
        changeUserById(id: number, key: string, value: string | number): void;
        deleteUserById(id: number): void;
        getUsers(): UserModel[];
        getUserByPosition(position: number): UserModel;
        count(): number;
    }
}