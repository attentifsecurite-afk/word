# 🏢 OfficeRapide - Suite Bureautique Professionnelle

**OfficeRapide** est une suite bureautique complète inspirée de Microsoft Office, développée avec React, TypeScript et Tailwind CSS. Elle offre une expérience utilisateur professionnelle avec un design moderne et intuitif.

## 📦 Applications Incluses

### 📝 Word - Traitement de Texte
**Design Microsoft Word authentique**

**Fonctionnalités :**
- **Ruban complet** avec onglets (Accueil, Insertion, Mise en page, Fichier)
- **Mise en forme riche** : gras, italique, souligné, couleurs, polices
- **Alignement** : gauche, centré, droite, justifié
- **Listes** : à puces et numérotées
- **Insertion** : images, liens, tableaux
- **Sauvegarde locale** : gestion de plusieurs documents
- **Export** : HTML, TXT
- **Impression** : fenêtre d'impression dédiée
- **Compteur** : mots et caractères en temps réel
- **Règle** : affichage de la règle en haut

**Interface :**
- Barre de titre bleue (#2b579a) style Word
- Ruban avec onglets et groupes de commandes
- Zone d'édition format A4 avec marges
- Barre de statut avec zoom et navigation

---

### 📊 Excel - Tableur
**Design Microsoft Excel authentique**

**Fonctionnalités :**
- **Grille complète** : 50 lignes × 26 colonnes (A-Z)
- **Formules avancées** :
  - `=SUM(A1:A10)` - Somme
  - `=AVG(B1:B5)` - Moyenne
  - `=A1+B1` - Calculs arithmétiques
  - Références cellulaires
- **Barre de formule** : édition directe avec indicateur fx
- **Ruban complet** : Accueil, Insertion, Formules, Données
- **Navigation clavier** : Entrée (bas), Tab (droite)
- **Export CSV** : compatible Excel, Google Sheets
- **Sauvegarde locale** : persistance des données

**Interface :**
- Barre de titre verte (#217346) style Excel
- Ruban avec onglets thématiques
- Grille de cellules avec en-têtes
- Barre de formule avec sélection de cellule
- Barre de statut avec compteurs

---

### 📽️ PowerPoint - Présentations
**Design Microsoft PowerPoint authentique**

**Fonctionnalités :**
- **Diapositives multiples** : ajout/suppression illimitées
- **7 thèmes** : dégradés de couleurs professionnels
- **Mode présentation** : plein écran avec navigation
- **Édition en direct** : titre et contenu modifiables
- **Aperçu miniature** : navigation visuelle à gauche
- **Ruban complet** : Accueil, Insertion, Création, Transitions
- **Export HTML** : présentation autonome

**Interface :**
- Barre de titre orange (#d24726) style PowerPoint
- Ruban avec onglets de création
- Volet des miniatures à gauche
- Zone d'édition centrale avec aperçu
- Mode diaporama immersif

---

### 📧 Outlook - Messagerie
**Design Microsoft Outlook authentique**

**Fonctionnalités :**
- **Interface 3 volets** : dossiers, liste, contenu
- **Gestion complète** :
  - Boîte de réception avec compteur de non lus
  - Emails envoyés (historique)
  - Brouillons (messages en cours)
  - Corbeille (avec restauration)
- **Composition d'emails** :
  - Nouveau message
  - Répondre avec citation automatique
  - Sauvegarder en brouillon
- **Recherche** : en temps réel sur tous les champs
- **Favoris** : marquage avec étoile ⭐
- **Carnet d'adresses** : gestion des contacts
- **Sauvegarde automatique** : localStorage

**Interface :**
- Barre de titre bleue (#0078d4) style Outlook
- Barre de recherche arrondie
- Volet des dossiers à gauche
- Liste des emails au centre
- Contenu de l'email à droite
- Barre de statut avec compteurs

---

## 🎨 Design Microsoft Office

### Couleurs Officielles
- **Word** : #2b579a (Bleu)
- **Excel** : #217346 (Vert)
- **PowerPoint** : #d24726 (Orange)
- **Outlook** : #0078d4 (Bleu clair)

### Éléments d'Interface
- **Barres de titre** : couleur de l'application avec icône
- **Rubans** : onglets avec groupes de commandes
- **Boutons** : icônes Font Awesome avec tooltips
- **Barres de statut** : fond coloré avec informations contextuelles

### Typographie
- **Police principale** : Calibri (Microsoft Office)
- **Tailles** : cohérentes avec Office
- **Interlignage** : 1.8 pour la lisibilité

---

## 🚀 Installation et Utilisation

### Développement Local

```bash
# Cloner le projet
git clone <repository-url>
cd officierapide

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build
```

### Déploiement

Le projet peut être déployé sur n'importe quel hébergeur statique :
- **Vercel** : `vercel deploy`
- **Netlify** : `netlify deploy`
- **GitHub Pages** : via GitHub Actions
- **Tout serveur web** : copier le dossier `dist/`

---

## 📁 Structure du Projet

```
officerapide/
├── src/
│   ├── App.tsx                 # Routeur principal
│   ├── apps/
│   │   ├── Home.tsx           # Page d'accueil Microsoft 365
│   │   ├── WordApp.tsx        # Traitement de texte
│   │   ├── SheetApp.tsx       # Tableur
│   │   ├── SlideApp.tsx       # Présentations
│   │   └── MailApp.tsx        # Messagerie
│   ├── components/
│   │   ├── Toast.tsx          # Notifications
│   │   └── DocumentList.tsx   # Liste des documents
│   ├── utils/
│   │   └── DocumentManager.ts # Gestion des documents
│   └── styles/
│       └── editor.css         # Styles personnalisés
├── public/
│   ├── icon.svg               # Icône PWA
│   ├── manifest.json          # Configuration PWA
│   └── sw.js                  # Service Worker
└── index.html                 # Point d'entrée
```

---

## 💾 Stockage des Données

### localStorage
Toutes les données sont stockées localement dans le navigateur :

- **Word** : `wordrapide_documents`
- **Excel** : `sheetrapide_doc`
- **PowerPoint** : `sliderapide_doc`
- **Outlook** : `mailrapide_emails`, `mailrapide_contacts`

### Capacités
- **Taille** : ~5-10 MB selon le navigateur
- **Persistance** : les données restent après fermeture
- **Privé** : 100% local, pas de serveur

### Limitations
- Vider le cache supprime les données
- Pas de synchronisation entre appareils
- Pas de sauvegarde cloud (à venir)

---

## 🎓 Guide d'Utilisation

### Page d'Accueil
1. **Applications** : cliquez sur une application pour l'ouvrir
2. **Documents récents** : accédez rapidement à vos derniers fichiers
3. **Démarrage rapide** : créez un nouveau document en un clic

### Word
1. **Écrire** : cliquez dans la zone de texte
2. **Mettre en forme** : utilisez le ruban
3. **Sauvegarder** : Fichier → Sauvegarder
4. **Charger** : Fichier → Ouvrir
5. **Exporter** : Fichier → Exporter

### Excel
1. **Sélectionner** : cliquez sur une cellule
2. **Entrer** : tapez une valeur ou formule
3. **Formules** : commencez par `=`
4. **Sauvegarder** : bouton dans la barre de titre
5. **Exporter** : bouton de téléchargement CSV

### PowerPoint
1. **Ajouter** : Accueil → Nouvelle diapo
2. **Modifier** : cliquez sur le titre ou contenu
3. **Thème** : Création → sélectionnez un thème
4. **Présenter** : bouton Play dans la barre de titre
5. **Naviguer** : flèches ou boutons en mode présentation

### Outlook
1. **Lire** : cliquez sur un email dans la liste
2. **Répondre** : bouton Répondre dans l'email
3. **Nouveau** : bouton "Nouveau message" en haut
4. **Rechercher** : barre de recherche en haut
5. **Contacts** : bouton Contacts dans le volet gauche

---

## 🔧 Personnalisation

### Ajouter un Thème PowerPoint
```typescript
// Dans SlideApp.tsx
const backgrounds = [
  // ... thèmes existants
  'from-yellow-500 to-orange-600', // Nouveau thème
];
```

### Ajouter une Fonction Excel
```typescript
// Dans SheetApp.tsx - evaluateFormula()
const maxMatch = expr.match(/^MAX\(([A-Z])(\d+):([A-Z])(\d+)\)$/);
if (maxMatch) {
  // Implémentation de MAX
}
```

### Modifier les Couleurs
```typescript
// Dans chaque application
<div className="bg-[#VOTRE_COULEUR]">
```

---

## 🐛 Problèmes Connus

- Les formules complexes peuvent être lentes sur de grandes plages
- Pas d'annulation/annulation dans Excel (à venir)
- Pas d'import de fichiers Office (à venir)
- Les emails ne sont pas envoyés réellement (simulation)

---

## 🚀 Améliorations Futures

### Court Terme
- [ ] Mode sombre
- [ ] Raccourcis clavier (Ctrl+S, Ctrl+Z, etc.)
- [ ] Annulation/Annulation dans toutes les apps
- [ ] Templates de documents

### Moyen Terme
- [ ] Import/Export Office (docx, xlsx, pptx)
- [ ] Graphiques dans Excel
- [ ] Animations dans PowerPoint
- [ ] Pièces jointes dans Outlook

### Long Terme
- [ ] Synchronisation cloud
- [ ] Collaboration en temps réel
- [ ] Assistant IA intégré
- [ ] Applications mobiles

---

## 📊 Technologies

- **React 18** : Framework UI
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling utility-first
- **Vite** : Build tool ultra-rapide
- **Font Awesome 6** : Icônes
- **localStorage** : Stockage local

---

## 📝 Licence

MIT License - Libre d'utilisation, de modification et de distribution

---

## 🤝 Contribution

Les contributions sont les bienvenues !
- Signaler des bugs
- Proposer des fonctionnalités
- Soumettre des pull requests
- Améliorer la documentation

---

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**OfficeRapide** - Votre suite bureautique professionnelle, gratuite et open source ! 🚀

*Inspiré de Microsoft Office - Conçu avec ❤️ pour la productivité*
