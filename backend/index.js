import express from "express";
import pool from "./DB/dbconnect.js";
import cors from 'cors';
import e from "express";

const app = express();

app.use(express.json());

app.post("/hello", async (req, res) => {
    const { message } = req.body;
    try {
        const [result] = await pool.query("INSERT INTO hellos (message) VALUES (?)", [message]);
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        console.error("Error inserting message:", err);
        res.status(500).send("Error inserting message");
    }
});

app.listen(6782, () => {
    console.log("Server is running on port 6782");
    }
);