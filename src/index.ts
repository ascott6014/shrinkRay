import './config'; // Load environment variables
import express, { Express } from 'express';
import session from 'express-session';
import { registarUser, login } from './controllers/UserController';

const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;

app.use(
    session({
        secret: [COOKIE_SECRET], // MAKE NOTE THAT THIS HAS TO BE AN ARRAY
        cookie: { maxAge: 8 * 60 * 60 * 1000}, // 8 hours
        name: 'session',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.json());

//  endpoints

app.post("/api/users", registarUser);
app.post("/api/login", login);


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
