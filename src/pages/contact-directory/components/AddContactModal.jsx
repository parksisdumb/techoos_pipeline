import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddContactModal = ({ isOpen, onClose, onSave, existingAccounts = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    accountId: '',
    email: '',
    phone: '',
    location: '',
    territory: '',
    isDecisionMaker: false,
    relationshipStrength: 'Medium',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const territories = [
    { value: 'North', label: 'North' },
    { value: 'South', label: 'South' },
    { value: 'East', label: 'East' },
    { value: 'West', label: 'West' },
    { value: 'Central', label: 'Central' }
  ];

  const relationshipStrengths = [
    { value: 'Strong', label: 'Strong' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Weak', label: 'Weak' }
  ];

  const roles = [
    { value: 'CEO', label: 'CEO' },
    { value: 'CFO', label: 'CFO' },
    { value: 'Operations Manager', label: 'Operations Manager' },
    { value: 'Facilities Manager', label: 'Facilities Manager' },
    { value: 'Property Manager', label: 'Property Manager' },
    { value: 'Maintenance Director', label: 'Maintenance Director' },
    { value: 'Facilities Director', label: 'Facilities Director' },
    { value: 'Operations Director', label: 'Operations Director' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Purchasing Manager', label: 'Purchasing Manager' },
    { value: 'Safety Coordinator', label: 'Safety Coordinator' },
    { value: 'Building Engineer', label: 'Building Engineer' },
    { value: 'Other', label: 'Other' }
  ];

  // Convert accounts to options for the dropdown
  const accountOptions = existingAccounts.map(account => ({
    value: account.id,
    label: account.companyName,
    description: account.location
  }));

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

    // Auto-populate company when account is selected
    if (field === 'accountId' && value) {
      const selectedAccount = existingAccounts.find(account => account.id === parseInt(value));
      if (selectedAccount) {
        setFormData(prev => ({
          ...prev,
          company: selectedAccount.companyName,
          territory: selectedAccount.territory || prev.territory,
          location: selectedAccount.location || prev.location
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Contact name is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.territory) {
      newErrors.territory = 'Territory is required';
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
      // Create new contact object matching the existing structure
      const newContact = {
        id: Date.now(), // Simple ID generation
        name: formData.name.trim(),
        role: formData.role.trim(),
        company: formData.company.trim(),
        accountId: formData.accountId ? parseInt(formData.accountId) : null,
        email: formData.email.trim(),
        phone: formData.phone.trim() || '',
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg`,
        relationshipStrength: formData.relationshipStrength,
        lastInteraction: new Date(),
        totalCalls: 0,
        totalEmails: 0,
        totalMeetings: 0,
        territory: formData.territory,
        isDecisionMaker: formData.isDecisionMaker,
        location: formData.location.trim() || '',
        startDate: new Date(),
        recentActivity: "Contact added to the system",
        notes: formData.notes.trim() || `New contact added on ${new Date().toLocaleDateString()}.`,
        communicationHistory: [
          {
            type: 'note',
            date: new Date(),
            duration: '',
            summary: 'Contact added to CRM system',
            nextAction: 'Initial outreach and introduction'
          }
        ],
        projects: [],
        networkConnections: [],
        properties: []
      };

      // Save the contact
      onSave(newContact);

      // Reset form and close modal
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      company: '',
      accountId: '',
      email: '',
      phone: '',
      location: '',
      territory: '',
      isDecisionMaker: false,
      relationshipStrength: 'Medium',
      notes: ''
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
                <Icon name="UserPlus" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Add New Contact</h2>
                <p className="text-sm text-muted-foreground">Add a new contact to your network</p>
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
                label="Full Name"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />
              
              <Select
                label="Job Title/Role"
                placeholder="Select or type role"
                options={roles}
                value={formData.role}
                onChange={(value) => handleInputChange('role', value)}
                error={errors.role}
                searchable
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Account/Company"
                placeholder="Select existing account or type new company"
                options={accountOptions}
                value={formData.accountId}
                onChange={(value) => handleInputChange('accountId', value)}
                searchable
                description="Select an existing account or the company field will be used"
              />
              
              <Input
                label="Company Name"
                placeholder="Company name"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                error={errors.company}
                required
                description={formData.accountId ? "Auto-filled from selected account" : ""}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="john.smith@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
              />
            </div>

            <Input
              label="Location"
              placeholder="City, State"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              description={formData.accountId ? "Auto-filled from selected account" : ""}
            />
          </div>

          {/* Relationship Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Relationship Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Territory"
                placeholder="Select territory"
                options={territories}
                value={formData.territory}
                onChange={(value) => handleInputChange('territory', value)}
                error={errors.territory}
                required
                description={formData.accountId ? "Auto-filled from selected account" : ""}
              />
              
              <Select
                label="Relationship Strength"
                options={relationshipStrengths}
                value={formData.relationshipStrength}
                onChange={(value) => handleInputChange('relationshipStrength', value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="decision-maker"
                checked={formData.isDecisionMaker}
                onChange={(e) => handleInputChange('isDecisionMaker', e.target.checked)}
                className="h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
              <label htmlFor="decision-maker" className="text-sm font-medium text-foreground">
                Decision Maker
              </label>
              <Icon name="Crown" size={16} className="text-warning ml-2" />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Additional Notes</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Notes
              </label>
              <textarea
                placeholder="Add any relevant notes about this contact..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              iconName={isSubmitting ? "Loader2" : "UserPlus"}
              iconPosition="left"
              iconSize={16}
            >
              {isSubmitting ? 'Creating...' : 'Add Contact'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;