# 📧 MailRapide - Guide d'utilisation

## 🎯 Présentation

MailRapide est une application de messagerie électronique intégrée à la suite OfficeRapide. Elle permet de gérer vos emails directement dans votre navigateur avec une interface moderne et intuitive.

## 🚀 Fonctionnalités principales

### 📥 Gestion des emails
- **Boîte de réception** : Consultez tous vos emails reçus
- **Emails envoyés** : Historique de vos messages envoyés
- **Brouillons** : Sauvegardez vos messages en cours de rédaction
- **Corbeille** : Supprimez les emails indésirables

### ✍️ Composition d'emails
- **Nouveau message** : Créez et envoyez des emails
- **Répondre** : Répondez rapidement à un email
- **Brouillons** : Sauvegardez vos messages pour les finir plus tard
- **Champs complets** : Destinataire, objet, corps du message

### 📋 Organisation
- **Favoris** : Marquez les emails importants avec une étoile ⭐
- **Recherche** : Trouvez rapidement un email par sujet, expéditeur ou contenu
- **Tri automatique** : Emails les plus récents en premier
- **Compteur non lus** : Badge indiquant le nombre d'emails non lus

### 👥 Gestion des contacts
- **Carnet d'adresses** : Ajoutez et gérez vos contacts
- **Email rapide** : Envoyez un email directement depuis un contact
- **Suppression** : Retirez les contacts obsolètes

### 💾 Stockage et persistance
- **Sauvegarde automatique** : Tous vos emails sont sauvegardés localement
- **Pas de serveur** : 100% client-side, vos données restent sur votre ordinateur
- **Persistance** : Retrouvez vos emails à chaque visite

## 📖 Guide détaillé

### 🏠 Page d'accueil

La page d'accueil affiche vos 4 dossiers principaux :

1. **Boîte de réception** 📥
   - Tous les emails reçus
   - Badge rouge indiquant le nombre de non lus
   - Emails non lus surlignés en bleu

2. **Envoyés** 📤
   - Historique de vos messages envoyés
   - Affiche le destinataire au lieu de l'expéditeur

3. **Brouillons** 📝
   - Messages sauvegardés non envoyés
   - Continuez la rédaction à tout moment

4. **Corbeille** 🗑️
   - Emails supprimés
   - Possibilité de restaurer ou supprimer définitivement

### 📧 Lire un email

1. **Cliquez sur un email** dans la liste pour l'ouvrir
2. **L'email s'ouvre** en mode lecture avec :
   - Objet du message
   - Expéditeur et destinataire
   - Date et heure
   - Contenu complet du message
3. **Actions disponibles** :
   - **Répondre** : Ouvre le composeur avec le message original cité
   - **Supprimer** : Déplace l'email dans la corbeille
   - **Favoris** : Cliquez sur l'étoile pour marquer/démarquer

### ✍️ Composer un email

1. **Cliquez sur "Nouveau message"** en haut à droite
2. **Remplissez les champs** :
   - **À** : Email du destinataire (obligatoire)
   - **Objet** : Sujet du message (obligatoire)
   - **Message** : Corps de l'email
3. **Envoyez** : Cliquez sur "Envoyer" pour envoyer immédiatement
4. **Ou sauvegardez** : Cliquez sur "Sauvegarder brouillon" pour finir plus tard

### 🔍 Rechercher un email

1. **Utilisez la barre de recherche** en haut de la liste
2. **Tapez vos mots-clés** :
   - Sujet de l'email
   - Nom de l'expéditeur
   - Contenu du message
3. **Les résultats s'affichent** automatiquement en temps réel

### 👥 Gérer les contacts

1. **Accédez aux contacts** : Cliquez sur "Contacts" en haut à droite
2. **Ajouter un contact** :
   - Cliquez sur "Ajouter un contact"
   - Remplissez le nom et l'email
   - Cliquez sur "Ajouter"
3. **Envoyer un email** :
   - Cliquez sur "Email" à côté d'un contact
   - Le composeur s'ouvre avec l'email pré-rempli
4. **Supprimer un contact** :
   - Cliquez sur l'icône poubelle 🗑️
   - Le contact est supprimé définitivement

### ⭐ Gérer les favoris

1. **Marquer comme favori** :
   - Cliquez sur l'étoile ☆ à gauche d'un email
   - L'étoile devient jaune ★
