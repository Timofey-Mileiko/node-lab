/// <reference path="./models/user.model.ts">

namespace Users {
    export abstract class UserBuilderModel {
        protected user: UserModel

        public build() {}

        public addFirstName(firstName: string) {
            this.user.firstName = firstName;
        }

        public addLastName(lastName: string) {
            this.user.lastName = lastName;
        }

        public addAge(age: number) {
            this.user.age = age;
        }

        public addGender (gender: string) {
            this.user.gender = gender;
        }
    }
}