import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ContactSearch = ({ onSearch, onAdvancedSearch, recentContacts, favorites }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    notes: ''
  });

  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef?.current && !suggestionsRef?.current?.contains(event?.target) &&
          searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
      setShowSuggestions(false);
    }
  };

  const handleAdvancedSearch = (e) => {
    e?.preventDefault();
    onAdvancedSearch(advancedFilters);
    setIsAdvancedOpen(false);
  };

  const handleQuickSelect = (contact) => {
    setSearchQuery(contact?.name);
    onSearch(contact?.name);
    setShowSuggestions(false);
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      name: '',
      company: '',
      role: '',
      email: '',
      phone: '',
      notes: ''
    });
  };

  const getSuggestions = () => {
    if (!searchQuery) return [];
    
    const allContacts = [...recentContacts, ...favorites];
    return allContacts?.filter(contact => 
        contact?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        contact?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        contact?.role?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )?.slice(0, 5);
  };

  const suggestions = getSuggestions();

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Search" size={20} className="text-primary" />
          <h3 className="font-medium text-foreground">Search Contacts</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Settings"
          iconSize={14}
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
        >
          Advanced Search
        </Button>
      </div>
      <div className="relative" ref={searchRef}>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              type="search"
              placeholder="Search by name, company, role, or email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e?.target?.value);
                setShowSuggestions(e?.target?.value?.length > 0);
              }}
              onFocus={() => setShowSuggestions(searchQuery?.length > 0)}
              className="w-full pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Icon name="Search" size={16} className="text-muted-foreground" />
            </div>
          </div>
          <Button type="submit" variant="default">
            Search
          </Button>
        </form>

        {/* Search Suggestions */}
        {showSuggestions && suggestions?.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevation-3 z-50 max-h-60 overflow-y-auto"
          >
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2 px-2">Suggestions</div>
              {suggestions?.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSelect(contact)}
                  className="w-full text-left p-2 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={14} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">{contact?.name}</div>
                      <div className="text-xs text-muted-foreground">{contact?.role} at {contact?.company}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Quick Access */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Contacts */}
        <div>
          <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span>Recent Contacts</span>
          </h4>
          <div className="space-y-1">
            {recentContacts?.slice(0, 3)?.map((contact, index) => (
              <button
                key={index}
                onClick={() => handleQuickSelect(contact)}
                className="w-full text-left p-2 hover:bg-muted/30 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Icon name="User" size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{contact?.name}</span>
                <span className="text-xs text-muted-foreground">• {contact?.company}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Favorites */}
        <div>
          <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="Star" size={16} className="text-warning" />
            <span>Favorites</span>
          </h4>
          <div className="space-y-1">
            {favorites?.slice(0, 3)?.map((contact, index) => (
              <button
                key={index}
                onClick={() => handleQuickSelect(contact)}
                className="w-full text-left p-2 hover:bg-muted/30 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Icon name="Star" size={14} className="text-warning" />
                <span className="text-sm text-foreground">{contact?.name}</span>
                <span className="text-xs text-muted-foreground">• {contact?.company}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Advanced Search Panel */}
      {isAdvancedOpen && (
        <div className="mt-6 pt-6 border-t border-border">
          <form onSubmit={handleAdvancedSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <Input
                label="Name"
                type="text"
                placeholder="Contact name"
                value={advancedFilters?.name}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, name: e?.target?.value }))}
              />
              <Input
                label="Company"
                type="text"
                placeholder="Company name"
                value={advancedFilters?.company}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, company: e?.target?.value }))}
              />
              <Input
                label="Role"
                type="text"
                placeholder="Job title or role"
                value={advancedFilters?.role}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, role: e?.target?.value }))}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Email address"
                value={advancedFilters?.email}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, email: e?.target?.value }))}
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="Phone number"
                value={advancedFilters?.phone}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, phone: e?.target?.value }))}
              />
              <Input
                label="Notes"
                type="text"
                placeholder="Search in notes"
                value={advancedFilters?.notes}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, notes: e?.target?.value }))}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button type="submit" variant="default">
                Search
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={clearAdvancedFilters}
              >
                Clear
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsAdvancedOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactSearch;