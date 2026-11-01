# 🏢 OfficeRapide - Suite Bureautique Complète

Une suite bureautique complète et professionnelle inspirée de Microsoft Office, entièrement développée en React avec TypeScript et Tailwind CSS.

## 📦 Applications incluses

### 📝 WordRapide - Traitement de texte
- **Édition riche** : Gras, italique, souligné, couleurs, polices
- **Mise en page** : Alignement, listes, tableaux
- **Sauvegarde locale** : Gestion de plusieurs documents
- **Export** : HTML, TXT
- **Impression** : Fenêtre d'impression dédiée
- **Compteur** : Mots et caractères en temps réel

### 📊 SheetRapide - Tableur
- **Grille complète** : 50 lignes × 26 colonnes (A-Z)
- **Formules** : SUM(), AVG(), références cellulaires
- **Calculs** : Opérations arithmétiques (+, -, *, /)
- **Barre de formule** : Édition directe des formules
- **Export CSV** : Compatible Excel, Google Sheets
- **Sauvegarde locale** : Persistance des données

### 📽️ SlideRapide - Présentations
- **Diapositives multiples** : Ajout/suppression illimitées
- **Thèmes** : 7 dégradés de couleurs
- **Mode présentation** : Plein écran avec navigation
- **Édition en direct** : Titre et contenu modifiables
- **Aperçu miniature** : Navigation visuelle
- **Export HTML** : Présentation autonome

## 🎯 Fonctionnalités communes

### 💾 Gestion des fichiers
- Sauvegarde locale (localStorage)
- Chargement de documents
- Export dans différents formats
- Noms de fichiers éditables

### 🎨 Interface utilisateur
- Design moderne et responsive
- Barres d'outils intuitives
- Notifications toast
- Barres de statut informatives
- Navigation fluide entre applications

### ⚡ Performance
- Démarrage instantané
- 100% client-side
- Pas de serveur requis
- Fonctionne hors-ligne

## 🚀 Installation et utilisation

### Développement local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build
```

### Déploiement

Le projet peut être déployé sur n'importe quel hébergeur statique :
- Vercel
- Netlify
- GitHub Pages
- Tout serveur web statique

## 📁 Structure du projet

```
src/
├── App.tsx                 # Routeur principal
├── apps/
│   ├── Home.tsx           # Page d'accueil
│   ├── WordApp.tsx        # Traitement de texte
│   ├── SheetApp.tsx       # Tableur
│   └── SlideApp.tsx       # Présentations
├── components/
│   ├── Toolbar.tsx        # Barre d'outils Word
│   ├── PageArea.tsx       # Zone d'édition
│   ├── StatusBar.tsx      # Barre de statut
│   ├── Toast.tsx          # Notifications
│   ├── DocumentList.tsx   # Liste des documents
│   └── AIAssistant.tsx    # Assistant IA (optionnel)
├── utils/
│   └── DocumentManager.ts # Gestion des documents
└── styles/
    └── editor.css         # Styles de l'éditeur
```

## 🎓 Guide d'utilisation

### WordRapide

1. **Créer un document** : Cliquez sur "Nouveau"
2. **Écrire** : Cliquez dans la zone de texte et tapez
3. **Mettre en forme** : Utilisez la barre d'outils
4. **Sauvegarder** : Cliquez sur "Sauvegarder"
5. **Charger** : Cliquez sur "Charger" pour voir vos documents
6. **Exporter** : Menu "Exporter" → HTML ou TXT

### SheetRapide

1. **Sélectionner une cellule** : Cliquez dessus
2. **Entrer une valeur** : Tapez directement ou dans la barre de formule
3. **Formules** :
   - `=SUM(A1:A10)` : Somme de A1 à A10
   - `=AVG(B1:B5)` : Moyenne de B1 à B5
   - `=A1+B1` : Addition
   - `=A1*B1` : Multiplication
4. **Navigation** : Entrée (bas), Tab (droite)
5. **Exporter** : Cliquez sur "Exporter CSV"

### SlideRapide

1. **Ajouter une diapositive** : Cliquez sur "Ajouter"
2. **Modifier** : Cliquez sur le titre ou le contenu
3. **Changer le thème** : Sélectionnez un arrière-plan
4. **Naviguer** : Cliquez sur les miniatures à gauche
5. **Présenter** : Cliquez sur "Présenter" pour le mode plein écran
6. **Navigation présentation** : Flèches gauche/droite ou boutons

## 🔧 Technologies utilisées

- **React 18** : Framework UI
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling utility-first
- **Vite** : Build tool ultra-rapide
- **Font Awesome** : Icônes

## 📊 Fonctionnalités avancées

### Formules du tableur

Le tableur supporte :
- **Fonctions** : SUM(), AVG()
- **Références** : A1, B2, etc.
- **Opérations** : +, -, *, /
- **Plages** : A1:A10, B2:C5

### Thèmes de présentation

7 thèmes prédéfinis :
1. Bleu → Violet
2. Vert → Turquoise
3. Orange → Rouge
4. Rose → Rouge rosé
5. Indigo → Bleu
6. Gris foncé → Noir
7. Blanc → Gris clair

## 🎨 Personnalisation

### Ajouter un thème de présentation

Modifiez `src/apps/SlideApp.tsx` :

```typescript
const backgrounds = [
  // ... thèmes existants
  'from-yellow-500 to-orange-600', // Nouveau thème
];
```

### Ajouter une fonction au tableur

Modifiez `src/apps/SheetApp.tsx` dans `evaluateFormula()` :

```typescript
// Exemple : fonction MAX
const maxMatch = expr.match(/^MAX\(([A-Z])(\d+):([A-Z])(\d+)\)$/);
if (maxMatch) {
  // Implémentation...
}
```

## 🐛 Problèmes connus

- Les formules complexes peuvent être lentes sur de grandes plages
- Pas d'annulation/annulation dans le tableur (à venir)
- Pas d'import de fichiers (à venir)

## 🚀 Améliorations futures

- [ ] Assistant IA intégré (Gemini)
- [ ] Collaboration en temps réel
- [ ] Import/Export Office (docx, xlsx, pptx)
- [ ] Mode hors-ligne avancé (PWA)
- [ ] Thèmes personnalisables
- [ ] Historique des versions
- [ ] Templates de documents
- [ ] Graphiques dans le tableur
- [ ] Animations dans les présentations

## 📝 Licence

MIT License - Libre d'utilisation

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des fonctionnalités
- Soumettre des pull requests

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**OfficeRapide** - Votre suite bureautique complète, rapide et gratuite ! 🚀
