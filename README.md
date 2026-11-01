# 🏢 OfficeRapide

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

**Suite bureautique professionnelle inspirée de Microsoft Office**

[Installation](#installation) • [Utilisation](#utilisation) • [Fonctionnalités](#fonctionnalités) • [Documentation](#documentation)

</div>

---

## 📦 Applications

### 📝 Word - Traitement de Texte
<div align="center">
<img src="https://img.shields.io/badge/Word-2b579a?style=for-the-badge&logo=microsoft-word&logoColor=white" />
</div>

Traitement de texte complet avec ruban professionnel, mise en forme riche, insertion d'images et de tableaux, sauvegarde locale et export HTML/TXT.

### 📊 Excel - Tableur
<div align="center">
<img src="https://img.shields.io/badge/Excel-217346?style=for-the-badge&logo=microsoft-excel&logoColor=white" />
</div>

Tableur puissant avec formules (SUM, AVG), grille 50×26, barre de formule, export CSV et navigation clavier.

### 📽️ PowerPoint - Présentations
<div align="center">
<img src="https://img.shields.io/badge/PowerPoint-d24726?style=for-the-badge&logo=microsoft-powerpoint&logoColor=white" />
</div>

Créateur de présentations avec 7 thèmes, mode diaporama, édition en direct et export HTML autonome.

### 📧 Outlook - Messagerie
<div align="center">
<img src="https://img.shields.io/badge/Outlook-0078d4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" />
</div>

Client de messagerie complet avec interface 3 volets, gestion des contacts, recherche avancée et sauvegarde automatique.

---

## ✨ Fonctionnalités

### 🎨 Design Microsoft Office Authentique
- ✅ Rubans complets avec onglets et groupes
- ✅ Barres de titre colorées par application
- ✅ Icônes Font Awesome professionnelles
- ✅ Barres de statut contextuelles
- ✅ Typographie Calibri (police Office)

### 💾 Stockage Local
- ✅ Sauvegarde automatique dans localStorage
- ✅ 100% privé - pas de serveur
- ✅ Fonctionne hors-ligne
- ✅ Persistance des données

### 🚀 Performance
- ✅ Démarrage instantané
- ✅ Build ultra-rapide avec Vite
- ✅ Bundle optimisé (~200KB)
- ✅ 100% client-side

### 📱 Responsive
- ✅ Interface adaptative
- ✅ Navigation fluide
- ✅ Expérience desktop optimisée

---

## 🚀 Installation

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

**Vercel**
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**GitHub Pages**
```bash
npm run build
# Uploader le dossier dist/ sur la branche gh-pages
```

---

## 📖 Utilisation

### Page d'Accueil
1. Cliquez sur une application (Word, Excel, PowerPoint, Outlook)
2. Accédez aux documents récents
3. Utilisez les actions rapides

### Word
- **Écrire** : cliquez dans la zone de texte
- **Formater** : utilisez le ruban (Accueil, Insertion, etc.)
- **Sauvegarder** : Fichier → Sauvegarder
- **Charger** : Fichier → Ouvrir
- **Exporter** : Fichier → Exporter (HTML/TXT)

### Excel
- **Sélectionner** : cliquez sur une cellule
- **Formules** : commencez par `=` (ex: `=SUM(A1:A10)`)
- **Navigation** : Entrée (bas), Tab (droite)
- **Exporter** : bouton de téléchargement CSV

### PowerPoint
- **Ajouter** : Accueil → Nouvelle diapo
- **Modifier** : cliquez sur titre/contenu
- **Thème** : Création → sélectionnez un thème
- **Présenter** : bouton Play
- **Exporter** : bouton de téléchargement HTML

### Outlook
- **Lire** : cliquez sur un email
- **Répondre** : bouton Répondre
- **Nouveau** : bouton "Nouveau message"
- **Rechercher** : barre de recherche
- **Contacts** : bouton Contacts

---

## 🎨 Design System

### Couleurs Officielles
| Application | Couleur | Hex |
|------------|---------|-----|
| Word | Bleu | `#2b579a` |
| Excel | Vert | `#217346` |
| PowerPoint | Orange | `#d24726` |
| Outlook | Bleu clair | `#0078d4` |

### Typographie
- **Police** : Calibri, Arial, sans-serif
- **Taille de base** : 16px
- **Interlignage** : 1.8

### Composants
- **Ruban** : onglets + groupes de commandes
- **Boutons** : icônes Font Awesome + tooltips
- **Barres** : titre colorée + statut contextuelle
- **Zones** : édition avec marges professionnelles

---

## 📁 Structure

```
officerapide/
├── src/
│   ├── App.tsx              # Routeur principal
│   ├── apps/
│   │   ├── Home.tsx         # Page d'accueil
│   │   ├── WordApp.tsx      # Word
│   │   ├── SheetApp.tsx     # Excel
│   │   ├── SlideApp.tsx     # PowerPoint
│   │   └── MailApp.tsx      # Outlook
│   ├── components/
│   │   ├── Toast.tsx        # Notifications
│   │   └── DocumentList.tsx # Liste documents
│   ├── utils/
│   │   └── DocumentManager.ts
│   └── styles/
│       └── editor.css
├── public/
│   ├── icon.svg
│   ├── manifest.json
│   └── sw.js
└── index.html
```

---

## 🔧 Technologies

- **React 18** - Framework UI
- **TypeScript 5** - Typage statique
- **Tailwind CSS 3** - Styling
- **Vite 5** - Build tool
- **Font Awesome 6** - Icônes
- **localStorage** - Stockage

---

## 📊 Stats

```
Build:        ~200KB gzipped
Modules:      36
Components:   10
Apps:         4
Languages:    TypeScript, CSS
License:      MIT
```

---

## 🐛 Bugs Connus

- Formules Excel complexes peuvent être lentes
- Pas d'annulation/annulation (Ctrl+Z)
- Pas d'import de fichiers Office
- Emails simulés (pas d'envoi réel)

---

## 🚀 Roadmap

### v1.1 (Prochainement)
- [ ] Mode sombre
- [ ] Raccourcis clavier (Ctrl+S, Ctrl+Z)
- [ ] Templates de documents
- [ ] Annulation/Annulation

### v1.2
- [ ] Import/Export Office (docx, xlsx, pptx)
- [ ] Graphiques Excel
- [ ] Animations PowerPoint
- [ ] Pièces jointes Outlook

### v2.0
- [ ] Synchronisation cloud
- [ ] Collaboration temps réel
- [ ] Assistant IA
- [ ] Applications mobiles

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📝 Licence

MIT License - Voir [LICENSE](LICENSE) pour plus de détails

---

## 📧 Contact

- **GitHub Issues** : [Signaler un bug](https://github.com/votre-username/officerapide/issues)
- **Discussions** : [Poser une question](https://github.com/votre-username/officerapide/discussions)

---

## 🙏 Remerciements

- **Microsoft** - Inspiration du design
- **React Team** - Framework incroyable
- **Tailwind Labs** - CSS utility-first
- **Font Awesome** - Icônes professionnelles
- **Vite Team** - Build tool ultra-rapide

---

<div align="center">

**Fait avec ❤️ pour la productivité**

[⭐ Star this repo](https://github.com/votre-username/officerapide) • [🐛 Report Bug](https://github.com/votre-username/officerapide/issues) • [💡 Request Feature](https://github.com/votre-username/officerapide/issues)

</div>
