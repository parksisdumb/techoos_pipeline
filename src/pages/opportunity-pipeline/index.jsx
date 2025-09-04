import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '../../components/ui/Header';
import PipelineMetrics from './components/PipelineMetrics';
import PipelineFilters from './components/PipelineFilters';
import PipelineStage from './components/PipelineStage';
import OpportunityModal from './components/OpportunityModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const OpportunityPipeline = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    buildingType: 'all',
    priority: 'all',
    sortBy: 'value-desc',
    minValue: 0,
    maxValue: 1000000,
    minProbability: 0,
    maxProbability: 100
  });

  // Mock data for pipeline stages
  const stages = [
    { id: 'lead', name: 'Lead', color: '#64748B' },
    { id: 'qualified', name: 'Qualified', color: '#3B82F6' },
    { id: 'proposal', name: 'Proposal', color: '#F59E0B' },
    { id: 'negotiation', name: 'Negotiation', color: '#EF4444' },
    { id: 'closed-won', name: 'Closed Won', color: '#10B981' }
  ];

  // Mock opportunities data
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      name: 'Warehouse Roof Replacement - Building A',
      stageId: 'qualified',
      value: 125000,
      probability: 75,
      priority: 'high',
      buildingType: 'warehouse',
      squareFootage: 45000,
      currentRoofType: 'Built-up roof (BUR)',
      proposedSolution: 'TPO Membrane System',
      expectedCloseDate: '2025-02-15',
      projectStart: '2025-03-01',
      duration: '3-4 weeks',
      description: `Complete roof replacement for 45,000 sq ft warehouse facility. Current built-up roof is showing significant wear and multiple leak points. Client is interested in TPO membrane system for improved energy efficiency and longevity.\n\nProject includes removal of existing roof system, installation of new insulation, and TPO membrane with fully adhered system. Client has budget approved and is looking to start project in March.`,
      company: {
        name: 'Midwest Distribution Corp',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center'
      },
      primaryContact: {
        name: 'Michael Rodriguez',
        title: 'Facilities Manager',
        email: 'mrodriguez@midwestdist.com',
        phone: '(555) 123-4567',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      additionalContacts: [
        {
          name: 'Jennifer Chen',
          title: 'Operations Director',
          email: 'jchen@midwestdist.com',
          phone: '(555) 123-4568',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        }
      ],
      lastActivity: {
        type: 'call',
        date: '2025-01-02',
        description: 'Follow-up call scheduled'
      }
    },
    {
      id: 2,
      name: 'Office Complex Roof Repair',
      stageId: 'proposal',
      value: 85000,
      probability: 60,
      priority: 'medium',
      buildingType: 'office',
      squareFootage: 28000,
      expectedCloseDate: '2025-01-25',
      description: `Comprehensive roof repair and maintenance for multi-tenant office complex. Includes repair of membrane damage, replacement of HVAC penetration seals, and installation of additional drainage systems.\n\nClient is evaluating multiple proposals and timeline is critical due to upcoming tenant lease renewals.`,
      company: {
        name: 'Premier Office Properties',
        logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop&crop=center'
      },
      primaryContact: {
        name: 'Sarah Thompson',
        title: 'Property Manager',
        email: 'sthompson@premieroffice.com',
        phone: '(555) 234-5678',
        avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
      },
      lastActivity: {
        type: 'email',
        date: '2025-01-01',
        description: 'Proposal sent'
      }
    },
    {
      id: 3,
      name: 'Retail Center Roof Upgrade',
      stageId: 'negotiation',
      value: 195000,
      probability: 85,
      priority: 'high',
      buildingType: 'retail',
      squareFootage: 65000,
      expectedCloseDate: '2025-01-20',
      description: `Full roof system upgrade for shopping center including installation of new EPDM membrane system with enhanced insulation package. Project includes coordination with multiple tenants and phased installation to minimize business disruption.`,
      company: {
        name: 'Crossroads Shopping Center',
        logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=center'
      },
      primaryContact: {
        name: 'David Kim',
        title: 'Development Manager',
        email: 'dkim@crossroadssc.com',
        phone: '(555) 345-6789',
        avatar: 'https://randomuser.me/api/portraits/men/18.jpg'
      },
      lastActivity: {
        type: 'meeting',
        date: '2024-12-30',
        description: 'Contract negotiation meeting'
      }
    },
    {
      id: 4,
      name: 'Manufacturing Plant Roof Assessment',
      stageId: 'lead',
      value: 75000,
      probability: 25,
      priority: 'low',
      buildingType: 'industrial',
      squareFootage: 35000,
      expectedCloseDate: '2025-03-10',
      description: `Initial roof assessment and repair recommendations for manufacturing facility. Client is in early stages of budget planning and exploring options for preventive maintenance vs. full replacement.`,
      company: {
        name: 'Advanced Manufacturing Inc',
        logo: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=100&h=100&fit=crop&crop=center'
      },
      primaryContact: {
        name: 'Lisa Martinez',
        title: 'Maintenance Supervisor',
        email: 'lmartinez@advancedmfg.com',
        phone: '(555) 456-7890',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
      },
      lastActivity: {
        type: 'call',
        date: '2024-12-28',
        description: 'Initial consultation call'
      }
    },
    {
      id: 5,
      name: 'Hospital Emergency Roof Repair',
      stageId: 'closed-won',
      value: 145000,
      probability: 100,
      priority: 'high',
      buildingType: 'healthcare',
      squareFootage: 42000,
      expectedCloseDate: '2025-01-15',
      description: `Emergency roof repair and waterproofing for hospital facility. Critical timeline due to patient care requirements. Project includes temporary protection systems and phased installation to maintain hospital operations.`,
      company: {
        name: 'Regional Medical Center',
        logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop&crop=center'
      },
      primaryContact: {
        name: 'Robert Johnson',
        title: 'Facilities Director',
        email: 'rjohnson@regionalmed.com',
        phone: '(555) 567-8901',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
      },
      lastActivity: {
        type: 'meeting',
        date: '2025-01-01',
        description: 'Contract signed'
      }
    },
    {
      id: 6,
      name: 'School District Roof Maintenance',
      stageId: 'qualified',
      value: 95000,
      probability: 50,
      priority: 'medium',
      buildingType: 'education',
      squareFootage: 38000,
      expectedCloseDate: '2025-04-01',
      description: `Annual roof maintenance and repair program for school district facilities. Includes inspection, minor repairs, and preventive maintenance across multiple buildings. Budget cycle timing is critical for approval.`,
      company: {
        name: 'Central School District',
        logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=100&h=100&fit=crop&crop=center'
      },
      primaryContact: {
        name: 'Amanda Wilson',
        title: 'Facilities Coordinator',
        email: 'awilson@centralschools.edu',
        phone: '(555) 678-9012',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      lastActivity: {
        type: 'email',
        date: '2024-12-29',
        description: 'Budget discussion email'
      }
    }
  ]);

  // Filter and sort opportunities
  const filteredOpportunities = opportunities?.filter(opp => {
    const matchesSearch = !filters?.search || 
      opp?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      opp?.company?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      opp?.primaryContact?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase());
    
    const matchesBuildingType = filters?.buildingType === 'all' || opp?.buildingType === filters?.buildingType;
    const matchesPriority = filters?.priority === 'all' || opp?.priority === filters?.priority;
    const matchesValue = opp?.value >= filters?.minValue && opp?.value <= filters?.maxValue;
    const matchesProbability = opp?.probability >= filters?.minProbability && opp?.probability <= filters?.maxProbability;

    return matchesSearch && matchesBuildingType && matchesPriority && matchesValue && matchesProbability;
  })?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'value-desc': return b?.value - a?.value;
      case 'value-asc': return a?.value - b?.value;
      case 'close-date-asc': return new Date(a.expectedCloseDate) - new Date(b.expectedCloseDate);
      case 'close-date-desc': return new Date(b.expectedCloseDate) - new Date(a.expectedCloseDate);
      case 'probability-desc': return b?.probability - a?.probability;
      case 'created-desc': return b?.id - a?.id;
      default: return 0;
    }
  });

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMoveOpportunity = (opportunityId, newStageId) => {
    setOpportunities(prev => prev?.map(opp => {
      if (opp?.id === opportunityId) {
        // Update probability based on stage
        let newProbability = opp?.probability;
        switch (newStageId) {
          case 'lead': newProbability = Math.min(25, opp?.probability); break;
          case 'qualified': newProbability = Math.max(25, Math.min(50, opp?.probability)); break;
          case 'proposal': newProbability = Math.max(50, Math.min(75, opp?.probability)); break;
          case 'negotiation': newProbability = Math.max(75, Math.min(90, opp?.probability)); break;
          case 'closed-won': newProbability = 100; break;
        }
        
        return {
          ...opp,
          stageId: newStageId,
          probability: newProbability
        };
      }
      return opp;
    }));
  };

  const handleOpenOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const handleEditOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const handleSaveOpportunity = (updatedOpportunity) => {
    setOpportunities(prev => prev?.map(opp => 
      opp?.id === updatedOpportunity?.id ? updatedOpportunity : opp
    ));
    setIsModalOpen(false);
    setSelectedOpportunity(null);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      buildingType: 'all',
      priority: 'all',
      sortBy: 'value-desc',
      minValue: 0,
      maxValue: 1000000,
      minProbability: 0,
      maxProbability: 100
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Opportunity Pipeline</h1>
                <p className="text-muted-foreground mt-1">
                  Track and manage your commercial roofing opportunities
                </p>
              </div>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
              >
                New Opportunity
              </Button>
            </div>

            {/* Pipeline Metrics */}
            <PipelineMetrics 
              opportunities={filteredOpportunities} 
              stages={stages} 
            />

            {/* Filters */}
            <PipelineFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
              totalOpportunities={opportunities?.length}
              filteredCount={filteredOpportunities?.length}
            />

            {/* Pipeline Board */}
            {isMobileView ? (
              // Mobile List View
              (<div className="space-y-4">
                {filteredOpportunities?.map((opportunity) => (
                  <div
                    key={opportunity?.id}
                    className="bg-card border border-border rounded-lg p-4"
                    onClick={() => handleOpenOpportunity(opportunity)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">
                          {opportunity?.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {opportunity?.company?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-foreground">
                          ${opportunity?.value?.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {opportunity?.probability}% probability
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ 
                            backgroundColor: stages?.find(s => s?.id === opportunity?.stageId)?.color 
                          }}
                        />
                        <span className="text-sm text-muted-foreground">
                          {stages?.find(s => s?.id === opportunity?.stageId)?.name}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(opportunity.expectedCloseDate)?.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>)
            ) : (
              // Desktop Kanban View
              (<div className="flex space-x-6 overflow-x-auto pb-4">
                {stages?.map((stage) => (
                  <PipelineStage
                    key={stage?.id}
                    stage={stage}
                    opportunities={filteredOpportunities}
                    onMoveOpportunity={handleMoveOpportunity}
                    onOpenOpportunity={handleOpenOpportunity}
                    onEditOpportunity={handleEditOpportunity}
                  />
                ))}
              </div>)
            )}

            {/* Empty State */}
            {filteredOpportunities?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No opportunities found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {filters?.search || filters?.buildingType !== 'all' || filters?.priority !== 'all' ?'Try adjusting your filters to see more opportunities.' :'Get started by creating your first opportunity.'}
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </main>

        {/* Opportunity Modal */}
        <OpportunityModal
          opportunity={selectedOpportunity}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOpportunity(null);
          }}
          onSave={handleSaveOpportunity}
        />
      </div>
    </DndProvider>
  );
};

export default OpportunityPipeline;