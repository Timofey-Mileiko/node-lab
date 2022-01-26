import {User} from "../models";

export interface IUsersStorage {
    addUser(user: User): void;
    changeUserById(id: number, key: string, value: string | number): void;
    deleteUserById(id: number): void;
    getUsers(): User[];
    getUserByPosition(position: number): User;
    count(): number;
}