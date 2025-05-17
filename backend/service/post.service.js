import express from 'express';
import pool from '../DB/dbconnect.js';

export const addPost = async (req, res) => {
  const { titre, description, image, userId } = req.body;
  if (!titre || !description || !userId) {
    return res.status(400).json({ message: "Champs manquants" });
  }
  try {
    await pool.query("INSERT INTO post (titre, description, image, userId) VALUES (?, ?, ?, ?)", [titre, description, image, userId]);
    res.status(201).json({ message: "Post créé avec succès" });
  } catch (err) {
    console.error('Erreur /addPost:', err);
    res.status(500).json({ message: "Erreur serveur lors de la création du post" });
  }
}

