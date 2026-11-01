# 📦 Guide du Gestionnaire de Stockage

OfficeRapide dispose d'un système de stockage local avancé pour gérer tous vos documents de manière sécurisée et efficace.

---

## 🎯 Fonctionnalités Principales

### ✅ Stockage Local Robuste
- **Persistance automatique** : Vos données sont sauvegardées automatiquement
- **Vérification d'intégrité** : Checksum pour détecter les corruptions
- **Gestion d'erreurs** : Messages clairs en cas de problème
- **Limites intelligentes** : Alerte avant dépassement de capacité

### ✅ Système de Sauvegarde
- **Sauvegardes automatiques** : Jusqu'à 10 versions
- **Restauration facile** : Un clic pour restaurer
- **Historique complet** : Date, version, taille
- **Export/Import** : Sauvegarde externe en JSON

### ✅ Statistiques en Temps Réel
- **Espace utilisé** : Visualisation graphique
- **Nombre de documents** : Par type (Word, Excel, PowerPoint, Mail)
- **Dernière modification** : Date et heure
- **Capacité disponible** : Espace restant

---

## 🚀 Comment Utiliser

### 1. Accéder au Gestionnaire

**Depuis n'importe quelle application :**
- Cliquez sur l'icône **🗄️ Base de données** dans la barre de titre
- Ou cliquez sur **"Stockage"** dans la page d'accueil

### 2. Vue d'Ensemble

L'onglet **"Vue d'ensemble"** affiche :

#### 📊 Stockage Local
```
┌─────────────────────────────────────┐
│ Stockage Local                      │
├─────────────────────────────────────┤
│ Total: 5 MB                         │
│ Utilisé: 1.2 MB  ████░░░░  24%     │
│ Disponible: 3.8 MB                  │
│ Éléments: 42                        │
└─────────────────────────────────────┘
```

#### 📄 Documents
```
┌─────────────────────────────────────┐
│ Documents                           │
├─────────────────────────────────────┤
│ Total: 15                           │
│ Word: 8  Excel: 4  PPT: 2  Mail: 1 │
│ Dernière modification: Aujourd'hui  │
└─────────────────────────────────────┘
```

### 3. Gérer les Sauvegardes

#### Créer une Sauvegarde
1. Allez dans l'onglet **"Sauvegardes"**
2. Cliquez sur **"Nouvelle Sauvegarde"**
3. La sauvegarde est créée instantanément

#### Restaurer une Sauvegarde
1. Allez dans l'onglet **"Sauvegardes"**
2. Trouvez la sauvegarde souhaitée
3. Cliquez sur **"Restaurer"**
4. Confirmez l'action

⚠️ **Attention** : La restauration remplace toutes les données actuelles !

#### Supprimer une Sauvegarde
1. Allez dans l'onglet **"Sauvegardes"**
2. Cliquez sur l'icône **🗑️ Corbeille**
3. Confirmez la suppression

### 4. Import/Export

#### Exporter Toutes les Données
1. Allez dans l'onglet **"Import/Export"**
2. Cliquez sur **"Exporter en JSON"**
3. Un fichier `officerapide_backup_YYYY-MM-DD.json` est téléchargé

#### Importer des Données
1. Allez dans l'onglet **"Import/Export"**
2. Cliquez sur **"Importer depuis JSON"**
3. Sélectionnez un fichier de sauvegarde
4. Confirmez l'importation

⚠️ **Attention** : L'import remplace toutes les données actuelles !

#### Zone de Danger
- **Supprimer Toutes les Données** : Action irréversible
- Double confirmation requise
- Utilisez avec précaution

---

## 💾 Comment Ça Marche

### Architecture du Stockage

```
localStorage
├── officerapide_documents     # Liste des documents
├── officerapide_backups       # Sauvegardes automatiques
├── officerapide_word_*        # Documents Word individuels
├── officerapide_excel_*       # Documents Excel individuels
├── officerapide_ppt_*         # Présentations PowerPoint
└── officerapide_mail_*        # Emails et contacts
```

### Format des Données

#### Document
```json
{
  "id": "1234567890",
  "name": "Mon Document",
  "content": "<p>Contenu HTML...</p>",
  "type": "word",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:45:00.000Z",
  "size": 2048,
  "tags": ["important", "projet"]
}
```

#### Sauvegarde
```json
{
  "timestamp": "2024-01-15T15:00:00.000Z",
  "version": "1.0.0",
  "data": {
    "documents": [...],
    "backups": [...]
  },
  "checksum": "abc123def456"
}
```

### Limites de Stockage

- **localStorage** : ~5 MB par domaine
- **Recommandation** : Exportez régulièrement vos données
- **Alerte** : Notification quand > 80% utilisé

---

## 🔒 Sécurité et Confidentialité

