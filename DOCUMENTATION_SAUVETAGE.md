# 💾 Système de Sauvegarde et Chargement

## 📋 Vue d'ensemble

WordRapide dispose d'un système complet de gestion de documents locaux qui permet de sauvegarder, charger et gérer plusieurs documents directement dans votre navigateur.

## ✨ Fonctionnalités

### 💾 Sauvegarde
- **Sauvegarde automatique** avec le nom du document actuel
- **Mise à jour** des documents existants (même nom)
- **Stockage local** dans le navigateur (localStorage)
- **Métadonnées** : nom, date, nombre de mots

### 📂 Chargement
- **Liste complète** de tous les documents sauvegardés
- **Recherche** par nom de document
- **Aperçu** des informations (date, mots)
- **Chargement en 1 clic**

### 🗑️ Gestion
- **Suppression** de documents individuels
- **Tri automatique** par date (plus récent en premier)
- **Formatage intelligent** des dates (il y a 5 min, il y a 2h, etc.)

## 🎯 Comment utiliser

### Sauvegarder un document

1. Cliquez sur le bouton **"Sauvegarder"** dans la barre d'outils
2. Le document est enregistré avec le nom actuel
3. Une notification confirme la sauvegarde

**Exemple :**
```
Nom du document : "Rapport Mars 2024"
→ Clic sur "Sauvegarder"
→ Notification : "Rapport Mars 2024 sauvegardé avec succès !"
```

### Charger un document

1. Cliquez sur le bouton **"Charger"** dans la barre d'outils
2. La liste des documents sauvegardés s'ouvre
3. Recherchez ou sélectionnez un document
4. Cliquez dessus pour le charger
5. Le contenu remplace le document actuel

**Exemple :**
```
→ Clic sur "Charger"
→ Liste affichée :
  - Rapport Mars 2024 (Il y a 2h, 1 234 mots)
  - Lettre de motivation (Il y a 3j, 456 mots)
  - Notes de réunion (Il y a 1 sem, 789 mots)
→ Clic sur "Rapport Mars 2024"
→ Notification : "Rapport Mars 2024 chargé !"
```

### Supprimer un document

1. Ouvrez la liste des documents (bouton "Charger")
2. Survolez le document à supprimer
3. Cliquez sur l'icône 🗑️ rouge
4. Confirmez la suppression

## 📊 Informations affichées

Pour chaque document sauvegardé :
- **Nom** du document
- **Date** de dernière modification (format relatif)
- **Nombre de mots**
- **Icône** de fichier

### Formatage des dates

| Temps écoulé | Affichage |
|--------------|-----------|
| < 1 minute | "À l'instant" |
| < 60 minutes | "Il y a X min" |
| < 24 heures | "Il y a Xh" |
| < 7 jours | "Il y a Xj" |
| > 7 jours | Date complète (JJ/MM/AAAA) |

## 🔍 Recherche

La barre de recherche permet de filtrer les documents par nom :
- Recherche **insensible à la casse**
- Recherche **partielle** (contient)
- **Temps réel** (filtrage instantané)

**Exemples :**
- "rapport" → trouve "Rapport Mars 2024", "Rapport financier"
- "2024" → trouve tous les documents de 2024
- "lettre" → trouve "Lettre de motivation", "Lettre recommandée"

## 💡 Conseils d'utilisation

### ✅ Bonnes pratiques

1. **Noms descriptifs** : Utilisez des noms clairs et uniques
   - ✅ "Rapport Q1 2024 - Ventes"
   - ❌ "Document1", "Test", "Sans titre"

2. **Sauvegarde régulière** : Sauvegardez souvent pour éviter les pertes
   - Après chaque modification importante
   - Avant de fermer l'application

3. **Organisation** : Utilisez des préfixes pour organiser
   - "Projet_A_Notes de réunion"
   - "Projet_A_Rapport final"
   - "Projet_B_Proposition"

### ⚠️ Limitations

- **Stockage local** : Les documents sont stockés dans le navigateur
- **Pas de synchronisation** : Pas de cloud (pour l'instant)
- **Effacement** : Vider le cache du navigateur supprime les documents
- **Taille** : Limite de ~5-10 MB selon le navigateur

## 🔧 Données techniques

### Structure des données

```typescript
interface SavedDocument {
  id: string;          // Identifiant unique (timestamp)
  name: string;        // Nom du document
  content: string;     // Contenu HTML
  timestamp: string;   // Date ISO de sauvegarde
  wordCount: number;   // Nombre de mots
}
```

### Stockage

- **Clé localStorage** : `wordrapide_documents`
- **Format** : JSON array
- **Limite** : ~5-10 MB (selon navigateur)

### API DocumentManager

```typescript
// Récupérer tous les documents
DocumentManager.getAllDocuments(): SavedDocument[]

// Sauvegarder un document
DocumentManager.saveDocument(name: string, content: string, wordCount: number): SavedDocument

// Charger un document
DocumentManager.loadDocument(id: string): SavedDocument | null

// Supprimer un document
DocumentManager.deleteDocument(id: string): void

// Renommer un document
DocumentManager.renameDocument(id: string, newName: string): void
```

## 🚀 Améliorations futures

- [ ] Export de tous les documents (ZIP)
- [ ] Import de documents
- [ ] Synchronisation cloud
- [ ] Tags et catégories
- [ ] Recherche dans le contenu
- [ ] Prévisualisation des documents
- [ ] Tri par nom/date/taille
- [ ] Sauvegarde automatique périodique

## 📝 Exemples d'utilisation

### Scénario 1 : Travail quotidien

```
Matin :
1. Ouvrir WordRapide
2. Clic sur "Charger" → "Notes de réunion hier"
3. Modifier le document
4. Clic sur "Sauvegarder" (mise à jour)

Après-midi :
1. Créer un nouveau document
2. Changer le nom en "Rapport après-midi"
3. Rédiger le contenu
4. Clic sur "Sauvegarder" (nouveau document)
```

### Scénario 2 : Gestion de projets

```
Projet A :
- "ProjetA_Cahier des charges"
- "ProjetA_Planning"
- "ProjetA_Compte-rendu réunion 1"

Projet B :
- "ProjetB_Proposition client"
- "ProjetB_Budget"
- "ProjetB_Contrat"
```

### Scénario 3 : Archivage

```
1. Terminer un document important
2. Sauvegarder avec nom descriptif
3. Ajouter la date : "Rapport final - 2024-03-15"
4. Créer un nouveau document pour la suite
```

## 🔒 Confidentialité

- **100% local** : Vos documents restent sur votre ordinateur
- **Pas de serveur** : Aucune donnée envoyée sur internet
- **Navigateur uniquement** : Accessible seulement depuis ce navigateur
- **Contrôle total** : Vous pouvez supprimer tous les données via les paramètres du navigateur

---

**Besoin d'aide ?** Consultez le guide principal ou contactez le support.
