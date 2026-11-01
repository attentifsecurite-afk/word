# 📥 Guide d'Import/Export de Documents

Ce guide explique comment importer et exporter des documents sur Mac et Windows avec OfficeRapide.

---

## 🎯 Problème Résolu

**Avant** : Vous ne pouviez pas récupérer vos documents Mac  
**Maintenant** : Import/Export complet de tous vos documents !

---

## 📝 Word - Traitement de Texte

### ✅ Importer un document

1. Ouvrez **Word** dans OfficeRapide
2. Cliquez sur l'onglet **Fichier** dans le ruban
3. Cliquez sur **Importer**
4. Sélectionnez un fichier :
   - `.txt` - Texte brut
   - `.html` / `.htm` - Page web
   - `.rtf` - Rich Text Format
   - `.md` - Markdown
5. Le document s'ouvre automatiquement

### ✅ Exporter un document

1. Cliquez sur l'onglet **Fichier**
2. Choisissez :
   - **Exporter HTML** - Format web compatible
   - **Exporter TXT** - Texte brut

**💡 Astuce** : Utilisez **Sauvegarder** pour garder le document dans OfficeRapide

---

## 📊 Excel - Tableur

### ✅ Importer un fichier CSV

1. Ouvrez **Excel** dans OfficeRapide
2. Cliquez sur l'onglet **Données** dans le ruban
3. Cliquez sur **Importer CSV**
4. Sélectionnez un fichier `.csv` ou `.txt`
5. Les données sont importées dans la grille

### ✅ Exporter en CSV

1. Cliquez sur l'onglet **Données**
2. Cliquez sur **Exporter CSV**
3. Le fichier est téléchargé

**💡 Astuce** : Compatible avec Excel, Google Sheets, Numbers (Mac)

---

## 📽️ PowerPoint - Présentations

### ✅ Importer une présentation

1. Ouvrez **PowerPoint** dans OfficeRapide
2. Cliquez sur le bouton **Importer** dans la barre de titre (icône 📥)
3. Sélectionnez un fichier `.json` exporté précédemment
4. La présentation est restaurée

### ✅ Exporter une présentation

1. Cliquez sur le bouton **Exporter** dans la barre de titre (icône 📤)
2. Le fichier JSON est téléchargé

**💡 Astuce** : Utilisez **Sauvegarder** pour garder la présentation dans OfficeRapide

---

## 📧 Outlook - Messagerie

### ✅ Sauvegarde automatique

Tous vos emails et contacts sont sauvegardés automatiquement dans le navigateur.

### ✅ Exporter (à venir)

Fonctionnalité d'export en développement pour :
- Exporter les emails en `.eml`
- Exporter les contacts en `.vcf`

---

## 🔄 Récupérer vos documents Mac

### Méthode 1 : Import depuis un fichier

Si vous avez exporté vos documents depuis une autre application :

1. **Word** : Importez vos fichiers `.txt`, `.html`, `.rtf`
2. **Excel** : Importez vos fichiers `.csv` depuis Numbers ou Excel
3. **PowerPoint** : Importez vos fichiers JSON

### Méthode 2 : Copier-Coller

Vous pouvez simplement copier-coller du contenu :

1. Ouvrez votre document sur Mac (Word, Pages, Numbers, etc.)
2. Sélectionnez tout le contenu (Cmd+A)
3. Copiez (Cmd+C)
4. Dans OfficeRapide, cliquez dans la zone d'édition
5. Collez (Cmd+V)

### Méthode 3 : Export depuis Mac

**Depuis Microsoft Word (Mac)** :
1. Fichier → Enregistrer sous
2. Format : **Texte brut (.txt)** ou **Page web (.html)**
3. Importez dans OfficeRapide

**Depuis Numbers (Mac)** :
1. Fichier → Exporter vers → CSV
2. Importez dans OfficeRapide Excel

**Depuis Pages (Mac)** :
1. Fichier → Exporter vers → Texte
2. Importez dans OfficeRapide Word

**Depuis Keynote (Mac)** :
1. Fichier → Exporter vers → Images
2. Ou copiez-collez le texte dans OfficeRapide PowerPoint

