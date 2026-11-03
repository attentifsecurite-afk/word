# 💾 Guide d'Accès aux Fichiers Locaux

## 🎯 Nouvelles Fonctionnalités

OfficeRapide peut maintenant **accéder directement aux fichiers de votre ordinateur** (Mac/Windows/Linux) pour ouvrir et sauvegarder vos documents.

---

## 📂 Ouvrir des Fichiers depuis Votre Ordinateur

### Word - Traitement de Texte

**Méthode 1 : Menu Fichier**
1. Cliquez sur l'onglet **Fichier**
2. Cliquez sur **Ouvrir depuis...**
3. Sélectionnez un fichier sur votre ordinateur
4. Le document s'ouvre dans Word

**Formats supportés :**
- `.txt` - Texte brut
- `.html` / `.htm` - Pages web
- `.md` - Markdown
- `.rtf` - Rich Text Format

**Méthode 2 : Raccourci clavier**
- `Ctrl+O` (à venir)

### Excel - Tableur

**Méthode 1 : Onglet Données**
1. Cliquez sur l'onglet **Données**
2. Cliquez sur **Ouvrir depuis...**
3. Sélectionnez un fichier CSV
4. Le tableur se remplit avec les données

**Formats supportés :**
- `.csv` - Fichiers CSV (compatible Excel, Numbers, Google Sheets)
- `.txt` - Texte avec séparateurs

**Méthode 2 : Importer CSV**
- Cliquez sur **Importer CSV** pour une méthode alternative

### PowerPoint - Présentations

**Méthode 1 : Barre de titre**
1. Cliquez sur l'icône **📁+** (dossier avec plus)
2. Sélectionnez un fichier JSON de présentation
3. La présentation s'ouvre

**Formats supportés :**
- `.json` - Présentations OfficeRapide

### Outlook - Messagerie

**Méthode 1 : Barre de titre**
1. Cliquez sur **Importer**
2. Sélectionnez un fichier JSON de sauvegarde
3. Les emails et contacts sont importés

**Formats supportés :**
- `.json` - Sauvegardes OfficeRapide

---

## 💿 Sauvegarder des Fichiers sur Votre Ordinateur

### Word - Traitement de Texte

**Méthode 1 : Enregistrer sur... (HTML)**
1. Cliquez sur l'onglet **Fichier**
2. Cliquez sur **Enregistrer sur...**
3. Choisissez l'emplacement sur votre ordinateur
4. Le document est sauvegardé en HTML

**Méthode 2 : Enregistrer en TXT**
1. Cliquez sur l'onglet **Fichier**
2. Cliquez sur **Enregistrer en TXT**
3. Choisissez l'emplacement
4. Le document est sauvegardé en texte brut

### Excel - Tableur

**Méthode 1 : Enregistrer sur...**
1. Cliquez sur l'onglet **Données**
2. Cliquez sur **Enregistrer sur...**
3. Choisissez l'emplacement
4. Le tableur est sauvegardé en CSV

**Compatible avec :**
- Microsoft Excel
- Apple Numbers
- Google Sheets
- LibreOffice Calc

### PowerPoint - Présentations

**Méthode 1 : Barre de titre**
1. Cliquez sur l'icône **💾** (disque dur)
2. Choisissez l'emplacement
3. La présentation est sauvegardée en JSON

### Outlook - Messagerie

**Méthode 1 : Barre de titre**
1. Cliquez sur **Exporter**
2. Choisissez l'emplacement
3. Les emails et contacts sont sauvegardés en JSON

---

## 🔧 Compatibilité Navigateur

### ✅ Navigateurs Supportés

**Chrome/Edge (Recommandé)**
- ✅ API File System Access complète
- ✅ Dialogue natif d'ouverture/sauvegarde
- ✅ Accès direct au système de fichiers
- ✅ Meilleure expérience utilisateur

**Firefox**
- ✅ Fallback sur input/output classiques
- ✅ Fonctionne parfaitement
- ⚠️ Dialogue de fichier standard

**Safari**
- ✅ Fallback sur input/output classiques
- ✅ Fonctionne parfaitement
- ⚠️ Dialogue de fichier standard

### 🎯 Différences

**Avec File System Access API (Chrome/Edge)**
```
✅ Dialogue natif du système d'exploitation
✅ Choix de l'emplacement précis
✅ Modification du fichier existant
✅ Pas de téléchargement temporaire
```

**Avec Fallback (Firefox/Safari)**
```
✅ Fonctionne sur tous les navigateurs
⚠️ Téléchargement dans le dossier Downloads
⚠️ Nécessite de déplacer le fichier manuellement
```

