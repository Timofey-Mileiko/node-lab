import express from 'express';
import routes from './routes'

const app = express();

app.use(express.json());

routes.map(([name, router]) => {
    app.use(name, router)
});

export default app;