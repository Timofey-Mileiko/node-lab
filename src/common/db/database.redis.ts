import {createClient} from "redis";

export const client = createClient({
    url: 'redis://cache'
});
client.connect();