### ✅ 100% Local
- Aucune donnée envoyée sur internet
- Pas de serveur externe
- Pas de compte utilisateur requis
- Pas de synchronisation cloud

### ✅ Protection des Données
- Checksum pour détecter les corruptions
- Validation avant import/export
- Double confirmation pour actions destructives
- Messages d'erreur clairs

### ⚠️ Limitations
- Les données sont stockées en clair dans le navigateur
- Vider le cache supprime toutes les données
- Pas de chiffrement (à venir)
- Pas de synchronisation entre appareils

---

## 🛠️ Dépannage

### "localStorage non disponible"

**Causes possibles :**
- Navigation privée activée
- Paramètres de confidentialité restrictifs
- Navigateur obsolète

**Solutions :**
- Désactivez la navigation privée
- Vérifiez les paramètres du navigateur
- Utilisez un navigateur moderne (Chrome, Firefox, Safari, Edge)

### "Données trop volumineuses"

**Cause :** Vous avez dépassé la limite de 5 MB

**Solutions :**
- Exportez et supprimez les anciennes sauvegardes
- Supprimez les documents inutiles
- Videz la corbeille

### "Sauvegarde corrompue"

**Cause :** Le checksum ne correspond pas

**Solutions :**
- Essayez une autre sauvegarde
- Importez depuis un fichier JSON externe
- Recréez les documents manuellement

### "Erreur lors de l'import"

**Causes possibles :**
- Format JSON invalide
- Fichier corrompu
- Version incompatible

**Solutions :**
- Vérifiez que le fichier est un JSON valide
- Utilisez un fichier de sauvegarde récent
- Contactez le support si le problème persiste

---

## 📊 Bonnes Pratiques

### ✅ À Faire
1. **Exportez régulièrement** : Créez des sauvegardes externes
2. **Nommez clairement** : Utilisez des noms descriptifs
3. **Organisez avec des tags** : Facilitez la recherche
4. **Vérifiez l'espace** : Consultez les statistiques régulièrement
5. **Testez les restaurations** : Vérifiez que vos sauvegardes fonctionnent

### ❌ À Éviter
1. **Ne videz pas le cache** sans exporter avant
2. **Ne supprimez pas** les sauvegardes récentes
3. **Ne stockez pas** de données sensibles sans chiffrement
4. **Ne dépendez pas** uniquement du stockage local
5. **N'ignorez pas** les alertes de capacité

---

## 🚀 Fonctionnalités Avancées

### Recherche de Documents
```typescript
// Rechercher par nom, contenu ou tags
const results = DocumentManager.search("rapport");
```

### Filtrage par Type
```typescript
// Récupérer uniquement les documents Word
const wordDocs = DocumentManager.getByType('word');
```

### Documents Récents
```typescript
// Obtenir les 10 derniers documents modifiés
const recent = DocumentManager.getRecent(10);
```

### Gestion des Tags
```typescript
// Ajouter des tags
DocumentManager.addTags(docId, ['important', 'urgent']);

// Supprimer des tags
DocumentManager.removeTags(docId, ['urgent']);
```

### Duplication
```typescript
// Créer une copie d'un document
const copy = DocumentManager.duplicate(docId);
```

---

## 📈 Statistiques et Métriques

### Métriques Disponibles
- **Nombre total de documents**
- **Répartition par type** (Word, Excel, PowerPoint, Mail)
- **Taille totale** en octets
- **Date de dernière modification**
- **Espace utilisé vs disponible**
- **Nombre de sauvegardes**

### Visualisation
- Barres de progression pour l'espace utilisé
- Compteurs colorés par type de document
- Historique des sauvegardes avec dates
- Graphiques en temps réel

---

## 🔮 Améliorations Futures

### Court Terme
- [ ] Chiffrement des données locales
- [ ] Compression automatique
- [ ] Sauvegarde automatique périodique
- [ ] Recherche avancée avec filtres

### Moyen Terme
- [ ] Synchronisation cloud (optionnelle)
- [ ] Collaboration en temps réel
- [ ] Versioning de documents
- [ ] Historique des modifications

### Long Terme
- [ ] Base de données locale (IndexedDB)
- [ ] Support de fichiers volumineux
- [ ] Synchronisation multi-appareils
- [ ] Sauvegarde incrémentielle

---

## 📞 Support

### Ressources
- **Documentation** : README.md
- **Guide d'import/export** : GUIDE_IMPORT_EXPORT.md
- **Guide complet** : OFFICERAPIDE_GUIDE.md

### Signaler un Problème
1. Vérifiez ce guide de dépannage
2. Consultez les logs du navigateur (F12)
3. Signalez un bug sur GitHub Issues

---

<div align="center">

**Vos données sont entre de bonnes mains !** 🔒

*Stockage local sécurisé, sauvegardes automatiques, gestion complète*

</div>
