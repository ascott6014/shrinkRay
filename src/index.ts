import './config'; // Load environment variables
import express, { Express } from 'express';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import { registarUser, login } from './controllers/UserController';
import { shortenUrl, getOriginalUrl } from './controllers/LinkController';


const app: Express = express();
const { PORT, COOKIE_SECRET, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const MySQLStore = MySQLStoreFactory(session as any);
const sessionStore = new MySQLStore({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
});

app.use(
    session({
        store: sessionStore,
        secret: COOKIE_SECRET, // MAKE NOTE THAT THIS HAS TO BE AN ARRAY
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
app.post("/api/links", shortenUrl); // untested
app.get("/:targetLinkId", getOriginalUrl); // untested


app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
