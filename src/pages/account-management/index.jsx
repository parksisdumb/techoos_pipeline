import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AccountCard from './components/AccountCard';
import AccountFilters from './components/AccountFilters';
import AccountOverview from './components/AccountOverview';
import ProjectTracking from './components/ProjectTracking';
import TerritoryMap from './components/TerritoryMap';
import AddAccountModal from './components/AddAccountModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useContacts } from '../../contexts/ContactContext';
import { useAccounts } from '../../contexts/AccountContext';

const AccountManagement = () => {
  const { getContactCountByAccount } = useContacts();
  const { accounts, addAccount } = useAccounts();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerritory, setSelectedTerritory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    territory: '',
    companySize: '',
    industry: '',
    minValue: '',
    maxValue: ''
  });

  // Update contact counts with live data from context
  const accountsWithLiveCounts = accounts.map(account => ({
    ...account,
    contacts: getContactCountByAccount(account.id)
  }));

  // Original mock data is now in AccountContext
  const originalMockAccounts = [
    {
      id: 1,
      companyName: "Metro Manufacturing Corp",
      status: "Active",
      priority: "High",
      location: "Chicago, IL",
      industry: "Manufacturing",
      employeeCount: 450,
      totalValue: "$125,000",
      activeProjects: 3,
      contacts: getContactCountByAccount(1),
      lastActivity: 2,
      lastContactDate: "Dec 2, 2024",
      website: "https://metromanufacturing.com",
      phone: "(312) 555-0123",
      annualRevenue: "$50M - $100M",
      primaryContact: "John Mitchell - Facilities Manager",
      territory: "North",
      accountOwner: "Sarah Johnson",
      totalProjectValue: "$125,000",
      recentActivities: [
        {
          icon: "Phone",
          title: "Follow-up call completed",
          description: "Discussed Q1 roofing maintenance schedule with facilities team",
          date: "Dec 2, 2024 - 2:30 PM"
        },
        {
          icon: "Mail",
          title: "Proposal sent",
          description: "Submitted comprehensive roofing inspection proposal for Building A",
          date: "Nov 28, 2024 - 10:15 AM"
        },
        {
          icon: "Calendar",
          title: "Site visit scheduled",
          description: "On-site assessment planned for warehouse roof evaluation",
          date: "Nov 25, 2024 - 4:00 PM"
        }
      ],
      keyContacts: [
        { name: "John Mitchell", title: "Facilities Manager", lastContact: "Dec 2, 2024" },
        { name: "Lisa Chen", title: "Operations Director", lastContact: "Nov 28, 2024" },
        { name: "Mike Rodriguez", title: "Maintenance Supervisor", lastContact: "Nov 20, 2024" }
      ],
      projects: [
        {
          name: "Warehouse Roof Replacement",
          status: "In Progress",
          priority: "High",
          description: "Complete roof replacement for main warehouse facility including insulation upgrade",
          value: "$85,000",
          dueDate: "Mar 15, 2025",
          projectManager: "Tom Wilson",
          progress: 35,
          buildingType: "Warehouse",
          roofArea: "25,000 sq ft",
          material: "TPO Membrane",
          recentUpdates: [
            { message: "Material delivery scheduled for next week", date: "Dec 1, 2024" },
            { message: "Weather delay pushed timeline by 3 days", date: "Nov 28, 2024" }
          ]
        },
        {
          name: "Office Building Maintenance",
          status: "Planning",
          priority: "Medium",
          description: "Annual maintenance and inspection of office building roof systems",
          value: "$25,000",
          dueDate: "Jan 30, 2025",
          projectManager: "Sarah Johnson",
          progress: 10,
          buildingType: "Office",
          roofArea: "8,500 sq ft",
          material: "EPDM",
          recentUpdates: [
            { message: "Initial inspection completed", date: "Nov 30, 2024" },
            { message: "Maintenance plan drafted", date: "Nov 25, 2024" }
          ]
        }
      ],
      properties: [
        {
          id: 1,
          address: "2500 Manufacturing Drive, Chicago, IL 60632",
          squareFootage: 150000,
          buildingType: "Manufacturing",
          description: "Primary manufacturing facility with heavy machinery and assembly lines",
          yearBuilt: "2010",
          floors: "2",
          roofType: "Built-Up",
          lastInspection: "2024-09-15",
          maintenanceSchedule: "Quarterly",
          notes: "High heat and moisture environment requires specialized roof maintenance."
        },
        {
          id: 2,
          address: "1800 Corporate Center, Chicago, IL 60654",
          squareFootage: 65000,
          buildingType: "Office",
          description: "Corporate headquarters with administrative offices and conference facilities",
          yearBuilt: "2015",
          floors: "5",
          roofType: "TPO",
          lastInspection: "2024-10-20",
          maintenanceSchedule: "Annual",
          notes: "Modern building with good maintenance history."
        }
      ]
    },
    {
      id: 2,
      companyName: "Riverside Retail Plaza",
      status: "Prospect",
      priority: "Medium",
      location: "Milwaukee, WI",
      industry: "Retail",
      employeeCount: 125,
      totalValue: "$75,000",
      activeProjects: 1,
      contacts: getContactCountByAccount(2),
      lastActivity: 7,
      lastContactDate: "Nov 27, 2024",
      website: "https://riversideretail.com",
      phone: "(414) 555-0456",
      annualRevenue: "$10M - $25M",
      primaryContact: "Amanda Foster - Property Manager",
      territory: "North",
      accountOwner: "Sarah Johnson",
      totalProjectValue: "$75,000",
      recentActivities: [
        {
          icon: "Mail",
          title: "Initial proposal submitted",
          description: "Sent comprehensive roofing assessment proposal for retail complex",
          date: "Nov 27, 2024 - 11:30 AM"
        },
        {
          icon: "Calendar",
          title: "Meeting scheduled",
          description: "Property walkthrough arranged with management team",
          date: "Nov 22, 2024 - 3:45 PM"
        }
      ],
      keyContacts: [
        { name: "Amanda Foster", title: "Property Manager", lastContact: "Nov 27, 2024" },
        { name: "David Park", title: "Maintenance Director", lastContact: "Nov 20, 2024" }
      ],
      projects: [
        {
          name: "Retail Complex Roof Assessment",
          status: "Planning",
          priority: "Medium",
          description: "Comprehensive evaluation of multi-building retail complex roofing systems",
          value: "$75,000",
          dueDate: "Feb 28, 2025",
          projectManager: "Mike Chen",
          progress: 5,
          buildingType: "Retail",
          roofArea: "45,000 sq ft",
          material: "Modified Bitumen",
          recentUpdates: [
            { message: "Site survey scheduled", date: "Nov 27, 2024" },
            { message: "Proposal under review", date: "Nov 25, 2024" }
          ]
        }
      ],
      properties: [
        {
          id: 3,
          address: "900 Riverside Plaza, Milwaukee, WI 53202",
          squareFootage: 180000,
          buildingType: "Retail",
          description: "Multi-tenant retail complex with anchor stores and smaller shops",
          yearBuilt: "2008",
          floors: "2",
          roofType: "Modified Bitumen",
          lastInspection: "2024-06-10",
          maintenanceSchedule: "Semi-Annual",
          notes: "High foot traffic area with multiple HVAC units requiring regular maintenance."
        }
      ]
    },
    {
      id: 3,
      companyName: "TechHub Innovation Center",
      status: "Active",
      priority: "High",
      location: "Austin, TX",
      industry: "Technology",
      employeeCount: 280,
      totalValue: "$95,000",
      activeProjects: 2,
      contacts: getContactCountByAccount(3),
      lastActivity: 1,
      lastContactDate: "Dec 3, 2024",
      website: "https://techhub.com",
      phone: "(512) 555-0789",
      annualRevenue: "$25M - $50M",
      primaryContact: "Rachel Kim - Facilities Director",
      territory: "South",
      accountOwner: "Mark Thompson",
      totalProjectValue: "$95,000",
      recentActivities: [
        {
          icon: "CheckCircle",
          title: "Contract signed",
          description: "Finalized agreement for innovation center roof upgrade project",
          date: "Dec 3, 2024 - 1:15 PM"
        },
        {
          icon: "Users",
          title: "Team meeting",
          description: "Kickoff meeting with facilities and IT teams for project coordination",
          date: "Dec 1, 2024 - 9:00 AM"
        }
      ],
      keyContacts: [
        { name: "Rachel Kim", title: "Facilities Director", lastContact: "Dec 3, 2024" },
        { name: "James Liu", title: "IT Manager", lastContact: "Dec 1, 2024" },
        { name: "Sarah Williams", title: "Operations Manager", lastContact: "Nov 29, 2024" }
      ],
      projects: [
        {
          name: "Innovation Center Roof Upgrade",
          status: "In Progress",
          priority: "High",
          description: "Modern roof system upgrade with solar panel integration capability",
          value: "$65,000",
          dueDate: "Apr 15, 2025",
          projectManager: "Lisa Rodriguez",
          progress: 20,
          buildingType: "Office/Tech",
          roofArea: "18,000 sq ft",
          material: "TPO with Solar Ready",
          recentUpdates: [
            { message: "Contract finalized and signed", date: "Dec 3, 2024" },
            { message: "Engineering plans approved", date: "Nov 30, 2024" }
          ]
        }
      ],
      properties: [
        {
          id: 4,
          address: "4000 Innovation Boulevard, Austin, TX 78746",
          squareFootage: 95000,
          buildingType: "Office/Tech",
          description: "Modern innovation center with labs, offices, and collaboration spaces",
          yearBuilt: "2019",
          floors: "4",
          roofType: "TPO with Solar Ready",
          lastInspection: "2024-11-15",
          maintenanceSchedule: "Semi-Annual",
          notes: "State-of-the-art facility designed for future solar panel installation."
        }
      ]
    },
    {
      id: 4,
      companyName: "Central Distribution Hub",
      status: "Inactive",
      priority: "Low",
      location: "Kansas City, MO",
      industry: "Logistics",
      employeeCount: 85,
      totalValue: "$45,000",
      activeProjects: 0,
      contacts: getContactCountByAccount(4),
      lastActivity: 45,
      lastContactDate: "Oct 19, 2024",
      website: "https://centraldist.com",
      phone: "(816) 555-0234",
      annualRevenue: "$5M - $10M",
      primaryContact: "Robert Chen - Operations Manager",
      territory: "Central",
      accountOwner: "Jennifer Davis",
      totalProjectValue: "$45,000",
      recentActivities: [
        {
          icon: "Phone",
          title: "Follow-up attempt",
          description: "Left voicemail regarding seasonal maintenance program",
          date: "Oct 19, 2024 - 2:20 PM"
        }
      ],
      keyContacts: [
        { name: "Robert Chen", title: "Operations Manager", lastContact: "Oct 19, 2024" },
        { name: "Maria Santos", title: "Facility Coordinator", lastContact: "Sep 15, 2024" }
      ],
      projects: [],
      properties: []
    },
    {
      id: 5,
      companyName: "Westside Medical Complex",
      status: "Active",
      priority: "Medium",
      location: "Denver, CO",
      industry: "Healthcare",
      employeeCount: 320,
      totalValue: "$110,000",
      activeProjects: 2,
      contacts: getContactCountByAccount(5),
      lastActivity: 5,
      lastContactDate: "Nov 29, 2024",
      website: "https://westsidemedical.com",
      phone: "(303) 555-0567",
      annualRevenue: "$50M - $100M",
      primaryContact: "Dr. Patricia Moore - Facility Administrator",
      territory: "West",
      accountOwner: "Alex Rivera",
      totalProjectValue: "$110,000",
      recentActivities: [
        {
          icon: "FileText",
          title: "Compliance review",
          description: "Reviewed healthcare facility roofing compliance requirements",
          date: "Nov 29, 2024 - 10:45 AM"
        },
        {
          icon: "Calendar",
          title: "Inspection scheduled",
          description: "Quarterly roof inspection arranged for medical complex",
          date: "Nov 26, 2024 - 2:15 PM"
        }
      ],
      keyContacts: [
        { name: "Dr. Patricia Moore", title: "Facility Administrator", lastContact: "Nov 29, 2024" },
        { name: "Kevin Walsh", title: "Maintenance Director", lastContact: "Nov 26, 2024" },
        { name: "Jennifer Adams", title: "Safety Coordinator", lastContact: "Nov 22, 2024" }
      ],
      projects: [
        {
          name: "Medical Wing Roof Repair",
          status: "In Progress",
          priority: "High",
          description: "Critical roof repairs for patient care wing with minimal disruption",
          value: "$70,000",
          dueDate: "Jan 15, 2025",
          projectManager: "Carlos Martinez",
          progress: 60,
          buildingType: "Healthcare",
          roofArea: "12,000 sq ft",
          material: "EPDM",
          recentUpdates: [
            { message: "Phase 1 repairs completed successfully", date: "Nov 28, 2024" },
            { message: "No disruption to patient services", date: "Nov 25, 2024" }
          ]
        }
      ],
      properties: []
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Account Overview', icon: 'Building2' },
    { id: 'projects', label: 'Project Tracking', icon: 'Building' },
    { id: 'territory', label: 'Territory Map', icon: 'Map' }
  ];

  // Filter accounts based on search and filters
  const filteredAccounts = accountsWithLiveCounts?.filter(account => {
    const matchesSearch = account?.companyName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         account?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         account?.industry?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    const matchesStatus = !filters?.status || account?.status === filters?.status;
    const matchesPriority = !filters?.priority || account?.priority === filters?.priority;
    const matchesTerritory = !filters?.territory || account?.territory === filters?.territory;
    const matchesIndustry = !filters?.industry || account?.industry === filters?.industry;

    const accountValue = parseInt(account?.totalValue?.replace(/[$,]/g, ''));
    const matchesMinValue = !filters?.minValue || accountValue >= parseInt(filters?.minValue);
    const matchesMaxValue = !filters?.maxValue || accountValue <= parseInt(filters?.maxValue);

    let matchesCompanySize = true;
    if (filters?.companySize) {
      switch (filters?.companySize) {
        case 'Small':
          matchesCompanySize = account?.employeeCount <= 50;
          break;
        case 'Medium':
          matchesCompanySize = account?.employeeCount > 50 && account?.employeeCount <= 200;
          break;
        case 'Large':
          matchesCompanySize = account?.employeeCount > 200 && account?.employeeCount <= 1000;
          break;
        case 'Enterprise':
          matchesCompanySize = account?.employeeCount > 1000;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesTerritory && 
           matchesIndustry && matchesMinValue && matchesMaxValue && matchesCompanySize;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      territory: '',
      companySize: '',
      industry: '',
      minValue: '',
      maxValue: ''
    });
    setSearchQuery('');
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    setActiveTab('overview');
  };

  const handleViewDetails = (account) => {
    setSelectedAccount(account);
    setActiveTab('overview');
  };

  const handleAddContact = (account) => {
    console.log('Add contact for:', account?.companyName);
    // Navigate to contact creation
  };

  const handleLogInteraction = (account) => {
    console.log('Log interaction for:', account?.companyName);
    // Navigate to activity logging
  };

  const handleCreateOpportunity = (account) => {
    console.log('Create opportunity for:', account?.companyName);
    // Navigate to opportunity creation
  };

  const handleCreateProject = (account) => {
    console.log('Create project for:', account?.companyName);
    // Navigate to project creation
  };

  const handleViewProject = (project) => {
    console.log('View project:', project?.name);
    // Navigate to project details
  };

  const handleEditAccount = (account) => {
    console.log('Edit account:', account?.companyName);
    // Navigate to account editing
  };

  const handleViewContacts = (account) => {
    console.log('View contacts for:', account?.companyName);
    // Navigate to contact directory with account filter
  };

  const handleTerritoryChange = (territory) => {
    setSelectedTerritory(territory);
  };

  const handleAddAccount = () => {
    setShowAddModal(true);
  };

  const handleSaveAccount = (newAccount) => {
    addAccount(newAccount);
    // Auto-select the newly created account
    setSelectedAccount(newAccount);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  // Set initial selected account
  useEffect(() => {
    if (accountsWithLiveCounts?.length > 0 && !selectedAccount) {
      setSelectedAccount(accountsWithLiveCounts?.[0]);
    }
  }, [accountsWithLiveCounts, selectedAccount]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Account Management</h1>
                <p className="text-muted-foreground mt-2">
                  Manage target accounts and track commercial roofing opportunities
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}
                >
                  Export Data
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  onClick={handleAddAccount}
                >
                  Add Account
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <AccountFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account List */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Accounts</h2>
                    <div className="text-sm text-muted-foreground">
                      {filteredAccounts?.length} of {accountsWithLiveCounts?.length}
                    </div>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {filteredAccounts?.length > 0 ? (
                    <div className="p-4 space-y-3">
                      {filteredAccounts?.map((account) => (
                        <div
                          key={account?.id}
                          onClick={() => handleAccountSelect(account)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                            selectedAccount?.id === account?.id
                              ? 'bg-primary/10 border-primary/20' :'bg-card border-border hover:bg-muted/30'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground text-sm">{account?.companyName}</h3>
                              <p className="text-xs text-muted-foreground">{account?.location}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                              account?.status === 'Active' ?'bg-success/10 text-success border-success/20'
                                : account?.status === 'Prospect' ?'bg-warning/10 text-warning border-warning/20' :'bg-muted text-muted-foreground border-border'
                            }`}>
                              {account?.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{account?.totalValue}</span>
                            <span>{account?.activeProjects} projects</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No Accounts Found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-card border border-border rounded-lg mb-6">
                <div className="flex border-b border-border overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                        activeTab === tab?.id
                          ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-96">
                {activeTab === 'overview' && (
                  <AccountOverview
                    account={selectedAccount}
                    onEdit={handleEditAccount}
                    onAddContact={handleAddContact}
                    onViewContacts={handleViewContacts}
                  />
                )}

                {activeTab === 'projects' && (
                  <ProjectTracking
                    account={selectedAccount}
                    onCreateProject={handleCreateProject}
                    onViewProject={handleViewProject}
                  />
                )}

                {activeTab === 'territory' && (
                  <TerritoryMap
                    accounts={filteredAccounts}
                    selectedTerritory={selectedTerritory}
                    onTerritoryChange={handleTerritoryChange}
                    onAccountSelect={handleAccountSelect}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Mobile Account Cards */}
          <div className="lg:hidden mt-8">
            <div className="space-y-4">
              {filteredAccounts?.map((account) => (
                <AccountCard
                  key={account?.id}
                  account={account}
                  onViewDetails={handleViewDetails}
                  onAddContact={handleAddContact}
                  onLogInteraction={handleLogInteraction}
                  onCreateOpportunity={handleCreateOpportunity}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        onSave={handleSaveAccount}
      />
    </div>
  );
};

export default AccountManagement;