/// <request path="../storage/user-storage.ts">
/// <request path="../types/types.ts">
/// <reference path="./models/user.model.ts">

namespace Users{
    export class UsersIterator {
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
}
