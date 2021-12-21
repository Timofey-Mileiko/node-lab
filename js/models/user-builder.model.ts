namespace Users {
    export abstract class UserBuilderModel {
        public firstName: string;
        public lastName: string;
        public age: number;
        public gender: string;
        public role: string;

        public createUser() {}

        public addFirstName(firstName: string) {
            this.firstName = firstName;
        }

        public addLastName(lastName: string) {
            this.lastName = lastName;
        }

        public addAge(age: number) {
            this.age = age;
        }

        public addGender (gender: string) {
            this.gender = gender;
        }
    }
}