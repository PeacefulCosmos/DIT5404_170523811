import express from 'express';
import bodyParser from 'express';
import { route } from './route.js';
import cors from 'cors';
import { mongoConnection } from './mongoose.js';
import { exceptionHandler } from './util/exceptionHandler/index.js';

const PORT = 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`/`, (req, res) => {
    res.status(200).send(`Hello World`);
});

route(app);

// Error boundary
app.use(exceptionHandler);

mongoConnection();

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