---

## 📋 Guide par Système d'Exploitation

### 🍎 macOS

**Ouvrir un fichier :**
1. Cliquez sur "Ouvrir depuis..."
2. Le Finder s'ouvre
3. Naviguez jusqu'à votre fichier
4. Cliquez sur "Ouvrir"

**Sauvegarder un fichier :**
1. Cliquez sur "Enregistrer sur..."
2. Le Finder s'ouvre
3. Choisissez l'emplacement (Documents, Bureau, etc.)
4. Cliquez sur "Enregistrer"

**Emplacements recommandés :**
- `~/Documents/OfficeRapide/` - Organisez vos documents
- `~/Desktop/` - Accès rapide
- `~/Downloads/` - Fichiers temporaires

### 🪟 Windows

**Ouvrir un fichier :**
1. Cliquez sur "Ouvrir depuis..."
2. L'Explorateur de fichiers s'ouvre
3. Naviguez jusqu'à votre fichier
4. Cliquez sur "Ouvrir"

**Sauvegarder un fichier :**
1. Cliquez sur "Enregistrer sur..."
2. L'Explorateur de fichiers s'ouvre
3. Choisissez l'emplacement (Documents, Bureau, etc.)
4. Cliquez sur "Enregistrer"

**Emplacements recommandés :**
- `C:\Users\[Nom]\Documents\OfficeRapide\`
- `C:\Users\[Nom]\Desktop\`
- `C:\Users\[Nom]\Downloads\`

### 🐧 Linux

**Ouvrir un fichier :**
1. Cliquez sur "Ouvrir depuis..."
2. Le gestionnaire de fichiers s'ouvre
3. Naviguez jusqu'à votre fichier
4. Cliquez sur "Ouvrir"

**Sauvegarder un fichier :**
1. Cliquez sur "Enregistrer sur..."
2. Le gestionnaire de fichiers s'ouvre
3. Choisissez l'emplacement
4. Cliquez sur "Enregistrer"

**Emplacements recommandés :**
- `~/Documents/OfficeRapide/`
- `~/Desktop/`
- `~/Downloads/`

---

## 💡 Conseils d'Utilisation

### Organisation des Fichiers

**Créez une structure de dossiers :**
```
Documents/
└── OfficeRapide/
    ├── Word/
    │   ├── Lettres/
    │   ├── Rapports/
    │   └── CV/
    ├── Excel/
    │   ├── Budgets/
    │   └── Inventaires/
    ├── PowerPoint/
    │   ├── Présentations/
    │   └── Pitchs/
    └── Outlook/
        └── Sauvegardes/
