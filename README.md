# Hackatombe

Hackatombe est un outil collaboratif de veille technologique, permettant à la communauté de partager, commenter et découvrir les meilleures ressources tech, design, data et business du moment.

## Fonctionnalités principales

- **Feed personnalisé** selon vos centres d'intérêt (tags, types de contenus)
- **Ajout et partage de ressources** (articles, vidéos, podcasts, outils, etc.)
- **Recherche et filtres avancés** par thème, format et popularité
- **Authentification sécurisée** (JWT)

## Stack technique

### Frontend

- **React 19** (SPA)
- **React Router** (navigation)
- **Tailwind CSS** (UI moderne et responsive)
- **Axios** (requêtes HTTP)
- **Lucide React** (icônes)
- **Vite** (build ultra-rapide)

### Backend

- **Node.js** + **Express**
- **Amazon RDS (MySQL)** (base de données relationnelle)
- **JWT** (authentification)
- **bcrypt** (hash des mots de passe)
- **CORS** (sécurité API)
- **dotenv** (gestion des variables d'environnement)

### Déploiement & Outils

- **Vite** pour le frontend
- **Nodemon** pour le backend (dev)
- **ESLint** pour la qualité du code

## Installation

### Prérequis

- Node.js (>=18)
- MySQL

### Lancer le projet

1. **Cloner le repo**
   ```bash
   git clone https://github.com/KJovene/Hackatombe.git
   cd hackatombe
   ```

2. **Configurer le backend**
   ```bash
   cd backend
   cp .env.example .env
   # Renseignez les variables de connexion MySQL et la clé JWT dans .env
   npm install
   npm start
   ```

3. **Configurer le frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. Accédez à [http://localhost:5173](http://localhost:5173)

## Membres du projet

- **Assiah Essomawaki**
- **Tonze Groovert**
- **Jovené Kévin**
- **Marcheschi Thomas**
- **Dubois Laurent**

---

Hackatombe – Plateforme collaborative de veille technologique 🚀

