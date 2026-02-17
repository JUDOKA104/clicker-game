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
* **Système de Particules :** Retour visuel ultra-satisfaisant avec des pop-ups de score à l'endroit exact de la souris.
* **Le Marché Noir (Secrets) :** Des améliorations cachées qui n'apparaissent dynamiquement que lorsque le joueur remplit certaines conditions (nombre de clics, score atteint).
* **Manipulation Temporelle :** Possibilité de réduire le délai du "tick" serveur (de 1.00s jusqu'à 0.50s) pour accélérer la production passive de manière exponentielle.
* **Synergie Active/Passive :** Plus vous possédez de bâtiments, plus vos clics manuels deviennent puissants grâce aux améliorations de synergie.
* **Ascension (Prestige) :** Un système de "Soft Reset" déblocable à 1 Milliard de points, offrant un multiplicateur global pour les parties suivantes.
* **Sauvegarde Sécurisée :** Progression sauvegardée en temps réel avec système de récupération "Anti-Crash" et "Kill Switch" pour la suppression volontaire des données.

---

## 🚀 Installation & Développement (Local)

Si vous souhaitez cloner le projet et le faire tourner sur votre machine :

**1. Cloner le dépôt :**
```bash
git clone [https://github.com/JUDOKA104/clicker-game.git](https://github.com/JUDOKA104/clicker-game.git)
```

**2. Aller dans le dossier :**
```bash
cd clicker-game
```

**3. Installer les dépendances :**
```bash
npm install
```

**4. Lancer le serveur de développement local :**
```bash
npm run dev
```

---

## 🛠️ Architecture du Code

Le cœur du jeu tourne autour d'une boucle temporelle gérée par un `useEffect` sous React. Le score est mis à jour toutes les 100 millisecondes pour garantir une fluidité parfaite à l'écran, tout en respectant les mathématiques du *Gain Par Seconde (GPS)* calculé dynamiquement via `useMemo`.

L'ajout de nouveaux bâtiments ou de nouveaux secrets se fait simplement en éditant les constantes de configuration en haut du fichier `App.jsx`, sans avoir à retoucher l'interface utilisateur (DOM dynamique).

---

Développé avec passion (et beaucoup de clics) ! 🚀