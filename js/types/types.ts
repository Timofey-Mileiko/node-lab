//<reference path="../users/student">
//<reference path="../users/teacher">
//<reference path="../users/administrator">

namespace Users {
    export enum administratorLevels {
        basic,
        advanced,
    }

    export type usersType = Student | Teacher | Administrator;
}