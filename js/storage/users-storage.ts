//<reference path="../types/types.ts">
//<reference path="../iterators/users-iterator.ts">

namespace Users{
    export class UsersStorage implements IUsersStorage {
        private static instance: UsersStorage;

        public static getInstance(): UsersStorage {
            if(!UsersStorage.instance){
                UsersStorage.instance = new UsersStorage();
            }

            return UsersStorage.instance;
        }

        private users: usersType[] & { [key: string]: any }[] = [];

        public addUser(user: usersType){
            this.users.push(user);
        }

        public changeUserById(id: number, key: string, value: string | number) {
            const currentUser: any = this.users.filter(user => user.id === id)[0];
            currentUser[key]  = value;

            this.users = this.users.filter(user => user.id !== id);
            this.users.push(currentUser);
        }

        public deleteUserById(id: number) {
            this.users = this.users.filter(user => user.id !== id)
        }

        public getUsers(): usersType[] {
            return this.users;
        }

        public getUserByPosition(position: number): usersType {
            return this.users[position];
        }

        public count(): number {
            return this.users.length;
        }

        createIterator(): UsersIterator {
            return new UsersIterator(this);
        }
    }
}