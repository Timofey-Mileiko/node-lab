/// <reference path="../users/student">
/// <reference path="../users/teacher">
/// <reference path="../users/administrator">
/// <reference path="../storage/users-storage.ts">

namespace Users {
    export enum administratorLevels {
        basic,
        advanced,
    }

    export type usersType = Student | Teacher | Administrator;

    export interface IUsersStorage {
        addUser(user: usersType): void;
        changeUserById(id: number, key: string, value: string | number): void;
        deleteUserById(id: number): void;
        getUsers(): usersType[];
        getUserByPosition(position: number): usersType;
        count(): number;
    }
}