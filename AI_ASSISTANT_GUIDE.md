# 🤖 Assistant IA - Guide d'utilisation

## Configuration de l'Assistant IA

L'assistant IA de WordRapide est propulsé par **Google Gemini** (basé sur Gemma).

### Obtenir une clé API Gemini

1. Rendez-vous sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Connectez-vous avec votre compte Google
3. Cliquez sur **"Créer une clé API"**
4. Copiez la clé générée

### Configurer dans WordRapide

1. Cliquez sur le bouton **"Assistant IA"** en haut à droite
2. Cliquez sur l'icône ⚙️ (paramètres)
3. Collez votre clé API Gemini
4. Cliquez sur **"Sauvegarder"**

La clé est stockée localement dans votre navigateur et n'est jamais partagée.

## Fonctionnalités de l'Assistant IA

### 📝 Suggestions rapides

L'assistant propose des actions rapides :
- **Corriger les fautes d'orthographe** - Corrige automatiquement les erreurs
- **Résumer ce texte** - Crée un résumé concis
- **Améliorer le style** - Améliore la qualité de l'écriture
- **Traduire en anglais** - Traduit le contenu
- **Ajouter une conclusion** - Génère une conclusion pertinente
- **Générer un titre** - Propose des titres adaptés

### 💬 Questions personnalisées

Vous pouvez poser n'importe quelle question :
- "Explique ce paragraphe"
- "Rends ce texte plus formel"
- "Ajoute des exemples"
- "Vérifie la grammaire"
- "Propose des améliorations"

### ✅ Application des modifications

Quand l'IA propose une correction ou amélioration :
1. L'assistant affiche le résultat
2. Un bouton **"Appliquer au document"** apparaît
3. Cliquez pour remplacer le contenu du document

## Exemples d'utilisation

### Correction orthographique
```
Vous : Corriger les fautes d'orthographe
IA : [Texte corrigé]
     💡 Voulez-vous appliquer cette modification ?
     [Appliquer au document]
```

### Résumé
```
Vous : Résumer ce texte
IA : [Résumé en 2-3 phrases]
     💡 Voulez-vous appliquer cette modification ?
```

### Amélioration de style
```
Vous : Rends ce texte plus professionnel
IA : [Texte amélioré avec vocabulaire plus soutenu]
```

### Traduction
```
Vous : Traduire en anglais
IA : [Traduction complète du document]
```

## Conseils d'utilisation

### 🎯 Pour de meilleurs résultats

1. **Soyez spécifique** dans vos demandes
   - ❌ "Améliore ça"
   - ✅ "Rends ce paragraphe plus concis et professionnel"

2. **Contexte important** - L'IA analyse tout le document
   - Mentionnez des sections spécifiques si besoin
   - "Améliore uniquement le deuxième paragraphe"

3. **Itérez** - N'hésitez pas à demander des ajustements
   - "Plus court"
   - "Plus formel"
   - "Ajoute des exemples"

### ⚡ Raccourcis utiles

- **Entrée** - Envoyer la question
- **Maj + Entrée** - Nouvelle ligne dans la question
- **Clic sur suggestion** - Action rapide

### 🔒 Confidentialité

- Votre clé API est stockée **localement** dans votre navigateur
- Les données sont envoyées directement à Google Gemini
- Aucune donnée n'est stockée sur nos serveurs
- Vous pouvez supprimer votre clé à tout moment

## Dépannage

### "Clé API non configurée"
→ Cliquez sur ⚙️ et ajoutez votre clé API Gemini

### "Erreur API Gemini"
→ Vérifiez que votre clé API est valide
→ Vérifiez votre connexion internet
→ Vérifiez vos quotas API sur Google AI Studio

### L'IA ne répond pas
→ Vérifiez la longueur du document (trop long = timeout)
→ Essayez de reformuler votre question
→ Rafraichissez la page

## Limites

- **Longueur maximale** : ~30 000 caractères par requête
- **Quotas API** : Google offre un quota gratuit généreux
- **Langues** : Supporte principalement français et anglais
- **Temps de réponse** : 2-10 secondes selon la complexité

## Coût

Google Gemini offre un **quota gratuit** très généreux :
- 60 requêtes par minute
- 1 500 requêtes par jour
- Suffisant pour une utilisation personnelle intensive

Pour un usage professionnel intensif, consultez les [tarifs Google AI](https://ai.google.dev/pricing).

---

**Besoin d'aide ?** Consultez la documentation [Google Gemini API](https://ai.google.dev/docs)
