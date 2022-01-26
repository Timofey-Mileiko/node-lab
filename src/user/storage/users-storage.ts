import {IUsersStorage} from "../types/interfaces";
import {User} from "../types/models";
import {UsersIterator} from "../iterators";

export class UsersStorage implements IUsersStorage {
    private static instance: UsersStorage;

    public static getInstance(): UsersStorage {
        if(!UsersStorage.instance){
            UsersStorage.instance = new UsersStorage();
        }

        return UsersStorage.instance;
    }

    private users: User[] = [];

    public addUser(user: User){
        this.users.push(user);
    }

    public changeUserById(id: number, key: string, value: string | number) {
        const currentUser: any = this.users.find(user => user.id === id);
        currentUser[key] = value;

        return currentUser;
    }

    public deleteUserById(id: number) {
        this.users = this.users.filter(user => user.id !== id)
    }

    public getUsers(): User[] {
        return this.users;
    }

    public getUserByPosition(position: number): User {
        return this.users[position];
    }

    public count(): number {
        return this.users.length;
    }

    clearStorage(){
        this.users = [];
    }

    createIterator(): UsersIterator {
        return new UsersIterator(this);
    }
}