# 🔒 Politique de Sécurité

## Signaler une Vulnérabilité

La sécurité de nos utilisateurs est une priorité absolue. Si vous découvrez une vulnérabilité de sécurité dans OfficeRapide, nous vous encourageons à nous la signaler de manière responsable.

### Comment Signaler

**Ne créez PAS une issue GitHub publique pour les vulnérabilités de sécurité.**

Envoyez plutôt un email à : **security@officerapide.com**

Incluez les informations suivantes :

- Description de la vulnérabilité
- Étapes pour reproduire le problème
- Impact potentiel
- Suggestions de correction (si vous en avez)
- Votre nom/pseudo (pour les remerciements, si vous le souhaitez)

### Ce que Nous Promettons

- ✅ **Réponse rapide** : Nous accuserons réception de votre signalement sous 48 heures
- ✅ **Transparence** : Nous vous tiendrons informé de l'avancement
- ✅ **Reconnaissance** : Nous vous créditerons dans nos notes de version (sauf si vous préférez rester anonyme)
- ✅ **Correction** : Nous travaillerons diligemment pour corriger le problème
- ✅ **Divulgation responsable** : Nous coordonnerons la divulgation publique avec vous

### Périmètre

Les vulnérabilités suivantes sont dans le périmètre :

- ✅ Vulnérabilités dans le code source
- ✅ Failles de sécurité dans les dépendances
- ✅ Problèmes de stockage local (localStorage)
- ✅ XSS (Cross-Site Scripting)
- ✅ CSRF (Cross-Site Request Forgery)
- ✅ Injection de code
- ✅ Fuites de données

### Hors Périmètre

- ❌ Spam ou problèmes non liés à la sécurité
- ❌ Problèmes d'interface utilisateur non liés à la sécurité
- ❌ Problèmes de performance
- ❌ Problèmes de compatibilité navigateur

## Pratiques de Sécurité

### Stockage des Données

OfficeRapide stocke toutes les données localement dans le navigateur via localStorage :

- ✅ **100% local** : Aucune donnée envoyée sur internet
- ✅ **Pas de serveur** : Pas de base de données centrale
- ✅ **Privé** : Vous seul avez accès à vos données
- ✅ **Contrôle** : Vous pouvez supprimer toutes les données à tout moment

### Limitations

- ⚠️ Les données sont stockées en clair dans le navigateur
- ⚠️ Vider le cache du navigateur supprime toutes les données
- ⚠️ Pas de chiffrement des données locales (à venir)
- ⚠️ Pas de synchronisation entre appareils

### Bonnes Pratiques

1. **Ne partagez pas votre appareil** : OfficeRapide n'a pas de système d'authentification
2. **Sauvegardez régulièrement** : Exportez vos documents importants
3. **Videz le cache avec précaution** : Cela supprimera toutes vos données
4. **Utilisez HTTPS** : Si vous déployez OfficeRapide, utilisez toujours HTTPS

## Dépendances

Nous utilisons Dependabot pour surveiller automatiquement les vulnérabilités dans nos dépendances :

- ✅ Mises à jour de sécurité automatiques
- ✅ Alertes de vulnérabilités
- ✅ Revue régulière des dépendances

### Dépendances Principales

- **React 18** : Framework UI
- **TypeScript 5** : Typage statique
- **Tailwind CSS 3** : Styling
- **Vite 5** : Build tool
- **Font Awesome 6** : Icônes

Toutes les dépendances sont open source et régulièrement mises à jour.

## Divulgation Responsable

Nous suivons les principes de divulgation responsable :

1. **Signalement** : Vous nous signalez la vulnérabilité en privé
2. **Confirmation** : Nous confirmons la réception et l'validité
3. **Correction** : Nous développons et testons un correctif
4. **Déploiement** : Nous déployons le correctif
5. **Divulgation** : Nous divulguons publiquement la vulnérabilité et le correctif
6. **Remerciements** : Nous vous remercions publiquement (si vous le souhaitez)

## Historique des Sécurité

### v1.0.0 (2024-01-15)

- ✅ Aucune vulnérabilité connue
- ✅ Audit de sécurité initial effectué
- ✅ Dépendances vérifiées

## Contact

- **Email** : security@officerapide.com
- **GitHub Issues** : Pour les questions générales (pas pour les vulnérabilités)
- **Discord** : (lien à venir)

---

<div align="center">

**Merci de nous aider à garder OfficeRapide sécurisé !** 🔒

</div>
