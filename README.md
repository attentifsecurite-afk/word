# 🚀 WordRapide - Éditeur de Texte Installable

Application de traitement de texte rapide et complète, **installable sur Mac et Windows** comme une application native.

## ✨ Fonctionnalités

### 📝 Édition complète
- Mise en forme riche (gras, italique, souligné, couleurs)
- 10 polices différentes
- Alignement du texte
- Listes à puces et numérotées
- Insertion de liens, images et tableaux
- Indentation et retraits

### 💾 Gestion des documents
- Sauvegarde locale automatique
- Export HTML et TXT
- Impression
- Multi-documents

### 🎨 Interface professionnelle
- Barre d'outils style Microsoft Word
- Zone d'édition format A4
- Compteur de mots et caractères
- Mode hors-ligne

## 🚀 Installation Automatique

### Lien d'installation directe
Partagez ce lien pour une installation en 1 clic :
```
https://votre-domaine.com/install.html
```

### Comment ça marche ?

1. **L'utilisateur ouvre le lien** → La page s'ouvre
2. **Après 0.5 seconde** → Le prompt d'installation apparaît automatiquement
3. **L'utilisateur clique "Installer"** → L'app s'installe instantanément
4. **C'est tout !** → WordRapide est maintenant sur son ordinateur

### Fonctionnalités d'installation automatique

✅ **Auto-détection** : Le bouton d'installation apparaît automatiquement  
✅ **Auto-trigger** : Le prompt d'installation se déclenche tout seul après 500ms  
✅ **Bouton flottant** : Un bouton bien visible en bas à droite  
✅ **Banner d'installation** : Bannière en haut avec déclenchement automatique  
✅ **Page dédiée** : `/install.html` optimisée pour le partage  

## 📱 Installation manuelle

### Sur Mac (macOS)

**Avec Chrome :**
1. Ouvrez l'application dans Chrome
2. Cliquez sur l'icône ⊕ dans la barre d'adresse
3. Ou : Menu → Plus d'outils → Créer un raccourci
4. Cochez "Ouvrir dans une fenêtre"
5. Cliquez sur "Créer"

**Avec Safari :**
1. Ouvrez l'application dans Safari
2. Menu Fichier → Ajouter au Dock
3. L'app apparaît dans votre Dock

### Sur Windows

**Avec Chrome :**
1. Ouvrez l'application dans Chrome
2. Cliquez sur l'icône ⊕ dans la barre d'adresse
3. Ou : Menu → Installer WordRapide
4. Cliquez sur "Installer"

**Avec Edge :**
1. Ouvrez l'application dans Edge
2. Cliquez sur ... (menu)
3. Applications → Installer ce site en tant qu'application
4. Cliquez sur "Installer"

## 🎯 Avantages de l'installation

- ✅ **Fonctionne hors-ligne** : Pas besoin d'internet
- ✅ **Fenêtre dédiée** : Pas de barre d'adresse du navigateur
- ✅ **Raccourci bureau** : Accès rapide depuis le bureau
- ✅ **Lancement rapide** : Démarre instantanément
- ✅ **Icône personnalisée** : Apparaît comme une app native
- ✅ **100% privé** : Vos données restent sur votre ordinateur

## 🔗 Liens disponibles

| URL | Description |
|-----|-------------|
| `/` | Application principale |
| `/install.html` | Page d'installation dédiée (auto-trigger) |
| `/?install=true` | Ouvre le modal d'installation |
| `/#install` | Alternative via hash |

## 🛠️ Technologies

- **React** + **TypeScript**
- **Tailwind CSS** pour le design
- **PWA** (Progressive Web App)
- **Service Worker** pour le mode hors-ligne
- **Manifest.json** pour l'installation

## 📦 Structure du projet

```
public/
├── icon.svg          # Icône de l'app
├── manifest.json     # Configuration PWA
├── sw.js            # Service Worker (offline)
└── install.html     # Page d'installation dédiée

src/
├── components/
│   ├── Toolbar.tsx           # Barre d'outils
│   ├── PageArea.tsx          # Zone d'édition
│   ├── StatusBar.tsx         # Barre de statut
│   ├── InstallBanner.tsx     # Bannière d'installation
│   ├── InstallFloatingBtn.tsx # Bouton flottant
│   ├── InstallPage.tsx       # Modal d'installation
│   └── InstallHelp.tsx       # Aide à l'installation
├── hooks/
│   └── useInstallPrompt.ts   # Hook d'installation
└── App.tsx                   # Composant principal
```

## 🎨 Personnalisation

### Changer les couleurs
Modifiez `public/manifest.json` :
```json
{
  "theme_color": "#2563eb",
  "background_color": "#f3f4f6"
}
```

### Changer l'icône
Remplacez `public/icon.svg` par votre propre icône (format SVG recommandé).

## 📝 Licence

MIT License - Libre d'utilisation

---

**WordRapide** - Créé avec ❤️ pour une édition rapide et efficace
