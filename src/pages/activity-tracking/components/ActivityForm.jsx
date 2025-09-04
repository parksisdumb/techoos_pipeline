import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ActivityForm = ({ onSubmit, accounts, contacts }) => {
  const [formData, setFormData] = useState({
    type: '',
    account: '',
    contact: '',
    duration: '',
    outcome: '',
    notes: '',
    nextSteps: '',
    followUpDate: ''
  });

  const activityTypes = [
    { value: 'call', label: 'Phone Call', icon: 'Phone' },
    { value: 'email', label: 'Email', icon: 'Mail' },
    { value: 'site_visit', label: 'Site Visit', icon: 'MapPin' },
    { value: 'follow_up', label: 'Follow-up', icon: 'Clock' },
    { value: 'proposal', label: 'Proposal Review', icon: 'FileText' },
    { value: 'meeting', label: 'Meeting', icon: 'Users' }
  ];

  const outcomeOptions = [
    { value: 'positive', label: 'Positive - Moving Forward' },
    { value: 'neutral', label: 'Neutral - Information Gathered' },
    { value: 'negative', label: 'Negative - Not Interested' },
    { value: 'callback', label: 'Callback Requested' },
    { value: 'proposal_sent', label: 'Proposal Sent' },
    { value: 'meeting_scheduled', label: 'Meeting Scheduled' }
  ];

  const templates = {
    call: "Discussed roofing project requirements and current challenges. Client expressed interest in commercial membrane solutions.",
    email: "Sent follow-up email with roofing system specifications and preliminary cost estimates for review.",
    site_visit: "Conducted thorough roof inspection. Identified areas requiring immediate attention and provided maintenance recommendations.",
    follow_up: "Followed up on previous proposal. Client requested additional information about warranty coverage.",
    proposal: "Reviewed detailed proposal with client. Discussed timeline, materials, and project phases.",
    meeting: "Met with decision-making team to present roofing solutions and address technical questions."
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      type,
      notes: templates?.[type] || ''
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
    setFormData({
      type: '',
      account: '',
      contact: '',
      duration: '',
      outcome: '',
      notes: '',
      nextSteps: '',
      followUpDate: ''
    });
  };

  const filteredContacts = contacts?.filter(contact => 
    !formData?.account || contact?.accountId === formData?.account
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Plus" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Log Activity</h2>
          <p className="text-sm text-muted-foreground">Record customer interactions and track progress</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Activity Type Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Activity Type</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {activityTypes?.map((type) => (
              <button
                key={type?.value}
                type="button"
                onClick={() => handleTypeSelect(type?.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData?.type === type?.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={type?.icon} size={24} className="mx-auto mb-2" />
                <div className="text-sm font-medium">{type?.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Selection */}
          <Select
            label="Account"
            placeholder="Select account"
            options={accounts?.map(account => ({
              value: account?.id,
              label: account?.name
            }))}
            value={formData?.account}
            onChange={(value) => handleInputChange('account', value)}
            required
          />

          {/* Contact Selection */}
          <Select
            label="Contact"
            placeholder="Select contact"
            options={filteredContacts?.map(contact => ({
              value: contact?.id,
              label: `${contact?.name} - ${contact?.title}`
            }))}
            value={formData?.contact}
            onChange={(value) => handleInputChange('contact', value)}
            disabled={!formData?.account}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Duration */}
          <Input
            label="Duration (minutes)"
            type="number"
            placeholder="30"
            value={formData?.duration}
            onChange={(e) => handleInputChange('duration', e?.target?.value)}
            min="1"
            max="480"
          />

          {/* Outcome */}
          <Select
            label="Outcome"
            placeholder="Select outcome"
            options={outcomeOptions}
            value={formData?.outcome}
            onChange={(value) => handleInputChange('outcome', value)}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
          <textarea
            value={formData?.notes}
            onChange={(e) => handleInputChange('notes', e?.target?.value)}
            placeholder="Detailed notes about the interaction..."
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-foreground bg-input"
          />
        </div>

        {/* Next Steps */}
        <Input
          label="Next Steps"
          type="text"
          placeholder="Schedule follow-up call, send proposal, etc."
          value={formData?.nextSteps}
          onChange={(e) => handleInputChange('nextSteps', e?.target?.value)}
        />

        {/* Follow-up Date */}
        <Input
          label="Follow-up Date"
          type="date"
          value={formData?.followUpDate}
          onChange={(e) => handleInputChange('followUpDate', e?.target?.value)}
          min={new Date()?.toISOString()?.split('T')?.[0]}
        />

        {/* Submit Button */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData({
              type: '',
              account: '',
              contact: '',
              duration: '',
              outcome: '',
              notes: '',
              nextSteps: '',
              followUpDate: ''
            })}
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            disabled={!formData?.type || !formData?.account}
            iconName="Save"
            iconPosition="left"
          >
            Log Activity
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;