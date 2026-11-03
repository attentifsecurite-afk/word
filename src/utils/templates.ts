export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'business' | 'personal' | 'academic' | 'creative';
  content: string;
}

export const wordTemplates: DocumentTemplate[] = [
  {
    id: 'blank',
    name: 'Document vierge',
    description: 'Commencez avec une page blanche',
    icon: 'fas fa-file',
    category: 'business',
    content: '<p><br></p>'
  },
  {
    id: 'letter',
    name: 'Lettre formelle',
    description: 'Modèle de lettre professionnelle',
    icon: 'fas fa-envelope-open-text',
    category: 'business',
    content: `
      <p style="text-align: right;">[Votre nom]<br>[Votre adresse]<br>[Ville, Code postal]<br>[Date]</p>
      <p><br></p>
      <p>[Nom du destinataire]<br>[Adresse du destinataire]<br>[Ville, Code postal]</p>
      <p><br></p>
      <p><strong>Objet :</strong> [Objet de la lettre]</p>
      <p><br></p>
      <p>Madame, Monsieur,</p>
      <p><br></p>
      <p>[Corps de la lettre - Premier paragraphe d'introduction]</p>
      <p><br></p>
      <p>[Deuxième paragraphe - Développement]</p>
      <p><br></p>
      <p>[Troisième paragraphe - Conclusion]</p>
      <p><br></p>
      <p>Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>
      <p><br></p>
      <p style="text-align: right;">[Signature]</p>
    `
  },
  {
    id: 'report',
    name: 'Rapport professionnel',
    description: 'Structure de rapport d\'activité',
    icon: 'fas fa-chart-line',
    category: 'business',
    content: `
      <h1 style="text-align: center;">[Titre du Rapport]</h1>
      <p style="text-align: center;">[Sous-titre ou date]</p>
      <p><br></p>
      <h2>1. Introduction</h2>
      <p>[Contexte et objectifs du rapport]</p>
      <p><br></p>
      <h2>2. Méthodologie</h2>
      <p>[Approche et méthodes utilisées]</p>
      <p><br></p>
      <h2>3. Résultats</h2>
      <p>[Présentation des résultats]</p>
      <p><br></p>
      <h2>4. Analyse</h2>
      <p>[Analyse des résultats]</p>
      <p><br></p>
      <h2>5. Recommandations</h2>
      <p>[Recommandations basées sur l'analyse]</p>
      <p><br></p>
      <h2>6. Conclusion</h2>
      <p>[Synthèse et prochaines étapes]</p>
    `
  },
  {
    id: 'meeting',
    name: 'Compte-rendu de réunion',
    description: 'Template pour documenter une réunion',
    icon: 'fas fa-users',
    category: 'business',
    content: `
      <h1>Compte-rendu de réunion</h1>
      <p><strong>Date :</strong> [Date]<br><strong>Heure :</strong> [Heure de début] - [Heure de fin]<br><strong>Lieu :</strong> [Lieu ou lien visio]<br><strong>Participants :</strong> [Liste des participants]</p>
      <p><br></p>
      <h2>Ordre du jour</h2>
      <ol>
        <li>[Point 1]</li>
        <li>[Point 2]</li>
        <li>[Point 3]</li>
      </ol>
      <p><br></p>
      <h2>Délibérations</h2>
      <h3>Point 1 : [Titre]</h3>
      <p>[Discussion et décisions]</p>
      <p><br></p>
      <h3>Point 2 : [Titre]</h3>
      <p>[Discussion et décisions]</p>
      <p><br></p>
      <h2>Décisions prises</h2>
      <ul>
        <li>[Décision 1]</li>
        <li>[Décision 2]</li>
      </ul>
      <p><br></p>
      <h2>Actions à mener</h2>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #f0f0f0;">
          <th style="padding: 8px;">Action</th>
          <th style="padding: 8px;">Responsable</th>
          <th style="padding: 8px;">Échéance</th>
        </tr>
        <tr>
          <td style="padding: 8px;">[Action 1]</td>
          <td style="padding: 8px;">[Nom]</td>
          <td style="padding: 8px;">[Date]</td>
        </tr>
      </table>
      <p><br></p>
      <h2>Prochaine réunion</h2>
      <p><strong>Date :</strong> [Date]<br><strong>Heure :</strong> [Heure]<br><strong>Lieu :</strong> [Lieu]</p>
    `
  },
  {
    id: 'cv',
    name: 'CV moderne',
    description: 'Curriculum vitae professionnel',
    icon: 'fas fa-id-card',
    category: 'personal',
    content: `
      <h1 style="text-align: center; color: #2b579a;">[Prénom] [NOM]</h1>
      <p style="text-align: center;">[Adresse] | [Téléphone] | [Email]<br>[LinkedIn] | [Portfolio]</p>
      <p><br></p>
      <h2 style="color: #2b579a; border-bottom: 2px solid #2b579a;">PROFIL</h2>
      <p>[Résumé professionnel - 2-3 lignes présentant votre profil, vos compétences clés et vos objectifs]</p>
      <p><br></p>
      <h2 style="color: #2b579a; border-bottom: 2px solid #2b579a;">EXPÉRIENCE PROFESSIONNELLE</h2>
      <h3>[Poste] - [Entreprise]</h3>
      <p><em>[Ville] | [Mois/Année] - [Présent ou Mois/Année]</em></p>
      <ul>
        <li>[Responsabilité ou réalisation 1]</li>
        <li>[Responsabilité ou réalisation 2]</li>
        <li>[Responsabilité ou réalisation 3]</li>
      </ul>
      <p><br></p>
      <h3>[Poste précédent] - [Entreprise]</h3>
      <p><em>[Ville] | [Mois/Année] - [Mois/Année]</em></p>
      <ul>
        <li>[Responsabilité ou réalisation 1]</li>
        <li>[Responsabilité ou réalisation 2]</li>
      </ul>
      <p><br></p>
      <h2 style="color: #2b579a; border-bottom: 2px solid #2b579a;">FORMATION</h2>
      <h3>[Diplôme] - [Établissement]</h3>
      <p><em>[Ville] | [Année]</em></p>
      <p>[Mention ou spécialisation]</p>
      <p><br></p>
      <h2 style="color: #2b579a; border-bottom: 2px solid #2b579a;">COMPÉTENCES</h2>
      <ul>
        <li><strong>Techniques :</strong> [Compétence 1], [Compétence 2], [Compétence 3]</li>
        <li><strong>Langues :</strong> [Langue 1] (Niveau), [Langue 2] (Niveau)</li>
        <li><strong>Informatique :</strong> [Logiciel 1], [Logiciel 2], [Logiciel 3]</li>
      </ul>
      <p><br></p>
      <h2 style="color: #2b579a; border-bottom: 2px solid #2b579a;">CENTRES D'INTÉRÊT</h2>
      <p>[Intérêt 1], [Intérêt 2], [Intérêt 3]</p>
    `
  },
  {
    id: 'invoice',
    name: 'Facture',
    description: 'Modèle de facture professionnelle',
    icon: 'fas fa-file-invoice-dollar',
    category: 'business',
    content: `
      <h1 style="text-align: right; color: #2b579a;">FACTURE</h1>
      <p style="text-align: right;"><strong>N° :</strong> [Numéro de facture]<br><strong>Date :</strong> [Date]<br><strong>Échéance :</strong> [Date d'échéance]</p>
      <p><br></p>
      <table style="width: 100%;">
        <tr>
          <td style="width: 50%; vertical-align: top;">
            <h3 style="color: #2b579a;">ÉMETTEUR</h3>
            <p>[Votre nom/entreprise]<br>[Adresse]<br>[Ville, Code postal]<br>[Téléphone]<br>[Email]<br>[SIRET/N° TVA]</p>
          </td>
          <td style="width: 50%; vertical-align: top;">
            <h3 style="color: #2b579a;">CLIENT</h3>
            <p>[Nom du client]<br>[Adresse]<br>[Ville, Code postal]<br>[Téléphone]<br>[Email]</p>
          </td>
        </tr>
      </table>
      <p><br></p>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #2b579a; color: white;">
          <th style="padding: 10px; text-align: left;">Description</th>
          <th style="padding: 10px; text-align: center; width: 80px;">Quantité</th>
          <th style="padding: 10px; text-align: right; width: 100px;">Prix unitaire</th>
          <th style="padding: 10px; text-align: right; width: 100px;">Total</th>
        </tr>
        <tr>
          <td style="padding: 10px;">[Service ou produit 1]</td>
          <td style="padding: 10px; text-align: center;">1</td>
          <td style="padding: 10px; text-align: right;">0,00 €</td>
          <td style="padding: 10px; text-align: right;">0,00 €</td>
        </tr>
        <tr>
          <td style="padding: 10px;">[Service ou produit 2]</td>
          <td style="padding: 10px; text-align: center;">1</td>
          <td style="padding: 10px; text-align: right;">0,00 €</td>
          <td style="padding: 10px; text-align: right;">0,00 €</td>
        </tr>
      </table>
      <p><br></p>
      <table style="width: 300px; margin-left: auto;">
        <tr>
          <td style="padding: 5px;"><strong>Sous-total HT :</strong></td>
          <td style="padding: 5px; text-align: right;">0,00 €</td>
        </tr>
        <tr>
          <td style="padding: 5px;">TVA (20%) :</td>
          <td style="padding: 5px; text-align: right;">0,00 €</td>
        </tr>
        <tr style="border-top: 2px solid #2b579a;">
          <td style="padding: 10px;"><strong>TOTAL TTC :</strong></td>
          <td style="padding: 10px; text-align: right;"><strong>0,00 €</strong></td>
        </tr>
      </table>
      <p><br></p>
      <p><strong>Conditions de paiement :</strong> [Délai de paiement]<br><strong>Mode de paiement :</strong> [Virement, Chèque, etc.]<br><strong>Coordonnées bancaires :</strong> [IBAN]</p>
      <p><br></p>
      <p style="text-align: center; font-size: 12px; color: #666;">
        En cas de retard de paiement, une pénalité de 3 fois le taux d'intérêt légal sera appliquée (Article L441-10 du Code de commerce).
      </p>
    `
  },
  {
    id: 'essay',
    name: 'Dissertation',
    description: 'Structure académique standard',
    icon: 'fas fa-graduation-cap',
    category: 'academic',
    content: `
      <h1 style="text-align: center;">[Titre de la dissertation]</h1>
      <p style="text-align: center;">[Nom] - [Classe/Formation]<br>[Date]</p>
      <p><br></p>
      <h2>Introduction</h2>
      <p><strong>Accroche :</strong> [Citation, fait marquant ou question provocatrice]</p>
      <p><strong>Présentation du sujet :</strong> [Contexte et définition des termes clés]</p>
      <p><strong>Problématique :</strong> [Question centrale à laquelle la dissertation va répondre]</p>
      <p><strong>Annonce du plan :</strong> [Présentation des parties]</p>
      <p><br></p>
      <h2>I. [Première partie]</h2>
      <h3>A. [Sous-partie]</h3>
      <p>[Argument développé avec exemples et citations]</p>
      <h3>B. [Sous-partie]</h3>
      <p>[Argument développé avec exemples et citations]</p>
      <p><br></p>
      <h2>II. [Deuxième partie]</h2>
      <h3>A. [Sous-partie]</h3>
      <p>[Argument développé avec exemples et citations]</p>
      <h3>B. [Sous-partie]</h3>
      <p>[Argument développé avec exemples et citations]</p>
      <p><br></p>
      <h2>III. [Troisième partie - optionnelle]</h2>
      <h3>A. [Sous-partie]</h3>
      <p>[Argument développé avec exemples et citations]</p>
      <h3>B. [Sous-partie]</h3>
      <p>[Argument développé avec exemples et citations]</p>
      <p><br></p>
      <h2>Conclusion</h2>
      <p><strong>Bilan :</strong> [Synthèse des arguments développés]</p>
      <p><strong>Réponse à la problématique :</strong> [Réponse claire et argumentée]</p>
      <p><strong>Ouverture :</strong> [Perspective ou question plus large]</p>
      <p><br></p>
      <h2>Bibliographie</h2>
      <p>[Nom], [Initiale]. ([Année]). <em>[Titre de l'ouvrage]</em>. [Ville] : [Éditeur].</p>
    `
  },
  {
    id: 'notes',
    name: 'Prise de notes',
    description: 'Template pour organiser vos notes',
    icon: 'fas fa-sticky-note',
    category: 'personal',
    content: `
      <h1>📝 Notes - [Sujet]</h1>
      <p><strong>Date :</strong> [Date]<br><strong>Catégorie :</strong> [Catégorie]</p>
      <p><br></p>
      <h2>🎯 Points clés</h2>
      <ul>
        <li>[Point important 1]</li>
        <li>[Point important 2]</li>
        <li>[Point important 3]</li>
      </ul>
      <p><br></p>
      <h2>💡 Idées principales</h2>
      <p>[Développement des idées]</p>
      <p><br></p>
      <h2>📌 À retenir</h2>
      <blockquote style="border-left: 4px solid #2b579a; padding-left: 15px; margin: 10px 0; color: #555;">
        [Citation ou information importante]
      </blockquote>
      <p><br></p>
      <h2>✅ Actions à faire</h2>
      <ul>
        <li>☐ [Tâche 1]</li>
        <li>☐ [Tâche 2]</li>
        <li>☐ [Tâche 3]</li>
      </ul>
      <p><br></p>
      <h2>🔗 Ressources</h2>
      <ul>
        <li>[Lien ou référence 1]</li>
        <li>[Lien ou référence 2]</li>
      </ul>
    `
  }
];

export const excelTemplates = [
  {
    id: 'blank',
    name: 'Feuille vierge',
    description: 'Commencez avec une feuille vide',
    icon: 'fas fa-table',
    category: 'business'
  },
  {
    id: 'budget',
    name: 'Budget mensuel',
    description: 'Suivi des revenus et dépenses',
    icon: 'fas fa-wallet',
    category: 'personal'
  },
  {
    id: 'inventory',
    name: 'Inventaire',
    description: 'Gestion de stock',
    icon: 'fas fa-boxes',
    category: 'business'
  }
];

export const powerpointTemplates = [
  {
    id: 'blank',
    name: 'Présentation vierge',
    description: 'Commencez avec une présentation vide',
    icon: 'fas fa-tv',
    category: 'business'
  },
  {
    id: 'pitch',
    name: 'Pitch deck',
    description: 'Présentation pour investisseurs',
    icon: 'fas fa-rocket',
    category: 'business'
  },
  {
    id: 'course',
    name: 'Cours magistral',
    description: 'Structure de cours académique',
    icon: 'fas fa-chalkboard-teacher',
    category: 'academic'
  }
];
