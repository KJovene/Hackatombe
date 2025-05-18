import express from 'express';
import pool from '../DB/dbconnect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config/env.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Champs manquants" });
  }
  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ message: "L'utilisateur existe déjà" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO user (username, email, password) VALUES (?, ?, ?)", [username, email, hashPassword]);
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    console.error('Erreur /auth/register:', err);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Champs manquants" });
  }
  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }
    const isMatch = await bcrypt.compare(password, rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    if (!ENV.JWT_KEY) {
      return res.status(500).json({ message: "Clé JWT manquante" });
    }
    const token = jwt.sign({ id: rows[0].id }, ENV.JWT_KEY, { expiresIn: '3h' });

    return res.status(201).json({ token: token });
  } catch (err) {
    console.error('Erreur /auth/login:', err);
    res.status(500).json({ message: "Erreur serveur lors de la connexion" });
  }
};

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ message: "Token manquant" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: "Token manquant" });
    }
    if (!process.env.JWT_KEY) {
      return res.status(500).json({ message: "Clé JWT manquante" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Erreur verifyToken:', error);
    return res.status(401).json({ message: "Token invalide" });
  }
};

export const user = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, email FROM user WHERE id = ?', [req.userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Erreur /auth/user:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const home = async (req, res) => {
  try {
    const db = await pool();
    const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [req.userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }
    return res.status(200).json({ user: rows[0] });
  } catch (err) {
    console.error('Erreur /auth/home:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};