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

const ContactDirectory = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showActions, setShowActions] = useState(false);
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

  // Mock data for contacts
  const mockContacts = [
    {
      id: 1,
      name: "Michael Rodriguez",
      role: "Facilities Manager",
      company: "TechCorp Industries",
      email: "m.rodriguez@techcorp.com",
      phone: "(555) 123-4567",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      relationshipStrength: "Strong",
      lastInteraction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      totalCalls: 12,
      totalEmails: 8,
      totalMeetings: 3,
      territory: "North",
      isDecisionMaker: true,
      location: "Chicago, IL",
      startDate: new Date('2022-03-15'),
      recentActivity: "Discussed annual maintenance contract renewal and budget planning for 2024.",
      notes: `Key decision maker for all facility maintenance contracts. Very responsive and detail-oriented. Prefers email communication for documentation but appreciates follow-up calls. Budget cycle runs January-March. Has expressed interest in energy-efficient roofing solutions.`,
      communicationHistory: [
        {
          type: 'call',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          duration: '25 min',
          summary: 'Discussed annual maintenance contract renewal. Michael confirmed budget approval for $85K maintenance program. Wants detailed proposal by end of week.',
          nextAction: 'Send comprehensive maintenance proposal with energy efficiency options'
        },
        {
          type: 'email',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          duration: '',
          summary: 'Sent quarterly inspection report with photos and recommendations. Michael responded positively to preventive maintenance suggestions.',
          nextAction: 'Schedule follow-up call to discuss contract renewal'
        },
        {
          type: 'meeting',
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          duration: '45 min',
          summary: 'Site visit to review roof condition and discuss upcoming projects. Identified potential issues with HVAC unit placement affecting roof integrity.',
          nextAction: 'Provide written assessment and repair recommendations'
        }
      ],
      projects: [
        {
          name: "Annual Maintenance Contract 2024",
          description: "Comprehensive roof maintenance and inspection program",
          status: "Active",
          value: "$85,000",
          startDate: new Date('2024-01-01'),
          role: "Primary Contact"
        },
        {
          name: "Emergency Repair - Building A",
          description: "Storm damage repair and waterproofing",
          status: "Completed",
          value: "$12,500",
          startDate: new Date('2023-09-15'),
          role: "Approver"
        }
      ],
      networkConnections: [
        {
          name: "Sarah Chen",
          role: "Property Manager",
          relationship: "Reports to Michael",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          influence: "Medium"
        },
        {
          name: "David Thompson",
          role: "CFO",
          relationship: "Michael\'s supervisor",
          avatar: "https://randomuser.me/api/portraits/men/55.jpg",
          influence: "High"
        }
      ],
      properties: [
        {
          id: 1,
          address: "1200 Technology Drive, Chicago, IL 60654",
          squareFootage: 85000,
          buildingType: "Office",
          description: "Main corporate headquarters with modern office spaces and data center",
          yearBuilt: "2018",
          floors: "4",
          roofType: "TPO",
          lastInspection: "2024-10-15",
          maintenanceSchedule: "Semi-Annual",
          notes: "Recently upgraded HVAC system. Roof in excellent condition."
        },
        {
          id: 2,
          address: "750 Industrial Park Way, Chicago, IL 60607",
          squareFootage: 125000,
          buildingType: "Warehouse",
          description: "Distribution and storage facility with loading docks",
          yearBuilt: "2015",
          floors: "2",
          roofType: "EPDM",
          lastInspection: "2024-09-20",
          maintenanceSchedule: "Annual",
          notes: "High traffic area, regular inspections needed for loading dock areas."
        }
      ]
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Property Manager",
      company: "Global Manufacturing",
      email: "s.chen@globalmanuf.com",
      phone: "(555) 234-5678",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      relationshipStrength: "Medium",
      lastInteraction: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      totalCalls: 8,
      totalEmails: 15,
      totalMeetings: 2,
      territory: "South",
      isDecisionMaker: false,
      location: "Atlanta, GA",
      startDate: new Date('2023-01-20'),
      recentActivity: "Requested quotes for warehouse roof replacement project.",
      notes: `Manages day-to-day property operations but needs approval from facilities director for major projects. Very organized and prefers detailed documentation. Best contact time is Tuesday-Thursday mornings.`,
      communicationHistory: [
        {
          type: 'email',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          duration: '',
          summary: 'Sent detailed quote for warehouse roof replacement. Sarah requested additional options for insulation upgrades.',
          nextAction: 'Prepare revised quote with insulation options'
        },
        {
          type: 'call',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          duration: '15 min',
          summary: 'Initial discussion about roof replacement needs. Sarah mentioned budget constraints and need for phased approach.',
          nextAction: 'Develop phased implementation proposal'
        }
      ],
      projects: [
        {
          name: "Warehouse Roof Replacement",
          description: "Complete roof replacement for 50,000 sq ft warehouse",
          status: "Pending",
          value: "$125,000",
          startDate: new Date('2024-04-01'),
          role: "Project Coordinator"
        }
      ],
      networkConnections: [
        {
          name: "James Wilson",
          role: "Facilities Director",
          relationship: "Sarah\'s supervisor",
          avatar: "https://randomuser.me/api/portraits/men/38.jpg",
          influence: "High"
        }
      ],
      properties: [
        {
          id: 3,
          address: "3400 Manufacturing Boulevard, Atlanta, GA 30309",
          squareFootage: 200000,
          buildingType: "Manufacturing",
          description: "Primary manufacturing facility with heavy equipment and production lines",
          yearBuilt: "2012",
          floors: "3",
          roofType: "Built-Up",
          lastInspection: "2024-08-10",
          maintenanceSchedule: "Quarterly",
          notes: "High heat production requires specialized ventilation and roof maintenance."
        }
      ]
    },
    {
      id: 3,
      name: "David Thompson",
      role: "Maintenance Director",
      company: "Metro Construction",
      email: "d.thompson@metroconstruction.com",
      phone: "(555) 345-6789",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      relationshipStrength: "Weak",
      lastInteraction: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      totalCalls: 3,
      totalEmails: 5,
      totalMeetings: 1,
      territory: "East",
      isDecisionMaker: true,
      location: "New York, NY",
      startDate: new Date('2023-08-10'),
      recentActivity: "Initial meeting completed, awaiting follow-up response.",
      notes: `New contact, still building relationship. Seems cautious about new vendors but showed interest in our preventive maintenance approach. Prefers phone calls over emails.`,
      communicationHistory: [
        {
          type: 'meeting',
          date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
          duration: '30 min',
          summary: 'Initial introduction meeting. David expressed interest in preventive maintenance programs but wants to see case studies and references.',
          nextAction: 'Send case studies and reference list'
        }
      ],
      projects: [],
      networkConnections: [],
      properties: [
        {
          id: 4,
          address: "500 Construction Plaza, New York, NY 10013",
          squareFootage: 45000,
          buildingType: "Office",
          description: "Metro Construction corporate offices with conference facilities",
          yearBuilt: "2020",
          floors: "6",
          roofType: "Modified Bitumen",
          lastInspection: "2024-11-01",
          maintenanceSchedule: "Annual",
          notes: "New building with warranty coverage. Minimal maintenance required currently."
        },
        {
          id: 5,
          address: "1800 Equipment Storage Drive, Brooklyn, NY 11201",
          squareFootage: 75000,
          buildingType: "Warehouse",
          description: "Equipment storage and maintenance facility",
          yearBuilt: "2016",
          floors: "1",
          roofType: "Metal",
          lastInspection: "2024-07-15",
          maintenanceSchedule: "Semi-Annual",
          notes: "Heavy equipment storage requires reinforced structure and regular roof inspections."
        }
      ]
    },
    {
      id: 4,
      name: "Lisa Anderson",
      role: "Operations Manager",
      company: "Industrial Solutions",
      email: "l.anderson@industrialsolutions.com",
      phone: "(555) 456-7890",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      relationshipStrength: "Strong",
      lastInteraction: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      totalCalls: 18,
      totalEmails: 22,
      totalMeetings: 5,
      territory: "West",
      isDecisionMaker: true,
      location: "Los Angeles, CA",
      startDate: new Date('2021-11-05'),
      recentActivity: "Approved emergency repair work and scheduled quarterly inspection.",
      notes: `Long-term client and strong advocate for our services. Has referred us to other companies in her network. Very responsive and decisive. Prefers morning meetings and detailed follow-up emails.`,
      communicationHistory: [
        {
          type: 'call',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          duration: '20 min',
          summary: 'Emergency call about leak in Building C. Lisa approved immediate repair work. Discussed scheduling quarterly inspection.',
          nextAction: 'Complete emergency repair and schedule quarterly inspection'
        }
      ],
      projects: [
        {
          name: "Quarterly Maintenance Program",
          description: "Ongoing maintenance for 3 industrial buildings",
          status: "Active",
          value: "$45,000",
          startDate: new Date('2024-01-01'),
          role: "Primary Contact"
        }
      ],
      networkConnections: [
        {
          name: "Robert Kim",
          role: "Facility Supervisor",
          relationship: "Reports to Lisa",
          avatar: "https://randomuser.me/api/portraits/men/42.jpg",
          influence: "Medium"
        }
      ],
      properties: []
    },
    {
      id: 5,
      name: "James Wilson",
      role: "CEO",
      company: "Commercial Properties",
      email: "j.wilson@commercialprops.com",
      phone: "(555) 567-8901",
      avatar: "https://randomuser.me/api/portraits/men/38.jpg",
      relationshipStrength: "Medium",
      lastInteraction: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      totalCalls: 6,
      totalEmails: 10,
      totalMeetings: 2,
      territory: "Central",
      isDecisionMaker: true,
      location: "Dallas, TX",
      startDate: new Date('2023-05-12'),
      recentActivity: "Reviewing proposal for multi-building maintenance contract.",
      notes: `High-level executive who values efficiency and ROI. Delegates operational details but stays involved in major decisions. Interested in technology solutions and data-driven maintenance approaches.`,
      communicationHistory: [
        {
          type: 'email',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          duration: '',
          summary: 'Sent comprehensive proposal for multi-building maintenance contract. James requested ROI analysis and implementation timeline.',
          nextAction: 'Prepare detailed ROI analysis and phased implementation plan'
        }
      ],
      projects: [
        {
          name: "Multi-Building Maintenance Contract",
          description: "Maintenance program for 8 commercial properties",
          status: "Pending",
          value: "$200,000",
          startDate: new Date('2024-03-01'),
          role: "Decision Maker"
        }
      ],
      networkConnections: [
        {
          name: "Maria Garcia",
          role: "Operations Director",
          relationship: "Reports to James",
          avatar: "https://randomuser.me/api/portraits/women/35.jpg",
          influence: "High"
        }
      ],
      properties: []
    },
    {
      id: 6,
      name: "Robert Kim",
      role: "CFO",
      company: "TechCorp Industries",
      email: "r.kim@techcorp.com",
      phone: "(555) 678-9012",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      relationshipStrength: "Medium",
      lastInteraction: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      totalCalls: 4,
      totalEmails: 7,
      totalMeetings: 1,
      territory: "North",
      isDecisionMaker: true,
      location: "Chicago, IL",
      startDate: new Date('2023-09-20'),
      recentActivity: "Budget review meeting scheduled for next week.",
      notes: `Financial decision maker who focuses on cost-effectiveness and long-term value. Works closely with Michael Rodriguez on facility budgets. Prefers data-driven presentations with clear financial benefits.`,
      communicationHistory: [
        {
          type: 'meeting',
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          duration: '40 min',
          summary: 'Budget planning meeting for 2024 facility maintenance. Robert emphasized need for cost optimization while maintaining quality.',
          nextAction: 'Prepare cost-benefit analysis for maintenance program options'
        }
      ],
      projects: [],
      networkConnections: [
        {
          name: "Michael Rodriguez",
          role: "Facilities Manager",
          relationship: "Collaborates with Robert",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          influence: "Medium"
        }
      ],
      properties: []
    }
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
    setContacts(mockContacts);
    setFilteredContacts(mockContacts);
  }, []);

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
                onClick={() => console.log('Add new contact')}
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
                onClick={() => console.log('Add new contact')}
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
        </div>
      </main>
    </div>
  );
};

export default ContactDirectory;