# 🖱️ Ascension Clicker - React & Vite

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

Un jeu incrémental (Clicker/Idle Game) développé de zéro avec **React** et **Vite**. Plongez dans la course au milliard de points en optimisant vos bâtiments, en débloquant des secrets temporels et en maîtrisant l'art du clic !

🎮 **[👉 JOUER AU JEU ICI (Live Demo) 👈](https://judoka104.github.io/clicker-game/)**

---

## ✨ Fonctionnalités Principales

* **Interface à 3 colonnes (UI Fixe) :** Inspirée des classiques du genre, avec une zone d'action, une boutique d'améliorations et un gestionnaire de bâtiments, le tout sans scroll horizontal et adaptable.
* **Système de Particules :** Retour visuel ultra-satisfaisant avec des pop-ups de score générés dynamiquement via des IDs uniques (`crypto.randomUUID()`).
* **Le Marché Noir (Secrets) :** Des améliorations cachées qui n'apparaissent dynamiquement que lorsque le joueur remplit certaines conditions (nombre de clics, score atteint).
* **Manipulation Temporelle & Synergie :** Possibilité d'accélérer le cycle du jeu (de 1.00s à 0.50s) et d'ajouter un pourcentage de votre production passive directement à vos clics manuels.
* **Ascension (Prestige) :** Un système de "Soft Reset" déblocable à 1 Milliard de points, offrant un multiplicateur global pour les parties suivantes.
* **Sauvegarde Automatique Sécurisée :** Progression sauvegardée en temps réel via un Custom Hook (`usePersistentState`) intégrant un "Kill Switch" pour empêcher la corruption des données lors d'une suppression volontaire.

---

## 🚀 Installation & Développement (Local)

**1. Cloner le dépôt :**
```bash
git clone [https://github.com/JUDOKA104/clicker-game.git](https://github.com/JUDOKA104/clicker-game.git)
```
**2. Aller dans le dossier et installer les dépendances :**
```bash
cd clicker-game && npm install
```
**3. Lancer le serveur local :**
```bash
npm run dev
```

---

## 🛠️ Architecture du Code (Enterprise-grade)

Ce projet utilise une architecture React moderne, modulaire et hautement optimisée, 100% compatible avec les règles strictes d'ESLint et le Fast Refresh de Vite :

* **State Management via Context API :** Toute la logique mathématique, la boucle temporelle (`useEffect` tournant à 100ms) et les actions d'achat sont centralisées dans un `GameContext`.
* **Séparation des responsabilités :** L'interface utilisateur est découpée en composants "bêtes" et réutilisables (`<Building />`, `<UpgradeButton />`, `<Clicker />`), rendant le fichier `App.jsx` extrêmement léger et facile à lire.
* **Custom Hooks :** La gestion du `localStorage` est totalement abstraite via un hook personnalisé, garantissant un code DRY (Don't Repeat Yourself).
* **Configuration Externe :** Les données du jeu (coût des bâtiments, prérequis des secrets) sont isolées dans un fichier `gameConfig.js`, permettant d'ajouter du contenu à l'infini sans jamais toucher à la logique React.

---
Développé avec passion (et beaucoup de clics) ! 🚀