```

### Nommage des Fichiers

**Bonnes pratiques :**
- ✅ `Rapport_Q1_2024.html`
- ✅ `Budget_Janvier_2024.csv`
- ✅ `Présentation_Client_ABC.json`
- ❌ `document1.html`
- ❌ `sans titre.csv`

### Sauvegardes Régulières

**Recommandations :**
1. **Exportez** vos documents importants régulièrement
2. **Sauvegardez** sur un disque externe ou cloud
3. **Vérifiez** que les fichiers s'ouvrent correctement
4. **Gardez** plusieurs versions si nécessaire

---

## 🔒 Sécurité et Confidentialité

### ✅ Sécurité

**Vos données sont protégées :**
- ✅ Aucun fichier n'est envoyé sur internet
- ✅ Tout reste sur votre ordinateur
- ✅ Vous contrôlez où les fichiers sont sauvegardés
- ✅ Pas de serveur externe

### 🔐 Permissions

**Chrome/Edge :**
- Le navigateur demande l'autorisation d'accéder aux fichiers
- Vous devez approuver chaque accès
- Vous pouvez révoquer les permissions à tout moment

**Firefox/Safari :**
- Utilise les dialogues de fichier standard
- Pas de permissions supplémentaires nécessaires

---

## 🐛 Dépannage

### "Impossible d'ouvrir le fichier"

**Causes possibles :**
- Format de fichier non supporté
- Fichier corrompu
- Permissions insuffisantes

**Solutions :**
1. Vérifiez l'extension du fichier
2. Essayez d'ouvrir le fichier avec un autre logiciel
3. Vérifiez les permissions du fichier
4. Utilisez "Importer" au lieu de "Ouvrir depuis..."

### "Impossible d'enregistrer le fichier"

**Causes possibles :**
- Emplacement protégé
- Espace disque insuffisant
- Permissions d'écriture insuffisantes

**Solutions :**
1. Choisissez un autre emplacement
2. Vérifiez l'espace disque disponible
3. Essayez d'enregistrer sur le Bureau
4. Utilisez "Exporter" au lieu de "Enregistrer sur..."

### "Le fichier ne s'ouvre pas correctement"

**Causes possibles :**
- Format incorrect
- Encodage de caractères différent
- Fichier partiellement corrompu

**Solutions :**
1. Vérifiez que le fichier a été créé par OfficeRapide
2. Essayez d'ouvrir le fichier avec un éditeur de texte
3. Vérifiez l'encodage (UTF-8 recommandé)
4. Importez le fichier au lieu de l'ouvrir

---

## 📊 Comparaison des Méthodes

### Sauvegarde Locale vs Export sur Ordinateur

| Caractéristique | Sauvegarde Locale | Export sur Ordinateur |
|----------------|-------------------|----------------------|
| **Emplacement** | localStorage (navigateur) | Système de fichiers |
| **Accessibilité** | Depuis OfficeRapide uniquement | Depuis n'importe quelle app |
| **Portabilité** | Non | Oui |
| **Sauvegarde** | Automatique | Manuelle |
| **Risque de perte** | Si cache vidé | Aucun |
| **Recommandé pour** | Travail en cours | Archives, partage |

### Quand Utiliser Quoi ?

**Sauvegarde Locale :**
- ✅ Travail en cours
- ✅ Brouillons
- ✅ Accès rapide
- ✅ Versionnement automatique

**Export sur Ordinateur :**
- ✅ Documents finaux
- ✅ Partage avec d'autres
- ✅ Sauvegarde externe
- ✅ Archivage long terme

---

## 🎓 Exemples d'Utilisation

### Scénario 1 : Rédaction d'un Rapport

1. **Créez** un nouveau document dans Word
2. **Rédigez** votre rapport
3. **Sauvegardez** localement (Ctrl+S) régulièrement
4. **Une fois terminé**, cliquez sur "Enregistrer sur..."
5. **Choisissez** `Documents/OfficeRapide/Word/Rapports/`
6. **Nommez** le fichier `Rapport_Q1_2024.html`
7. **Cliquez** sur "Enregistrer"

### Scénario 2 : Création d'un Budget

1. **Ouvrez** Excel
2. **Créez** votre budget
3. **Cliquez** sur "Enregistrer sur..."
4. **Choisissez** `Documents/OfficeRapide/Excel/Budgets/`
5. **Nommez** le fichier `Budget_2024.csv`
6. **Cliquez** sur "Enregistrer"
7. **Ouvrez** le fichier avec Excel pour vérifier

### Scénario 3 : Préparation d'une Présentation

1. **Créez** votre présentation dans PowerPoint
2. **Cliquez** sur l'icône 💾 (disque dur)
3. **Choisissez** `Documents/OfficeRapide/PowerPoint/`
4. **Nommez** le fichier `Présentation_Client.json`
5. **Cliquez** sur "Enregistrer"
6. **Testez** en rouvrant le fichier

### Scénario 4 : Sauvegarde des Emails

1. **Ouvrez** Outlook
2. **Cliquez** sur "Exporter"
3. **Choisissez** `Documents/OfficeRapide/Outlook/Sauvegardes/`
4. **Nommez** le fichier `Backup_Emails_2024-01.json`
5. **Cliquez** sur "Enregistrer"
6. **Copiez** le fichier sur un disque externe

---

## 🚀 Améliorations Futures

### Court Terme
- [ ] Support des fichiers .docx (Word)
- [ ] Support des fichiers .xlsx (Excel)
- [ ] Support des fichiers .pptx (PowerPoint)
- [ ] Conversion automatique de formats
- [ ] Aperçu des fichiers avant ouverture

### Moyen Terme
- [ ] Synchronisation avec cloud (Dropbox, Google Drive)
- [ ] Sauvegarde automatique périodique
- [ ] Historique des versions
- [ ] Collaboration en temps réel

### Long Terme
- [ ] Intégration avec systèmes de fichiers cloud
- [ ] Compression automatique des fichiers
- [ ] Chiffrement des fichiers sensibles
- [ ] API pour intégration avec autres apps

---

## 📞 Support

### Ressources
- **Documentation** : README.md
- **Guide d'installation** : INSTALLATION_GUIDE.md
- **Améliorations** : AMELIORATIONS.md

### Signaler un Problème
1. Vérifiez ce guide de dépannage
2. Consultez les logs du navigateur (F12)
3. Signalez un bug sur GitHub Issues

---

<div align="center">

**Vos fichiers sont maintenant accessibles depuis votre ordinateur !** 🎉

*Accès direct, sauvegarde locale, compatibilité totale*

</div>
