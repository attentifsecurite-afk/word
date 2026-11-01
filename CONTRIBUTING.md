# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à OfficeRapide ! Ce document fournit les directives pour contribuer au projet.

## 📋 Table des Matières

- [Code de Conduite](#-code-de-conduite)
- [Comment Contribuer](#-comment-contribuer)
- [Style de Code](#-style-de-code)
- [Processus de Pull Request](#-processus-de-pull-request)
- [Signaler des Bugs](#-signaler-des-bugs)
- [Proposer des Fonctionnalités](#-proposer-des-fonctionnalités)

---

## 📜 Code de Conduite

### Notre Engagement

Dans l'intér de favoriser un environnement ouvert et accueillant, nous nous engageons à faire de la participation à notre projet une expérience sans harcèlement pour tout le monde, quel que soit l'âge, la taille, le handicap, l'origine ethnique, les caractéristiques sexuelles, l'identité de genre et l'expression, le niveau d'expérience, l'éducation, le statut socio-économique, la nationalité, l'apparence personnelle, la race, la religion ou l'identité et l'orientation sexuelles.

### Nos Standards

Exemples de comportements qui contribuent à créer un environnement positif :

- ✅ Utiliser un langage accueillant et inclusif
- ✅ Respecter les points de vue et expériences différents
- ✅ Accepter gracieusement les critiques constructives
- ✅ Se concentrer sur ce qui est le mieux pour la communauté
- ✅ Faire preuve d'empathie envers les autres membres de la communauté

Exemples de comportements inacceptables :

- ❌ Utilisation de langage ou d'images sexualisés et attention sexuelle importune
- ❌ Trollage, commentaires insultants/désobligeants et attaques personnelles ou politiques
- ❌ Harcèlement public ou privé
- ❌ Publication d'informations privées d'autrui
- ❌ Autre conduite qui pourrait raisonnablement être considérée comme inappropriée

---

## 🚀 Comment Contribuer

### 1. Fork le Projet

```bash
# Cliquez sur le bouton "Fork" sur GitHub
# Ou via CLI :
gh repo fork votre-username/officerapide
```

### 2. Cloner votre Fork

```bash
git clone https://github.com/votre-username/officerapide.git
cd officerapide
```

### 3. Créer une Branche

```bash
# Pour une nouvelle fonctionnalité
git checkout -b feature/ma-fonctionnalite

# Pour une correction de bug
git checkout -b fix/mon-correctif

# Pour une amélioration de documentation
git checkout -b docs/ma-documentation
```

### 4. Faire vos Modifications

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Faire vos modifications...
```

### 5. Tester vos Modifications

```bash
# Vérifier le build
npm run build

# Vérifier les erreurs TypeScript
npm run lint
```

### 6. Commit vos Changements

```bash
git add .
git commit -m "feat: ajout de ma fonctionnalité"
```

### 7. Push vers votre Fork

```bash
git push origin feature/ma-fonctionnalite
```

### 8. Ouvrir une Pull Request

- Allez sur votre fork sur GitHub
- Cliquez sur "Compare & pull request"
- Remplissez le template de PR
- Soumettez votre PR

---

## 💻 Style de Code

### TypeScript

```typescript
// ✅ Bon
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): User | null {
  // ...
}

// ❌ Mauvais
interface user {
  id: any;
  name: any;
}

function getUser(id) {
  // ...
}
```

### React Components

```typescript
// ✅ Bon
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ 
  label, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  return (
    <button onClick={onClick} className={variant}>
      {label}
    </button>
  );
}

// ❌ Mauvais
export default function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### Tailwind CSS

```typescript
// ✅ Bon
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Titre</h2>
</div>

// ❌ Mauvais
<div style={{ display: 'flex', padding: '24px', background: 'white' }}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Titre</h2>
</div>
```

### Nommage

```typescript
// ✅ Bon
// Composants : PascalCase
function WordApp() { }

// Fonctions : camelCase
function handleSave() { }

// Variables : camelCase
const wordCount = 0;

// Constantes : UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 1024 * 1024;

// Types/Interfaces : PascalCase
interface Document { }
type AppType = 'word' | 'excel';

// ❌ Mauvais
function word_app() { }
const WordCount = 0;
const maxFileSize = 1024;
```

### Commits

Utilisez la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```bash
# Fonctionnalités
feat: ajout du mode sombre
feat(word): ajout de l'export PDF

# Corrections
fix: correction du bug de sauvegarde
fix(excel): calcul des formules corrigé

# Documentation
docs: mise à jour du README
docs(api): ajout des exemples

# Style
style: formatage du code
style(css): amélioration des couleurs

# Refactoring
refactor: optimisation des performances
refactor(word): extraction du composant Toolbar

# Tests
test: ajout des tests unitaires
test(excel): tests des formules

# Build
build: mise à jour des dépendances
chore: configuration de Vite
```

---

## 🔍 Processus de Pull Request

### Template de PR

```markdown
## Description
Décrivez vos modifications en détail.

## Type de changement
- [ ] Bug fix (correction non-breaking)
- [ ] Nouvelle fonctionnalité (changement non-breaking)
- [ ] Breaking change (correction ou fonctionnalité qui casse)
- [ ] Documentation (mise à jour de la documentation)

## Comment a été testé ?
Décrivez les tests que vous avez effectués.

## Checklist
- [ ] Mon code suit le style de code du projet
- [ ] J'ai commenté mon code dans les zones complexes
- [ ] J'ai mis à jour la documentation
- [ ] Mes modifications ne génèrent pas de nouveaux warnings
- [ ] J'ai ajouté des tests qui prouvent que ma correction/fonctionnalité fonctionne
- [ ] Les tests unitaires existants passent localement
- [ ] Tous les changements dépendants ont été fusionnés et publiés

## Screenshots (si applicable)
Ajoutez des captures d'écran pour montrer les changements visuels.

## Issues liées
Closes #123
```

### Review Process

1. **Automated Checks** : Les tests et le lint doivent passer
2. **Code Review** : Au moins un maintainer doit approuver
3. **Discussion** : Répondez aux commentaires
4. **Merge** : Une fois approuvé, votre PR sera fusionnée

---

## 🐛 Signaler des Bugs

### Utiliser les Issues GitHub

1. Allez sur [Issues](https://github.com/votre-username/officerapide/issues)
2. Cliquez sur "New Issue"
3. Sélectionnez le template "Bug Report"
4. Remplissez les informations

### Template de Bug Report

```markdown
## Description du Bug
Une description claire et concise du bug.

## Étapes pour Reproduire
1. Aller à '...'
2. Cliquer sur '....'
3. Scroller jusqu'à '....'
4. Voir l'erreur

## Comportement Attendu
Une description claire de ce que vous attendiez.

## Comportement Actuel
Une description claire de ce qui se passe.

## Screenshots
Si applicable, ajoutez des captures d'écran.

## Environnement
- OS: [e.g. macOS, Windows, Linux]
- Navigateur: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]

## Contexte Additionnel
Ajoutez tout autre contexte sur le problème.
```

---

## 💡 Proposer des Fonctionnalités

### Feature Requests

1. Allez sur [Issues](https://github.com/votre-username/officerapide/issues)
2. Cliquez sur "New Issue"
3. Sélectionnez le template "Feature Request"
4. Décrivez votre idée

### Template de Feature Request

```markdown
## Votre demande de fonctionnalité est-elle liée à un problème ?
Une description claire et concise du problème.

## Décrivez la solution que vous souhaitez
Une description claire de ce que vous voulez qu'il se passe.

## Décrivez les alternatives que vous avez considérées
Une description claire de toutes les solutions ou fonctionnalités alternatives que vous avez considérées.

## Contexte Additionnel
Ajoutez tout autre contexte ou captures d'écran sur la demande de fonctionnalité.
```

---

## 📚 Documentation

### Améliorer la Documentation

La documentation est aussi importante que le code ! Vous pouvez contribuer en :

- Corrigeant des fautes de frappe
- Clarifiant des sections confuses
- Ajoutant des exemples
- Traduisant dans d'autres langues
- Mettant à jour les captures d'écran

### Structure de la Documentation

```
docs/
├── README.md              # Documentation principale
├── GUIDE_UTILISATION.md   # Guide utilisateur
├── API.md                 # Documentation API
├── CONTRIBUTING.md        # Guide de contribution
└── CHANGELOG.md           # Journal des modifications
```

---

## 🎨 Design Contributions

### Fichiers Design

Si vous contribuez au design :

- Utilisez Figma ou Sketch
- Exportez en SVG pour les icônes
- Respectez le design system existant
- Documentez vos choix de design

### Design System

- **Couleurs** : Utilisez les couleurs officielles Microsoft Office
- **Typographie** : Calibri, Arial, sans-serif
- **Espacements** : Multiples de 4px (4, 8, 12, 16, 24, 32, 48)
- **Ombres** : Subtiles et professionnelles

---

## 🧪 Tests

### Écrire des Tests

```typescript
// tests/WordApp.test.tsx
import { render, screen } from '@testing-library/react';
import WordApp from '../apps/WordApp';

describe('WordApp', () => {
  it('rend la barre de titre', () => {
    render(<WordApp />);
    expect(screen.getByText('Document1')).toBeInTheDocument();
  });

  it('sauvegarde le document', () => {
    // ...
  });
});
```

### Lancer les Tests

```bash
# Tous les tests
npm test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

---

## 📦 Releases

### Versioning

Nous utilisons [Semantic Versioning](https://semver.org/) :

- **MAJOR** : Changements incompatibles
- **MINOR** : Nouvelles fonctionnalités (rétro-compatible)
- **PATCH** : Corrections de bugs (rétro-compatible)

### Changelog

Maintenez le [CHANGELOG.md](./CHANGELOG.md) à jour avec vos modifications.

---

## 🤔 Besoin d'Aide ?

- **Documentation** : Lisez la [documentation](./README.md)
- **Issues** : Consultez les [issues existantes](https://github.com/votre-username/officerapide/issues)
- **Discussions** : Rejoignez les [discussions GitHub](https://github.com/votre-username/officerapide/discussions)
- **Discord** : Rejoignez notre serveur (lien à venir)

---

## 🎉 Merci !

Merci de contribuer à OfficeRapide ! Votre aide est précieuse pour faire de ce projet une suite bureautique exceptionnelle.

---

<div align="center">

**Ensemble, construisons la meilleure suite bureautique open source !** 🚀

</div>
