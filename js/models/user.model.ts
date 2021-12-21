/// <reference path="./user-builder.model.ts" />

namespace Users {
    export class UserModel {
        public firstName: string;
        public lastName: string;
        public age: number;
        public gender: string;
        public role: string;
        public id: number;

        constructor(builder: UserBuilderModel) {
            this.id = Math.floor(Math.random() * 1000) + 1;
            this.firstName = builder.firstName;
            this.lastName = builder.lastName;
            this.age = builder.age;
            this.gender = builder.gender;
            this.role = builder.role;
        }
    }
}