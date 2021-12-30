import User from "./user";


export default abstract class UserBuilderModel {
    protected user: User

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