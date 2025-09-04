import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddAccountModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    location: '',
    employeeCount: '',
    annualRevenue: '',
    phone: '',
    website: '',
    primaryContact: '',
    territory: '',
    accountOwner: '',
    status: 'Prospect',
    priority: 'Medium',
    totalValue: '0'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const industries = [
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Logistics', label: 'Logistics' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Government', label: 'Government' },
    { value: 'Hospitality', label: 'Hospitality' },
    { value: 'Other', label: 'Other' }
  ];

  const territories = [
    { value: 'North', label: 'North' },
    { value: 'South', label: 'South' },
    { value: 'East', label: 'East' },
    { value: 'West', label: 'West' },
    { value: 'Central', label: 'Central' }
  ];

  const statuses = [
    { value: 'Prospect', label: 'Prospect' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const priorities = [
    { value: 'High', label: 'High Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'Low', label: 'Low Priority' }
  ];

  const revenueRanges = [
    { value: 'Under $1M', label: 'Under $1M' },
    { value: '$1M - $5M', label: '$1M - $5M' },
    { value: '$5M - $10M', label: '$5M - $10M' },
    { value: '$10M - $25M', label: '$10M - $25M' },
    { value: '$25M - $50M', label: '$25M - $50M' },
    { value: '$50M - $100M', label: '$50M - $100M' },
    { value: 'Over $100M', label: 'Over $100M' }
  ];

  const accountOwners = [
    { value: 'Sarah Johnson', label: 'Sarah Johnson' },
    { value: 'Mark Thompson', label: 'Mark Thompson' },
    { value: 'Jennifer Davis', label: 'Jennifer Davis' },
    { value: 'Alex Rivera', label: 'Alex Rivera' }
  ];

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.employeeCount || isNaN(formData.employeeCount) || formData.employeeCount < 1) {
      newErrors.employeeCount = 'Valid employee count is required';
    }

    if (formData.phone && !/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL (include http:// or https://)';
    }

    if (!formData.territory) {
      newErrors.territory = 'Territory is required';
    }

    if (!formData.accountOwner) {
      newErrors.accountOwner = 'Account owner is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new account object matching the existing structure
      const newAccount = {
        id: Date.now(), // Simple ID generation - in real app would use proper UUID
        companyName: formData.companyName.trim(),
        status: formData.status,
        priority: formData.priority,
        location: formData.location.trim(),
        industry: formData.industry,
        employeeCount: parseInt(formData.employeeCount),
        totalValue: formData.totalValue ? `$${parseInt(formData.totalValue).toLocaleString()}` : '$0',
        activeProjects: 0,
        contacts: 0,
        lastActivity: 0,
        lastContactDate: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        website: formData.website || '',
        phone: formData.phone || '',
        annualRevenue: formData.annualRevenue || 'Not specified',
        primaryContact: formData.primaryContact.trim() || 'Not specified',
        territory: formData.territory,
        accountOwner: formData.accountOwner,
        totalProjectValue: formData.totalValue ? `$${parseInt(formData.totalValue).toLocaleString()}` : '$0',
        recentActivities: [
          {
            icon: "Plus",
            title: "Account created",
            description: "New account added to the system",
            date: new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            }) + ` - ${new Date().toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}`
          }
        ],
        keyContacts: [],
        projects: [],
        properties: []
      };

      // Save the account
      onSave(newAccount);

      // Reset form and close modal
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating account:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      industry: '',
      location: '',
      employeeCount: '',
      annualRevenue: '',
      phone: '',
      website: '',
      primaryContact: '',
      territory: '',
      accountOwner: '',
      status: 'Prospect',
      priority: 'Medium',
      totalValue: '0'
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Plus" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Add New Account</h2>
                <p className="text-sm text-muted-foreground">Create a new account in your pipeline</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                error={errors.companyName}
                required
              />
              
              <Select
                label="Industry"
                placeholder="Select industry"
                options={industries}
                value={formData.industry}
                onChange={(value) => handleInputChange('industry', value)}
                error={errors.industry}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Location"
                placeholder="City, State"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                error={errors.location}
                required
              />
              
              <Input
                label="Employee Count"
                type="number"
                placeholder="Number of employees"
                value={formData.employeeCount}
                onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                error={errors.employeeCount}
                required
                min="1"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
              />
              
              <Input
                label="Website"
                placeholder="https://company.com"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                error={errors.website}
              />
            </div>

            <Input
              label="Primary Contact"
              placeholder="John Smith - Facilities Manager"
              value={formData.primaryContact}
              onChange={(e) => handleInputChange('primaryContact', e.target.value)}
            />
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Business Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Annual Revenue"
                placeholder="Select revenue range"
                options={revenueRanges}
                value={formData.annualRevenue}
                onChange={(value) => handleInputChange('annualRevenue', value)}
              />
              
              <Input
                label="Initial Pipeline Value"
                type="number"
                placeholder="0"
                value={formData.totalValue}
                onChange={(e) => handleInputChange('totalValue', e.target.value)}
                min="0"
                description="Estimated potential project value"
              />
            </div>
          </div>

          {/* Assignment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Assignment</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Territory"
                placeholder="Select territory"
                options={territories}
                value={formData.territory}
                onChange={(value) => handleInputChange('territory', value)}
                error={errors.territory}
                required
              />
              
              <Select
                label="Account Owner"
                placeholder="Select account owner"
                options={accountOwners}
                value={formData.accountOwner}
                onChange={(value) => handleInputChange('accountOwner', value)}
                error={errors.accountOwner}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Status"
                options={statuses}
                value={formData.status}
                onChange={(value) => handleInputChange('status', value)}
              />
              
              <Select
                label="Priority"
                options={priorities}
                value={formData.priority}
                onChange={(value) => handleInputChange('priority', value)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={isSubmitting}
              iconName={isSubmitting ? "Loader2" : "Plus"}
              iconPosition="left"
              iconSize={16}
            >
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountModal;