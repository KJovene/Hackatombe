import express from "express";
import cors from 'cors';
import router from './routes/router.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json({ limit : '100000mb'}));

app.use(router);

app.listen(6782, () => {
    console.log("Server is running on port 6782");
    }
);