---

## 💾 Sauvegarde Locale

### Comment ça marche ?

OfficeRapide utilise **localStorage** pour sauvegarder vos documents :

- ✅ **Automatique** : Sauvegarde en un clic
- ✅ **Persistant** : Les documents restent après fermeture
- ✅ **Privé** : 100% local, pas de serveur
- ✅ **Rapide** : Accès instantané

### Limitations

- ⚠️ Vider le cache du navigateur supprime les données
- ⚠️ Pas de synchronisation entre appareils
- ⚠️ Espace limité (~5-10 MB)

### Bonnes pratiques

1. **Exportez régulièrement** vos documents importants
2. **Sauvegardez** avant de fermer le navigateur
3. **Utilisez des noms descriptifs** pour vos fichiers

---

## 🛠️ Dépannage

### "Stockage local non disponible"

**Cause** : Le navigateur bloque localStorage  
**Solution** :
- Vérifiez les paramètres de confidentialité
- Désactivez le mode navigation privée
- Utilisez un autre navigateur (Chrome, Firefox, Safari, Edge)

### "Erreur d'import"

**Cause** : Format de fichier non supporté  
**Solution** :
- Vérifiez l'extension du fichier
- Convertissez en format supporté (.txt, .html, .csv, .json)
- Utilisez un éditeur de texte pour vérifier le contenu

### "Documents perdus après fermeture"

**Cause** : Cache du navigateur vidé  
**Solution** :
- Exportez vos documents avant de vider le cache
- Utilisez la sauvegarde locale + export régulier
- Désactivez le nettoyage automatique du cache

---

## 📋 Formats Supportés

### Word
| Format | Extension | Import | Export |
|--------|-----------|--------|--------|
| Texte brut | `.txt` | ✅ | ✅ |
| HTML | `.html`, `.htm` | ✅ | ✅ |
| Rich Text | `.rtf` | ✅ | ❌ |
| Markdown | `.md` | ✅ | ❌ |

### Excel
| Format | Extension | Import | Export |
|--------|-----------|--------|--------|
| CSV | `.csv` | ✅ | ✅ |
| Texte | `.txt` | ✅ | ❌ |

### PowerPoint
| Format | Extension | Import | Export |
|--------|-----------|--------|--------|
| JSON | `.json` | ✅ | ✅ |
| HTML | `.html` | ❌ | ✅ |

---

## 🎓 Tutoriels Vidéo (à venir)

Des tutoriels vidéo seront bientôt disponibles pour :
- Importer des documents depuis Mac
- Exporter vers différents formats
- Sauvegarder et restaurer vos données
- Migrer depuis Microsoft Office

---

## 💡 Conseils

### Pour les utilisateurs Mac

1. **Numbers → Excel** : Exportez en CSV depuis Numbers, importez dans Excel
2. **Pages → Word** : Exportez en TXT ou HTML depuis Pages, importez dans Word
3. **Keynote → PowerPoint** : Exportez en PDF ou images, ou copiez-collez le texte

### Pour les utilisateurs Windows

1. **Microsoft Office → OfficeRapide** : Exportez en TXT/HTML/CSV, importez dans OfficeRapide
2. **Sauvegarde régulière** : Utilisez Export pour créer des copies de sécurité
3. **Migration facile** : Tous les formats standards sont supportés

---

## 🚀 Améliorations Futures

- [ ] Import de fichiers `.docx` (Word)
- [ ] Import de fichiers `.xlsx` (Excel)
- [ ] Import de fichiers `.pptx` (PowerPoint)
- [ ] Export en PDF
- [ ] Synchronisation cloud
- [ ] Conversion de formats automatique

---

## 📞 Support

Si vous rencontrez des problèmes :

1. **Vérifiez ce guide** pour les solutions courantes
2. **Consultez la documentation** dans README.md
3. **Signalez un bug** sur GitHub Issues

---

<div align="center">

**Vos documents sont maintenant accessibles partout !** 🎉

*Importez, exportez, sauvegardez - en toute simplicité*

</div>
