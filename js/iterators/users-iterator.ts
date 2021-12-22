/// <request path="../storage/user-storage.ts">
/// <request path="../types/types.ts">

namespace Users{
    export class UsersIterator {
        private position: number = 0;

        constructor(private aggregator: UsersStorage) {
        }

        public current(): usersType {
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
