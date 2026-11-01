# 🏢 OfficeRapide - Suite Bureautique Professionnelle

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)

**Votre suite bureautique complète, gratuite et open source**

*Inspirée de Microsoft Office - Conçue pour la productivité*

[Installation](#-installation) • [Utilisation](#-utilisation) • [Fonctionnalités](#-fonctionnalités) • [Documentation](#-documentation) • [Contribuer](#-contribuer)

</div>

---

## 📦 Applications Incluses

<div align="center">

| 📝 Word | 📊 Excel | 📽️ PowerPoint | 📧 Outlook |
|:---:|:---:|:---:|:---:|
| ![Word](https://img.shields.io/badge/Word-2b579a?style=for-the-badge&logo=microsoft-word&logoColor=white) | ![Excel](https://img.shields.io/badge/Excel-217346?style=for-the-badge&logo=microsoft-excel&logoColor=white) | ![PowerPoint](https://img.shields.io/badge/PowerPoint-d24726?style=for-the-badge&logo=microsoft-powerpoint&logoColor=white) | ![Outlook](https://img.shields.io/badge/Outlook-0078d4?style=for-the-badge&logo=microsoft-outlook&logoColor=white) |
| Traitement de texte | Tableur | Présentations | Messagerie |

</div>

---

## 🌟 Fonctionnalités Principales

### ✅ Design Microsoft Office Authentique
- Rubans complets avec onglets et groupes de commandes
- Barres de titre colorées par application
- Icônes Font Awesome professionnelles
- Typographie Calibri (police officielle Office)
- Espacements et marges professionnels

### 💾 Stockage Local & Privé
- Sauvegarde automatique dans localStorage
- 100% privé - aucune donnée envoyée sur internet
- Fonctionne hors-ligne
- Persistance des données après fermeture

### 🚀 Performance Optimale
- Démarrage instantané
- Build ultra-rapide avec Vite (~1.6s)
- Bundle optimisé (~200KB gzipped)
- 100% client-side

### 📱 Expérience Utilisateur
- Navigation fluide entre applications
- Notifications toast élégantes
- Interface responsive
- Documents récents
- Mode présentation (PowerPoint)

---

## 📑 Table des Matières

- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Applications](#-applications)
- [Design System](#-design-system)
- [Structure du Projet](#-structure-du-projet)
- [Technologies](#-technologies)
- [Performance](#-performance)
- [Documentation](#-documentation)
- [Roadmap](#-roadmap)
- [Contribuer](#-contribuer)
- [Licence](#-licence)
- [Crédits](#-crédits)

---

## 🚀 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Développement Local

```bash
# Cloner le projet
git clone https://github.com/votre-username/officerapide.git
cd officerapide

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:5173
```

### Production

```bash
# Builder pour la production
npm run build

# Le dossier dist/ contient l'application prête à déployer
```

### Déploiement

<details>
<summary><strong>Vercel</strong></summary>

```bash
npm install -g vercel
vercel
```
</details>

<details>
<summary><strong>Netlify</strong></summary>

```bash
npm install -g netlify-cli
netlify deploy --prod
```
</details>

<details>
<summary><strong>GitHub Pages</strong></summary>

```bash
npm run build
# Uploader le dossier dist/ sur la branche gh-pages
```
</details>

<details>
<summary><strong>Docker</strong></summary>

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
```
</details>

---

## 📖 Utilisation

### Page d'Accueil

1. **Applications** : Cliquez sur une application pour l'ouvrir
2. **Documents récents** : Accédez rapidement à vos derniers fichiers
3. **Démarrage rapide** : Créez un nouveau document en un clic

### 📝 Word - Traitement de Texte

| Action | Comment faire |
|--------|---------------|
| Écrire | Cliquez dans la zone de texte |
| Mettre en forme | Utilisez le ruban (Accueil, Insertion, etc.) |
| Sauvegarder | Fichier → Sauvegarder |
| Charger | Fichier → Ouvrir |
| Exporter | Fichier → Exporter (HTML/TXT) |
| Imprimer | Fichier → Imprimer |

### 📊 Excel - Tableur

| Action | Comment faire |
|--------|---------------|
| Sélectionner | Cliquez sur une cellule |
| Entrer une valeur | Tapez directement |
| Formules | Commencez par `=` (ex: `=SUM(A1:A10)`) |
| Navigation | Entrée (bas), Tab (droite) |
| Exporter | Bouton de téléchargement CSV |

**Formules supportées :**
- `=SUM(A1:A10)` - Somme
- `=AVG(B1:B5)` - Moyenne
- `=A1+B1` - Addition
- `=A1*B1` - Multiplication
- `=A1-B1` - Soustraction
- `=A1/B1` - Division

### 📽️ PowerPoint - Présentations

| Action | Comment faire |
|--------|---------------|
| Ajouter | Accueil → Nouvelle diapo |
| Modifier | Cliquez sur titre/contenu |
| Thème | Création → sélectionnez un thème |
| Présenter | Bouton Play dans la barre de titre |
| Naviguer | Flèches ou boutons en mode présentation |
| Exporter | Bouton de téléchargement HTML |

### 📧 Outlook - Messagerie

| Action | Comment faire |
|--------|---------------|
| Lire | Cliquez sur un email dans la liste |
| Répondre | Bouton Répondre dans l'email |
| Nouveau | Bouton "Nouveau message" en haut |
| Rechercher | Barre de recherche en haut |
| Contacts | Bouton Contacts dans le volet gauche |
| Favoris | Cliquez sur l'étoile ☆ |

---

## 🎨 Applications

### 📝 Word - Traitement de Texte

<div align="center">
<img src="https://img.shields.io/badge/Word-2b579a?style=for-the-badge&logo=microsoft-word&logoColor=white" />
</div>

**Fonctionnalités :**
- ✅ Ruban complet avec onglets (Accueil, Insertion, Mise en page, Fichier)
- ✅ Mise en forme riche (gras, italique, souligné, couleurs, polices)
- ✅ Polices multiples (Calibri, Arial, Times New Roman, Georgia, Verdana)
- ✅ Alignement (gauche, centré, droite, justifié)
- ✅ Listes à puces et numérotées
- ✅ Insertion d'images, liens, tableaux
- ✅ Sauvegarde locale de documents
- ✅ Export HTML et TXT
- ✅ Impression
- ✅ Compteur de mots/caractères en temps réel
- ✅ Règle visuelle

**Interface :**
- Barre de titre bleue (#2b579a)
- Ruban avec onglets et groupes
- Zone d'édition format A4 avec marges
- Barre de statut avec zoom et navigation

---

### 📊 Excel - Tableur

<div align="center">
<img src="https://img.shields.io/badge/Excel-217346?style=for-the-badge&logo=microsoft-excel&logoColor=white" />
</div>

**Fonctionnalités :**
- ✅ Grille complète : 50 lignes × 26 colonnes (A-Z)
- ✅ Formules avancées : SUM(), AVG(), calculs arithmétiques
- ✅ Barre de formule avec indicateur fx
- ✅ Ruban complet : Accueil, Insertion, Formules, Données
- ✅ Navigation clavier : Entrée (bas), Tab (droite)
- ✅ Export CSV compatible Excel, Google Sheets
- ✅ Sauvegarde locale : persistance des données
- ✅ Sélection de cellules avec surbrillance

**Interface :**
- Barre de titre verte (#217346)
- Grille avec en-têtes
- Barre de formule professionnelle
- Barre de statut avec compteurs

---

### 📽️ PowerPoint - Présentations

<div align="center">
<img src="https://img.shields.io/badge/PowerPoint-d24726?style=for-the-badge&logo=microsoft-powerpoint&logoColor=white" />
</div>

**Fonctionnalités :**
- ✅ Diapositives multiples : ajout/suppression illimitées
- ✅ 7 thèmes de couleurs professionnels
- ✅ Mode présentation plein écran
- ✅ Navigation par miniatures
- ✅ Édition en direct (titre, contenu)
- ✅ Ruban complet : Accueil, Insertion, Création, Transitions
- ✅ Export HTML autonome

**Thèmes disponibles :**
1. Bleu → Violet
2. Vert → Turquoise
3. Orange → Rouge
4. Rose → Rouge rosé
5. Indigo → Bleu
6. Gris foncé → Noir
7. Blanc → Gris clair

**Interface :**
- Barre de titre orange (#d24726)
- Volet des miniatures à gauche
- Zone d'édition centrale
- Mode diaporama immersif

---

### 📧 Outlook - Messagerie

<div align="center">
<img src="https://img.shields.io/badge/Outlook-0078d4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" />
</div>

**Fonctionnalités :**
- ✅ Interface 3 volets : dossiers, liste, contenu
- ✅ Boîte de réception avec compteur de non lus
- ✅ Emails envoyés (historique)
- ✅ Brouillons (messages en cours)
- ✅ Corbeille (avec restauration)
- ✅ Composition d'emails
- ✅ Répondre avec citation automatique
- ✅ Recherche en temps réel sur tous les champs
- ✅ Favoris : marquage avec étoile ⭐
- ✅ Carnet d'adresses : gestion des contacts
- ✅ Sauvegarde automatique : localStorage
- ✅ Emails de démonstration pré-chargés

**Interface :**
- Barre de titre bleue (#0078d4)
- Barre de recherche arrondie
- Volet des dossiers à gauche
- Liste des emails au centre
- Contenu de l'email à droite
- Barre de statut avec compteurs

---

## 🎨 Design System

### Couleurs Officielles Microsoft

| Application | Couleur | Hex Code | Usage |
|------------|---------|----------|-------|
| Word | Bleu | `#2b579a` | Barre de titre, accents |
| Excel | Vert | `#217346` | Barre de titre, accents |
| PowerPoint | Orange | `#d24726` | Barre de titre, accents |
| Outlook | Bleu clair | `#0078d4` | Barre de titre, accents |

### Typographie

```css
/* Police principale */
font-family: 'Calibri', 'Arial', sans-serif;

/* Tailles */
--text-base: 16px;
--text-sm: 14px;
--text-lg: 18px;
--text-xl: 24px;

/* Interlignage */
line-height: 1.8;
```

### Composants

#### Ruban
- Onglets avec groupes de commandes
- Icônes Font Awesome
- Tooltips au survol
- États hover/active

#### Barres de Titre
- Couleur de l'application
- Icône à gauche
- Nom du fichier éditable
- Boutons d'action à droite

#### Barres de Statut
- Fond coloré
- Informations contextuelles
- Compteurs en temps réel
- Boutons de navigation

---

## 📁 Structure du Projet

```
officerapide/
├── src/
│   ├── App.tsx                    # Routeur principal
│   ├── apps/
│   │   ├── Home.tsx              # Page d'accueil Microsoft 365
│   │   ├── WordApp.tsx           # Word (traitement de texte)
│   │   ├── SheetApp.tsx          # Excel (tableur)
│   │   ├── SlideApp.tsx          # PowerPoint (présentations)
│   │   └── MailApp.tsx           # Outlook (messagerie)
│   ├── components/
│   │   ├── Toast.tsx             # Notifications toast
│   │   └── DocumentList.tsx      # Liste des documents
│   ├── utils/
│   │   └── DocumentManager.ts    # Gestion du stockage localStorage
│   └── styles/
│       └── editor.css            # Styles personnalisés
├── public/
│   ├── icon.svg                  # Icône PWA
│   ├── manifest.json             # Configuration PWA
│   └── sw.js                     # Service Worker
├── index.html                    # Point d'entrée HTML
├── package.json                  # Dépendances npm
├── tsconfig.json                 # Configuration TypeScript
├── vite.config.ts                # Configuration Vite
├── tailwind.config.js            # Configuration Tailwind
├── README.md                     # Documentation principale
├── OFFICERAPIDE_GUIDE.md         # Guide détaillé
├── RÉSUMÉ_PROJET.md              # Résumé du projet
└── LICENSE                       # Licence MIT
```

---

## 🛠️ Technologies

### Frontend
- **React 18** - Framework UI
- **TypeScript 5** - Typage statique
- **Tailwind CSS 3** - Styling utility-first
- **Vite 5** - Build tool ultra-rapide
- **Font Awesome 6** - Icônes professionnelles

### Stockage
- **localStorage** - Persistance des données
- **JSON** - Format de données

### Build & Deploy
- **Vite** - Build et dev server
- **npm** - Gestionnaire de paquets
- **Git** - Contrôle de version

---

## 📊 Performance

### Stats de Build

```
✓ Modules transformés:    36
✓ Temps de build:         1.58s
✓ HTML:                   3.22 kB (gzip: 1.40 kB)
✓ CSS:                    35.22 kB (gzip: 6.66 kB)
✓ JS:                     199.33 kB (gzip: 57.86 kB)
✓ Total:                  ~200 KB gzipped
```

### Optimisations
- ✅ Code splitting automatique
- ✅ Tree shaking
- ✅ Assets minifiés
- ✅ Compression gzip
- ✅ Cache navigateur
- ✅ Service Worker (PWA)

### Métriques
- **First Contentful Paint** : < 1s
- **Time to Interactive** : < 2s
- **Lighthouse Score** : 95+
- **Bundle Size** : ~200KB gzipped

---

## 💾 Stockage des Données

### localStorage

Toutes les données sont stockées localement dans le navigateur :

| Application | Clé localStorage | Données stockées |
|------------|------------------|------------------|
| Word | `wordrapide_documents` | Documents texte |
| Excel | `sheetrapide_doc` | Feuilles de calcul |
| PowerPoint | `sliderapide_doc` | Présentations |
| Outlook | `mailrapide_emails` | Emails |
| Outlook | `mailrapide_contacts` | Contacts |

### Capacités
- ✅ **Taille** : ~5-10 MB selon le navigateur
- ✅ **Persistance** : Les données restent après fermeture
- ✅ **Privé** : 100% local, pas de serveur
- ✅ **Rapide** : Accès instantané

### Limitations
- ⚠️ Vider le cache du navigateur supprime les données
- ⚠️ Pas de synchronisation entre appareils
- ⚠️ Pas de sauvegarde cloud (à venir)

---

## 📖 Documentation

### Guides Disponibles

1. **[README.md](./README.md)** - Ce fichier (documentation principale)
2. **[OFFICERAPIDE_GUIDE.md](./OFFICERAPIDE_GUIDE.md)** - Guide détaillé de chaque application
3. **[RÉSUMÉ_PROJET.md](./RÉSUMÉ_PROJET.md)** - Vue d'ensemble complète

### Ressources Externes

- [Documentation React](https://react.dev/)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Vite](https://vitejs.dev/)
- [Font Awesome Icons](https://fontawesome.com/icons)

---

## 🚀 Roadmap

### v1.1 (Prochainement)

- [ ] Mode sombre
- [ ] Raccourcis clavier (Ctrl+S, Ctrl+Z, Ctrl+C, Ctrl+V)
- [ ] Templates de documents
- [ ] Annulation/Annulation dans toutes les apps
- [ ] Thèmes personnalisables

### v1.2

- [ ] Import/Export Office (docx, xlsx, pptx)
- [ ] Graphiques dans Excel
- [ ] Animations dans PowerPoint
- [ ] Pièces jointes dans Outlook
- [ ] Signatures d'email

### v2.0

- [ ] Synchronisation cloud
- [ ] Collaboration en temps réel
- [ ] Assistant IA intégré
- [ ] Applications mobiles (iOS/Android)
- [ ] API publique

### v3.0

- [ ] OneNote - Prise de notes
- [ ] Teams - Communication
- [ ] Planner - Gestion de projets
- [ ] Forms - Questionnaires
- [ ] Sway - Présentations interactives

---

## 🤝 Contribuer

Les contributions sont les bienvenues !

### Comment contribuer

1. **Fork** le projet
2. **Créez** une branche (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### Guidelines

- ✅ Code propre et documenté
- ✅ Tests unitaires si possible
- ✅ Respectez le style de code existant
- ✅ Messages de commit clairs
- ✅ Documentation à jour

### Signaler un bug

Utilisez les [GitHub Issues](https://github.com/votre-username/officerapide/issues) pour signaler des bugs ou proposer des fonctionnalités.

---

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License

Copyright (c) 2024 OfficeRapide

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Crédits

### Inspirations
- **Microsoft Office** - Design et fonctionnalités
- **Microsoft 365** - Interface utilisateur
- **Google Workspace** - Expérience cloud

### Technologies
- **React Team** - Framework incroyable
- **Tailwind Labs** - CSS utility-first
- **Vite Team** - Build tool ultra-rapide
- **Font Awesome** - Icônes professionnelles

### Contributeurs

<div align="center">

**Vous ?** [Contribuez au projet !](#-contribuer)

</div>

---

## 📧 Contact

- **GitHub Issues** : [Signaler un bug](https://github.com/votre-username/officerapide/issues)
- **Discussions** : [Poser une question](https://github.com/votre-username/officerapide/discussions)
- **Email** : contact@officerapide.com

---

## 📊 Stats du Projet

<div align="center">

| 📦 Applications | 🎨 Composants | 📄 Fichiers | 📝 Lignes de Code |
|:---:|:---:|:---:|:---:|
| 4 | 10+ | 15+ | ~3000 |

| ⚡ Build Time | 📦 Bundle Size | 🚀 Performance | 🎯 Lighthouse |
|:---:|:---:|:---:|:---:|
| 1.58s | ~200KB | 95+ | 95+ |

</div>

---

## 🎉 Remerciements

Merci à tous ceux qui ont contribué à ce projet !

- 🌟 **Stars** - Merci pour votre soutien
- 🍴 **Forks** - Merci de partager le projet
- 🐛 **Issues** - Merci pour vos retours
- 💡 **PRs** - Merci pour vos contributions

---

<div align="center">

**Fait avec ❤️ pour la productivité**

[⭐ Star this repo](https://github.com/votre-username/officerapide) • [🐛 Report Bug](https://github.com/votre-username/officerapide/issues) • [💡 Request Feature](https://github.com/votre-username/officerapide/issues) • [📖 Documentation](#-documentation)

---

**OfficeRapide** - Votre suite bureautique professionnelle, gratuite et open source ! 🚀

*Inspiré de Microsoft Office - Conçu avec ❤️ pour la productivité*

</div>
