import { useState, useEffect } from 'react';
import ToastContainer, { showToast } from '../components/Toast';
import { openFileFromComputer, saveJSONFileToComputer } from '../utils/LocalFileAccess';

interface MailAppProps {
  onBack: () => void;
  onOpenStorage?: () => void;
}

interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash';
  starred: boolean;
}

interface Contact {
  id: string;
  name: string;
  email: string;
}

type Folder = 'inbox' | 'sent' | 'drafts' | 'trash';
type View = 'list' | 'read' | 'compose' | 'contacts';

export default function MailApp({ onBack, onOpenStorage }: MailAppProps) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentFolder, setCurrentFolder] = useState<Folder>('inbox');
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [composeData, setComposeData] = useState({ to: '', subject: '', body: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '' });

  useEffect(() => {
    const savedEmails = localStorage.getItem('mailrapide_emails');
    const savedContacts = localStorage.getItem('mailrapide_contacts');
    
    if (savedEmails) {
      setEmails(JSON.parse(savedEmails));
    } else {
      const demoEmails: Email[] = [
        {
          id: '1',
          from: 'contact@example.com',
          to: 'moi@office.com',
          subject: 'Bienvenue sur OfficeRapide',
          body: 'Bonjour,\n\nBienvenue dans votre nouvelle suite bureautique !\n\nCordialement,\nL\'équipe OfficeRapide',
          date: new Date(Date.now() - 3600000).toISOString(),
          read: false,
          folder: 'inbox',
          starred: true
        },
        {
          id: '2',
          from: 'newsletter@tech.com',
          to: 'moi@office.com',
          subject: 'Les dernières nouveautés tech',
          body: 'Découvrez les dernières innovations technologiques de la semaine...',
          date: new Date(Date.now() - 86400000).toISOString(),
          read: true,
          folder: 'inbox',
          starred: false
        }
      ];
      setEmails(demoEmails);
    }
    
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mailrapide_emails', JSON.stringify(emails));
  }, [emails]);

  useEffect(() => {
    localStorage.setItem('mailrapide_contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredEmails = emails
    .filter(email => email.folder === currentFolder)
    .filter(email => 
      searchQuery === '' ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.body.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const unreadCount = emails.filter(e => e.folder === 'inbox' && !e.read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR');
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    setCurrentView('read');
    if (!email.read) {
      setEmails(emails.map(e => e.id === email.id ? { ...e, read: true } : e));
    }
  };

  const handleSendEmail = () => {
    if (!composeData.to || !composeData.subject) {
      showToast('Veuillez remplir le destinataire et le sujet', 'warning');
      return;
    }

    const newEmail: Email = {
      id: Date.now().toString(),
      from: 'moi@office.com',
      to: composeData.to,
      subject: composeData.subject,
      body: composeData.body,
      date: new Date().toISOString(),
      read: true,
      folder: 'sent',
      starred: false
    };

    setEmails([...emails, newEmail]);
    setComposeData({ to: '', subject: '', body: '' });
    setCurrentView('list');
    showToast('Email envoyé avec succès !', 'success');
  };

  const handleSaveDraft = () => {
    if (!composeData.subject && !composeData.body) {
      showToast('Brouillon vide', 'warning');
      return;
    }

    const draft: Email = {
      id: Date.now().toString(),
      from: 'moi@office.com',
      to: composeData.to,
      subject: composeData.subject || 'Sans objet',
      body: composeData.body,
      date: new Date().toISOString(),
      read: true,
      folder: 'drafts',
      starred: false
    };

    setEmails([...emails, draft]);
    setComposeData({ to: '', subject: '', body: '' });
    setCurrentView('list');
    showToast('Brouillon sauvegardé', 'success');
  };

  const handleDeleteEmail = (emailId: string) => {
    const email = emails.find(e => e.id === emailId);
    if (email) {
      if (email.folder === 'trash') {
        setEmails(emails.filter(e => e.id !== emailId));
        showToast('Email supprimé définitivement', 'info');
      } else {
        setEmails(emails.map(e => e.id === emailId ? { ...e, folder: 'trash' } : e));
        showToast('Email déplacé dans la corbeille', 'info');
      }
    }
    if (currentView === 'read') {
      setCurrentView('list');
    }
  };

  const handleToggleStar = (emailId: string) => {
    setEmails(emails.map(e => e.id === emailId ? { ...e, starred: !e.starred } : e));
  };

  const handleReply = () => {
    if (selectedEmail) {
      setComposeData({
        to: selectedEmail.from,
        subject: `Re: ${selectedEmail.subject}`,
        body: `\n\n--- Message original ---\nDe: ${selectedEmail.from}\nObjet: ${selectedEmail.subject}\n\n${selectedEmail.body}`
      });
      setCurrentView('compose');
    }
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) {
      showToast('Veuillez remplir tous les champs', 'warning');
      return;
    }

    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      email: newContact.email
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: '', email: '' });
    setShowContactForm(false);
    showToast('Contact ajouté', 'success');
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(c => c.id !== contactId));
    showToast('Contact supprimé', 'info');
  };

  const handleExportEmails = async () => {
    const data = { emails, contacts, exportDate: new Date().toISOString() };
    const result = await saveJSONFileToComputer(data, 'outlook_emails_backup');
    if (result.success) {
      showToast(`Emails et contacts exportés : ${result.fileName}`, 'success');
    } else if (result.error && result.error !== 'Annulé par l\'utilisateur') {
      showToast(result.error, 'error');
    }
  };

  const handleImportEmails = async () => {
    const result = await openFileFromComputer(['.json']);
    if (result.success && result.content) {
      try {
        const data = JSON.parse(result.content);
        if (data.emails && Array.isArray(data.emails)) {
          setEmails(data.emails);
          if (data.contacts && Array.isArray(data.contacts)) {
            setContacts(data.contacts);
          }
          showToast('Emails et contacts importés avec succès', 'success');
        } else {
          showToast('Format de fichier invalide', 'error');
        }
      } catch (error) {
        showToast('Erreur lors de l\'import du fichier', 'error');
      }
    } else if (result.error && result.error !== 'Annulé par l\'utilisateur') {
      showToast(result.error, 'error');
    }
  };

  const folders = [
    { id: 'inbox' as Folder, name: 'Boîte de réception', icon: 'fas fa-inbox', count: unreadCount },
    { id: 'sent' as Folder, name: 'Envoyés', icon: 'fas fa-paper-plane', count: emails.filter(e => e.folder === 'sent').length },
    { id: 'drafts' as Folder, name: 'Brouillons', icon: 'fas fa-file', count: emails.filter(e => e.folder === 'drafts').length },
    { id: 'trash' as Folder, name: 'Corbeille', icon: 'fas fa-trash', count: emails.filter(e => e.folder === 'trash').length }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Title Bar - Outlook Style */}
      <div className="bg-[#0078d4] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:bg-white/10 p-1 rounded transition">
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
            <i className="fas fa-envelope text-sm"></i>
          </div>
          <span className="text-sm font-medium">Outlook - OfficeRapide</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { setComposeData({ to: '', subject: '', body: '' }); setCurrentView('compose'); }}
            className="bg-white text-[#0078d4] px-4 py-1 rounded font-medium hover:bg-gray-100 transition text-sm"
          >
            <i className="fas fa-pen mr-1"></i> Nouveau message
          </button>
          <button 
            onClick={handleExportEmails}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition text-sm"
            title="Exporter les emails et contacts sur votre ordinateur"
          >
            <i className="fas fa-hdd mr-1"></i> Exporter
          </button>
          <button 
            onClick={handleImportEmails}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition text-sm"
            title="Importer des emails et contacts depuis votre ordinateur"
          >
            <i className="fas fa-folder-plus mr-1"></i> Importer
          </button>
          {onOpenStorage && (
            <button onClick={onOpenStorage} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition" title="Gestionnaire de stockage">
              <i className="fas fa-database text-sm"></i>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="relative max-w-2xl mx-auto">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher dans les emails..."
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#0078d4] focus:border-transparent"
          />
        </div>
      </div>

      {/* Main Content - Three Pane Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Folders Pane */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 space-y-1">
            {folders.map(folder => (
              <button
                key={folder.id}
                onClick={() => { setCurrentFolder(folder.id); setCurrentView('list'); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition ${
                  currentFolder === folder.id && currentView === 'list'
                    ? 'bg-[#0078d4] text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className={folder.icon}></i>
                  <span>{folder.name}</span>
                </div>
                {folder.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    currentFolder === folder.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-auto p-4 border-t border-gray-200">
            <button
              onClick={() => setCurrentView('contacts')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <i className="fas fa-address-book"></i>
              <span>Contacts ({contacts.length})</span>
            </button>
          </div>
        </div>

        {/* Email List / Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {currentView === 'list' && (
            <>
              {/* Email List Header */}
              <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  {folders.find(f => f.id === currentFolder)?.name}
                </h2>
                <span className="text-sm text-gray-500">{filteredEmails.length} message{filteredEmails.length !== 1 ? 's' : ''}</span>
              </div>

              {/* Email List */}
              <div className="flex-1 overflow-y-auto">
                {filteredEmails.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <i className="fas fa-inbox text-5xl mb-4"></i>
                    <p>Aucun email dans ce dossier</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredEmails.map(email => (
                      <div
                        key={email.id}
                        onClick={() => handleEmailClick(email)}
                        className={`px-6 py-4 cursor-pointer hover:bg-gray-50 transition ${
                          !email.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleToggleStar(email.id); }}
                            className="mt-1 text-gray-300 hover:text-yellow-500 transition"
                          >
                            <i className={email.starred ? 'fas fa-star text-yellow-500' : 'far fa-star'}></i>
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm ${!email.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                {currentFolder === 'sent' ? `À: ${email.to}` : email.from}
                              </span>
                              <span className="text-xs text-gray-500">{formatDate(email.date)}</span>
                            </div>
                            <div className={`text-sm ${!email.read ? 'font-semibold text-gray-900' : 'text-gray-700'} truncate`}>
                              {email.subject}
                            </div>
                            <div className="text-xs text-gray-500 truncate mt-1">
                              {email.body.substring(0, 100)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {currentView === 'read' && selectedEmail && (
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedEmail.subject}</h2>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div>
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">{selectedEmail.from}</span>
                        <span className="text-gray-500"> à {selectedEmail.to}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(selectedEmail.date).toLocaleString('fr-FR')}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleReply}
                        className="px-4 py-2 bg-[#0078d4] text-white hover:bg-[#0066b8] rounded transition text-sm"
                      >
                        <i className="fas fa-reply mr-1"></i> Répondre
                      </button>
                      <button
                        onClick={() => handleDeleteEmail(selectedEmail.id)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition text-sm"
                      >
                        <i className="fas fa-trash mr-1"></i> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800">{selectedEmail.body}</pre>
                </div>
              </div>
            </div>
          )}

          {currentView === 'compose' && (
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nouveau message</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">À</label>
                    <input
                      type="email"
                      value={composeData.to}
                      onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                      placeholder="destinataire@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0078d4] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Objet</label>
                    <input
                      type="text"
                      value={composeData.subject}
                      onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                      placeholder="Objet du message"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0078d4] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                    <textarea
                      value={composeData.body}
                      onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
                      placeholder="Rédigez votre message..."
                      rows={15}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0078d4] focus:border-transparent resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSendEmail}
                      className="px-6 py-2 bg-[#0078d4] text-white hover:bg-[#0066b8] rounded-lg transition"
                    >
                      <i className="fas fa-paper-plane mr-2"></i> Envoyer
                    </button>
                    <button
                      onClick={handleSaveDraft}
                      className="px-6 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition"
                    >
                      <i className="fas fa-save mr-2"></i> Sauvegarder brouillon
                    </button>
                    <button
                      onClick={() => setCurrentView('list')}
                      className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'contacts' && (
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Contacts</h2>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="px-4 py-2 bg-[#0078d4] text-white hover:bg-[#0066b8] rounded-lg transition"
                  >
                    <i className="fas fa-plus mr-2"></i> Ajouter un contact
                  </button>
                </div>

                {showContactForm && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Nouveau contact</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                        placeholder="Nom"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0078d4] focus:border-transparent"
                      />
                      <input
                        type="email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0078d4] focus:border-transparent"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddContact}
                          className="px-4 py-2 bg-[#0078d4] text-white hover:bg-[#0066b8] rounded-lg transition"
                        >
                          Ajouter
                        </button>
                        <button
                          onClick={() => { setShowContactForm(false); setNewContact({ name: '', email: '' }); }}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {contacts.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <i className="fas fa-address-book text-5xl mb-4"></i>
                    <p>Aucun contact</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {contacts.map(contact => (
                      <div key={contact.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-semibold text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-600">{contact.email}</div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setComposeData({ to: contact.email, subject: '', body: '' });
                              setCurrentView('compose');
                            }}
                            className="px-4 py-2 bg-[#0078d4] text-white hover:bg-[#0066b8] rounded transition text-sm"
                          >
                            <i className="fas fa-envelope mr-1"></i> Email
                          </button>
                          <button
                            onClick={() => handleDeleteContact(contact.id)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition text-sm"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#0078d4] text-white px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span>{unreadCount} non lu{unreadCount !== 1 ? 's' : ''}</span>
          <span>{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{new Date().toLocaleDateString('fr-FR')}</span>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
