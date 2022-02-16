import app from './src/app';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./src/user/entities";
import {Lesson} from "./src/lesson/entities";

const port = process.env.SERVER_PORT || 3000;

const main = async () => {
    try {
        await createConnection({
            type: 'postgres',
            host: 'postgres',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'node_postgres',
            entities: [User, Lesson],
            synchronize: true,
            migrations: ["src/common/migration/*.ts"],
            cli: {
                "migrationsDir": "src/common/migration"
            }
        });

        app.listen(port, () => {
            console.log(`The application is listening on port ${port}!`);
        });
    } catch (error) {
        console.error('Server error:' + '\n' + error);
    }
}

main();