2. **Retirer des favoris** :
   - Cliquez à nouveau sur l'étoile ★
   - L'étoile redevient grise ☆

## 💡 Conseils d'utilisation

### 📝 Rédaction efficace
- **Objet clair** : Utilisez un objet descriptif pour faciliter la recherche
- **Structure** : Organisez votre message avec des paragraphes
- **Relire** : Vérifiez l'orthographe avant d'envoyer
- **Brouillons** : N'hésitez pas à sauvegarder vos brouillons

### 🔍 Recherche avancée
- **Mots-clés spécifiques** : Utilisez des termes précis
- **Noms d'expéditeurs** : Recherchez par nom de contact
- **Dates** : Les emails récents sont en premier par défaut

### 📊 Organisation
- **Tri régulier** : Supprimez les emails inutiles
- **Favoris** : Marquez les emails importants
- **Contacts** : Ajoutez vos contacts fréquents pour gagner du temps

### 💾 Sauvegarde
- **Automatique** : Tout est sauvegardé automatiquement
- **Local** : Vos données restent sur votre ordinateur
- **Privé** : Aucun serveur externe, 100% confidential

## 🎨 Interface

### Sidebar gauche
- Liste des dossiers avec compteurs
- Navigation rapide entre les sections
- Badge rouge pour les non lus

### Zone centrale
- Liste des emails avec aperçu
- Indicateurs visuels (lu/non lu, favori)
- Dates relatives (il y a 2h, hier, etc.)

### Barre de statut
- Nombre d'emails non lus
- Nombre de contacts
- Date actuelle

## 🔧 Fonctionnalités techniques

### Stockage
- **localStorage** : Données persistantes dans le navigateur
- **Capacité** : ~5-10 MB selon le navigateur
- **Format** : JSON structuré

### Performance
- **Chargement instantané** : Pas de serveur à contacter
- **Recherche rapide** : Filtrage en temps réel
- **Tri automatique** : Par date de réception

### Sécurité
- **100% local** : Aucune donnée envoyée sur internet
- **Privé** : Vous seul avez accès à vos emails
- **Contrôle total** : Vous pouvez supprimer toutes les données via le navigateur

## 🚀 Cas d'utilisation

### 📧 Communication personnelle
- Gardez une trace de vos emails importants
- Organisez vos conversations
- Retrouvez rapidement vos messages

### 💼 Usage professionnel
- Gérez vos emails professionnels
- Créez des brouillons pour vos réponses
- Gardez un historique de vos envois

### 📚 Archivage
- Conservez vos emails importants
- Marquez vos favoris
- Recherchez facilement dans l'historique

## 🐛 Dépannage

### Les emails ne s'affichent pas
- Vérifiez que vous êtes dans le bon dossier
- Essayez de rafraîchir la page
- Vérifiez la console du navigateur pour les erreurs

### Impossible d'envoyer un email
- Vérifiez que le destinataire et l'objet sont remplis
- Vérifiez le format de l'email (doit contenir @)
- Consultez la notification d'erreur

### Les contacts ne s'affichent pas
- Vérifiez que vous avez ajouté des contacts
- Rafraîchissez la page
- Vérifiez le stockage local du navigateur

### Les emails disparaissent
- Les emails sont sauvegardés automatiquement
- Vérifiez que vous n'avez pas vidé le cache du navigateur
- Les données sont stockées localement, pas sur un serveur

## 📊 Statistiques

L'application affiche en permanence :
- Nombre d'emails non lus
- Nombre total de contacts
- Date actuelle
- Compteur par dossier

## 🔮 Améliorations futures

- [ ] Pièces jointes
- [ ] Signatures d'email
- [ ] Modèles de messages
- [ ] Filtres avancés
- [ ] Étiquettes/tags
- [ ] Synchronisation cloud (optionnel)
- [ ] Notifications push
- [ ] Mode sombre

## 📝 Notes importantes

⚠️ **Attention** :
- Les emails sont stockés localement dans votre navigateur
- Vider le cache du navigateur supprimera tous vos emails
- Aucun serveur externe n'est utilisé
- Les emails ne sont pas envoyés réellement (simulation)

✅ **Avantages** :
- 100% privé et sécurisé
- Fonctionne hors-ligne
- Pas de compte requis
- Gratuit et sans publicité

---

**MailRapide** - Votre messagerie locale, rapide et sécurisée ! 📧
