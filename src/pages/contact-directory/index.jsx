import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import { Checkbox } from '../../components/ui/Checkbox';
import ContactCard from './components/ContactCard';
import ContactProfile from './components/ContactProfile';
import ContactFilters from './components/ContactFilters';
import ContactSearch from './components/ContactSearch';
import ContactActions from './components/ContactActions';
import AddContactModal from './components/AddContactModal';
import { useContacts } from '../../contexts/ContactContext';

const ContactDirectory = ({ existingAccounts = [] }) => {
  const { contacts, addContact } = useContacts();
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({
    company: '',
    role: '',
    territory: '',
    relationship: '',
    interaction: ''
  });

  // Mock accounts if none provided
  const defaultAccounts = [
    { id: 1, companyName: "Metro Manufacturing Corp", location: "Chicago, IL", territory: "North" },
    { id: 2, companyName: "Riverside Retail Plaza", location: "Milwaukee, WI", territory: "North" },
    { id: 3, companyName: "TechHub Innovation Center", location: "Austin, TX", territory: "South" },
    { id: 4, companyName: "Central Distribution Hub", location: "Kansas City, MO", territory: "Central" },
    { id: 5, companyName: "Westside Medical Complex", location: "Denver, CO", territory: "West" }
  ];

  const recentContacts = [
    { name: "Lisa Anderson", company: "Industrial Solutions" },
    { name: "Michael Rodriguez", company: "TechCorp Industries" },
    { name: "Sarah Chen", company: "Global Manufacturing" }
  ];

  const favorites = [
    { name: "Lisa Anderson", company: "Industrial Solutions" },
    { name: "Michael Rodriguez", company: "TechCorp Industries" },
    { name: "James Wilson", company: "Commercial Properties" }
  ];

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [contacts, filters, sortBy, sortOrder]);

  const applyFiltersAndSort = () => {
    let filtered = [...contacts];

    // Apply filters
    if (filters?.company) {
      filtered = filtered?.filter(contact => 
        contact?.company?.toLowerCase()?.includes(filters?.company?.toLowerCase())
      );
    }
    if (filters?.role) {
      filtered = filtered?.filter(contact => 
        contact?.role?.toLowerCase()?.includes(filters?.role?.toLowerCase())
      );
    }
    if (filters?.territory) {
      filtered = filtered?.filter(contact => contact?.territory === filters?.territory);
    }
    if (filters?.relationship) {
      filtered = filtered?.filter(contact => contact?.relationshipStrength === filters?.relationship);
    }
    if (filters?.interaction) {
      const now = new Date();
      filtered = filtered?.filter(contact => {
        const daysDiff = Math.ceil((now - new Date(contact.lastInteraction)) / (1000 * 60 * 60 * 24));
        switch (filters?.interaction) {
          case 'recent': return daysDiff <= 7;
          case 'week': return daysDiff <= 7;
          case 'month': return daysDiff <= 30;
          case 'overdue': return daysDiff > 30;
          default: return true;
        }
      });
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'name':
          aValue = a?.name?.toLowerCase();
          bValue = b?.name?.toLowerCase();
          break;
        case 'company':
          aValue = a?.company?.toLowerCase();
          bValue = b?.company?.toLowerCase();
          break;
        case 'lastInteraction':
          aValue = new Date(a.lastInteraction);
          bValue = new Date(b.lastInteraction);
          break;
        case 'relationship':
          const relationshipOrder = { 'Strong': 3, 'Medium': 2, 'Weak': 1 };
          aValue = relationshipOrder?.[a?.relationshipStrength];
          bValue = relationshipOrder?.[b?.relationshipStrength];
          break;
        default:
          aValue = a?.name?.toLowerCase();
          bValue = b?.name?.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredContacts(filtered);
  };

  const handleSearch = (query) => {
    const searchResults = contacts?.filter(contact =>
      contact?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
      contact?.company?.toLowerCase()?.includes(query?.toLowerCase()) ||
      contact?.role?.toLowerCase()?.includes(query?.toLowerCase()) ||
      contact?.email?.toLowerCase()?.includes(query?.toLowerCase())
    );
    setFilteredContacts(searchResults);
  };

  const handleAdvancedSearch = (searchFilters) => {
    let results = [...contacts];

    Object.keys(searchFilters)?.forEach(key => {
      if (searchFilters?.[key]) {
        results = results?.filter(contact => {
          const value = contact?.[key]?.toLowerCase() || '';
          return value?.includes(searchFilters?.[key]?.toLowerCase());
        });
      }
    });

    setFilteredContacts(results);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      company: '',
      role: '',
      territory: '',
      relationship: '',
      interaction: ''
    });
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log(`Performing ${action} on contacts:`, selectedIds);
    // Implement bulk actions here
  };

  const handleViewProfile = (contact) => {
    setSelectedContact(contact);
    setShowProfile(true);
  };

  const handleContactAction = (contact, action) => {
    setSelectedContact(contact);
    setActionType(action);
    setShowActions(true);
  };

  const handleActionSubmit = (action, contact, formData) => {
    console.log(`${action} action for ${contact?.name}:`, formData);
    setShowActions(false);
    setSelectedContact(null);
    setActionType('');
  };

  const handleAddContact = () => {
    setShowAddModal(true);
  };

  const handleSaveContact = (newContact) => {
    addContact(newContact);
    setShowAddModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleContactSelect = (contactId, isSelected) => {
    if (isSelected) {
      setSelectedContacts(prev => [...prev, contactId]);
    } else {
      setSelectedContacts(prev => prev?.filter(id => id !== contactId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedContacts(filteredContacts?.map(contact => contact?.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'company', label: 'Company' },
    { value: 'lastInteraction', label: 'Last Interaction' },
    { value: 'relationship', label: 'Relationship Strength' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Contact Directory</h1>
              <p className="text-muted-foreground mt-2">
                Manage relationships and track communications with your commercial roofing contacts
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                iconSize={16}
                onClick={() => console.log('Export contacts')}
              >
                Export
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconSize={16}
                onClick={handleAddContact}
              >
                Add Contact
              </Button>
            </div>
          </div>

          {/* Search Component */}
          <ContactSearch
            onSearch={handleSearch}
            onAdvancedSearch={handleAdvancedSearch}
            recentContacts={recentContacts}
            favorites={favorites}
          />

          {/* Filters Component */}
          <ContactFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onBulkAction={handleBulkAction}
            selectedContacts={selectedContacts}
            totalContacts={filteredContacts?.length}
          />

          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedContacts?.length === filteredContacts?.length && filteredContacts?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  label={`Select All (${filteredContacts?.length})`}
                />
              </div>
              {selectedContacts?.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {selectedContacts?.length} selected
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="px-3 py-1 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {sortOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
                  iconSize={14}
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                />
              </div>

              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Grid3X3"
                  iconSize={16}
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                />
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="List"
                  iconSize={16}
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>

          {/* Contacts Grid */}
          {filteredContacts?.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :'grid-cols-1'
            }`}>
              {filteredContacts?.map((contact) => (
                <div key={contact?.id} className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Checkbox
                      checked={selectedContacts?.includes(contact?.id)}
                      onChange={(e) => handleContactSelect(contact?.id, e?.target?.checked)}
                    />
                  </div>
                  <ContactCard
                    contact={contact}
                    onViewProfile={handleViewProfile}
                    onLogCall={(contact) => handleContactAction(contact, 'call')}
                    onSendEmail={(contact) => handleContactAction(contact, 'email')}
                    onScheduleMeeting={(contact) => handleContactAction(contact, 'meeting')}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No contacts found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button
                variant="outline"
                iconName="Plus"
                iconSize={16}
                onClick={handleAddContact}
              >
                Add Your First Contact
              </Button>
            </div>
          )}

          {/* Contact Profile Modal */}
          {showProfile && selectedContact && (
            <ContactProfile
              contact={selectedContact}
              onClose={() => {
                setShowProfile(false);
                setSelectedContact(null);
              }}
              onLogCall={(contact) => handleContactAction(contact, 'call')}
              onSendEmail={(contact) => handleContactAction(contact, 'email')}
              onScheduleMeeting={(contact) => handleContactAction(contact, 'meeting')}
            />
          )}

          {/* Contact Actions Modal */}
          {showActions && selectedContact && (
            <ContactActions
              contact={selectedContact}
              actionType={actionType}
              onClose={() => {
                setShowActions(false);
                setSelectedContact(null);
                setActionType('');
              }}
              onSubmit={handleActionSubmit}
            />
          )}

          {/* Add Contact Modal */}
          <AddContactModal
            isOpen={showAddModal}
            onClose={handleCloseAddModal}
            onSave={handleSaveContact}
            existingAccounts={existingAccounts.length > 0 ? existingAccounts : defaultAccounts}
          />
        </div>
      </main>
    </div>
  );
};

export default ContactDirectory;