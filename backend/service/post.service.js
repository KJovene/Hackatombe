import express from 'express';
import pool from '../DB/dbconnect.js';

export const addPost = async (req, res) => {
  const { titre, description, image, user_id } = req.body;
  if (!titre || !user_id) {
    return res.status(400).json({ message: "Titre et userId sont obligatoires" });
  }
  try {
    await pool.query(
      "INSERT INTO posts (titre, description, image, user_id) VALUES (?, ?, ?, ?)",
      [
        titre,
        description || null,
        image || null,
        Number(user_id)
      ]
    );
    res.status(201).json({ message: "Post créé avec succès" });
  } catch (err) {
    console.error('Erreur /addPost:', err);
    res.status(500).json({ message: "Erreur serveur lors de la création du post" });
  }
}