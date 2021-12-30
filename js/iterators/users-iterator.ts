
import UsersStorage from "../storage/users-storage";
import UserModel from "../models/user";

export default class UsersIterator {
    private position: number = 0;

    constructor(private aggregator: UsersStorage) {
    }

    public current(): UserModel {
        return this.aggregator.getUserByPosition(this.position);
    }

    public next(): void {
        this.position++
    }

    public hasNext(): boolean{
        return this.position < this.aggregator.count()
    }
}
