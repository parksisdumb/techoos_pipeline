import React, { useState } from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';
import Input from './ui/Input';

const PropertyManagement = ({ 
  properties = [], 
  onAddProperty, 
  onEditProperty, 
  onDeleteProperty,
  onViewProperty,
  canManage = true 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [propertyForm, setPropertyForm] = useState({
    address: '',
    squareFootage: '',
    buildingType: '',
    description: '',
    yearBuilt: '',
    floors: '',
    roofType: '',
    lastInspection: '',
    maintenanceSchedule: 'Annual',
    notes: ''
  });

  const buildingTypes = [
    'Office',
    'Warehouse', 
    'Manufacturing',
    'Retail',
    'Mixed Use',
    'Healthcare',
    'Educational',
    'Industrial',
    'Other'
  ];

  const roofTypes = [
    'Flat',
    'Low Slope',
    'Steep Slope',
    'TPO',
    'EPDM',
    'Modified Bitumen',
    'Built-Up',
    'Metal',
    'Tile',
    'Shingle'
  ];

  const maintenanceSchedules = [
    'Monthly',
    'Quarterly',
    'Semi-Annual',
    'Annual',
    'Bi-Annual',
    'As Needed'
  ];

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    
    if (!propertyForm?.address || !propertyForm?.squareFootage || !propertyForm?.buildingType) {
      return;
    }

    const propertyData = {
      ...propertyForm,
      id: editingProperty?.id || Date?.now(),
      squareFootage: parseInt(propertyForm?.squareFootage?.replace(/,/g, '')),
      dateAdded: editingProperty?.dateAdded || new Date(),
      lastModified: new Date()
    };

    if (editingProperty) {
      onEditProperty?.(propertyData);
    } else {
      onAddProperty?.(propertyData);
    }

    resetForm();
  };

  const resetForm = () => {
    setPropertyForm({
      address: '',
      squareFootage: '',
      buildingType: '',
      description: '',
      yearBuilt: '',
      floors: '',
      roofType: '',
      lastInspection: '',
      maintenanceSchedule: 'Annual',
      notes: ''
    });
    setShowAddForm(false);
    setEditingProperty(null);
  };

  const handleEdit = (property) => {
    setPropertyForm({
      address: property?.address || '',
      squareFootage: property?.squareFootage?.toString() || '',
      buildingType: property?.buildingType || '',
      description: property?.description || '',
      yearBuilt: property?.yearBuilt?.toString() || '',
      floors: property?.floors?.toString() || '',
      roofType: property?.roofType || '',
      lastInspection: property?.lastInspection || '',
      maintenanceSchedule: property?.maintenanceSchedule || 'Annual',
      notes: property?.notes || ''
    });
    setEditingProperty(property);
    setShowAddForm(true);
  };

  const formatSquareFootage = (sqft) => {
    return sqft?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getMaintenanceStatusColor = (lastInspection, schedule) => {
    if (!lastInspection) return 'text-warning bg-warning/10 border-warning/20';
    
    const lastInspectionDate = new Date(lastInspection);
    const now = new Date();
    const monthsSinceInspection = (now - lastInspectionDate) / (1000 * 60 * 60 * 24 * 30);
    
    const scheduleMonths = {
      'Monthly': 1,
      'Quarterly': 3,
      'Semi-Annual': 6,
      'Annual': 12,
      'Bi-Annual': 24,
      'As Needed': 12
    };

    const dueMonths = scheduleMonths?.[schedule] || 12;
    
    if (monthsSinceInspection > dueMonths) {
      return 'text-error bg-error/10 border-error/20';
    } else if (monthsSinceInspection > dueMonths * 0.8) {
      return 'text-warning bg-warning/10 border-warning/20';
    }
    return 'text-success bg-success/10 border-success/20';
  };

  const getMaintenanceStatus = (lastInspection, schedule) => {
    if (!lastInspection) return 'Needs Inspection';
    
    const lastInspectionDate = new Date(lastInspection);
    const now = new Date();
    const monthsSinceInspection = (now - lastInspectionDate) / (1000 * 60 * 60 * 24 * 30);
    
    const scheduleMonths = {
      'Monthly': 1,
      'Quarterly': 3,
      'Semi-Annual': 6,
      'Annual': 12,
      'Bi-Annual': 24,
      'As Needed': 12
    };

    const dueMonths = scheduleMonths?.[schedule] || 12;
    
    if (monthsSinceInspection > dueMonths) {
      return 'Overdue';
    } else if (monthsSinceInspection > dueMonths * 0.8) {
      return 'Due Soon';
    }
    return 'Up to Date';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Property Portfolio</h3>
          <p className="text-sm text-muted-foreground">
            Properties managed by Metro Construction
          </p>
        </div>
        {canManage && (
          <Button
            variant="default"
            iconName="Plus"
            iconSize={16}
            onClick={() => setShowAddForm(true)}
          >
            Add Property
          </Button>
        )}
      </div>

      {/* Property List */}
      {properties?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {properties?.map((property) => (
            <div key={property?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{property?.address}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Square" size={14} />
                      <span>{formatSquareFootage(property?.squareFootage)} sq ft</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Building" size={14} />
                      <span>{property?.buildingType}</span>
                    </div>
                    {property?.yearBuilt && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{property?.yearBuilt}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getMaintenanceStatusColor(property?.lastInspection, property?.maintenanceSchedule)}`}>
                    {getMaintenanceStatus(property?.lastInspection, property?.maintenanceSchedule)}
                  </span>
                  {canManage && (
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MoreVertical"
                      iconSize={16}
                      onClick={() => {/* Add dropdown menu for actions */}}
                    />
                  )}
                </div>
              </div>
              
              {property?.description && (
                <p className="text-sm text-muted-foreground mb-3">
                  {property?.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                {property?.roofType && (
                  <div>
                    <span className="text-muted-foreground">Roof Type:</span>
                    <span className="ml-2 text-foreground">{property?.roofType}</span>
                  </div>
                )}
                {property?.floors && (
                  <div>
                    <span className="text-muted-foreground">Floors:</span>
                    <span className="ml-2 text-foreground">{property?.floors}</span>
                  </div>
                )}
                {property?.lastInspection && (
                  <div>
                    <span className="text-muted-foreground">Last Inspection:</span>
                    <span className="ml-2 text-foreground">
                      {new Date(property?.lastInspection)?.toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">Maintenance:</span>
                  <span className="ml-2 text-foreground">{property?.maintenanceSchedule}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconSize={14}
                  onClick={() => onViewProperty?.(property)}
                >
                  View Details
                </Button>
                {canManage && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit2"
                      iconSize={14}
                      onClick={() => handleEdit(property)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      iconSize={14}
                      className="text-error hover:text-error"
                      onClick={() => onDeleteProperty?.(property?.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-border rounded-lg">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Building" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Properties Added</h3>
          <p className="text-muted-foreground mb-4">
            Add properties to track the Metro Construction property portfolio
          </p>
          {canManage && (
            <Button
              variant="outline"
              iconName="Plus"
              iconSize={16}
              onClick={() => setShowAddForm(true)}
            >
              Add First Property
            </Button>
          )}
        </div>
      )}

      {/* Add/Edit Property Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {editingProperty ? 'Edit Property' : 'Add Property'}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                iconSize={20}
                onClick={resetForm}
              />
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address *
                    </label>
                    <Input
                      type="text"
                      value={propertyForm?.address}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, address: e?.target?.value }))}
                      placeholder="123 Main Street, City, State 12345"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Square Footage *
                    </label>
                    <Input
                      type="text"
                      value={propertyForm?.squareFootage}
                      onChange={(e) => {
                        const value = e?.target?.value?.replace(/[^0-9]/g, '');
                        setPropertyForm(prev => ({ ...prev, squareFootage: value }));
                      }}
                      placeholder="25000"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Building Type *
                    </label>
                    <select
                      value={propertyForm?.buildingType}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, buildingType: e?.target?.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select Building Type</option>
                      {buildingTypes?.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Year Built
                    </label>
                    <Input
                      type="text"
                      value={propertyForm?.yearBuilt}
                      onChange={(e) => {
                        const value = e?.target?.value?.replace(/[^0-9]/g, '');
                        if (value?.length <= 4) {
                          setPropertyForm(prev => ({ ...prev, yearBuilt: value }));
                        }
                      }}
                      placeholder="2020"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Number of Floors
                    </label>
                    <Input
                      type="text"
                      value={propertyForm?.floors}
                      onChange={(e) => {
                        const value = e?.target?.value?.replace(/[^0-9]/g, '');
                        setPropertyForm(prev => ({ ...prev, floors: value }));
                      }}
                      placeholder="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Roof Type
                    </label>
                    <select
                      value={propertyForm?.roofType}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, roofType: e?.target?.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Roof Type</option>
                      {roofTypes?.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Inspection
                    </label>
                    <Input
                      type="date"
                      value={propertyForm?.lastInspection}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, lastInspection: e?.target?.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Maintenance Schedule
                    </label>
                    <select
                      value={propertyForm?.maintenanceSchedule}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, maintenanceSchedule: e?.target?.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {maintenanceSchedules?.map(schedule => (
                        <option key={schedule} value={schedule}>{schedule}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description
                    </label>
                    <textarea
                      value={propertyForm?.description}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, description: e?.target?.value }))}
                      placeholder="Property description and details..."
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Notes
                    </label>
                    <textarea
                      value={propertyForm?.notes}
                      onChange={(e) => setPropertyForm(prev => ({ ...prev, notes: e?.target?.value }))}
                      placeholder="Additional notes and observations..."
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                >
                  {editingProperty ? 'Update Property' : 'Add Property'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;