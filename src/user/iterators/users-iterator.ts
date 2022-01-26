
import {UsersStorage} from "../storage";
import {User} from "../types/models";

export class UsersIterator {
    private position: number = 0;

    constructor(private aggregator: UsersStorage) {
    }

    public current(): User {
        return this.aggregator.getUserByPosition(this.position);
    }

    public next(): void {
        this.position++
    }

    public hasNext(): boolean{
        return this.position < this.aggregator.count()
    }
}
