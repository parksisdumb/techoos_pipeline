import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContactActions = ({ contact, onClose, actionType, onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    template: '',
    duration: '',
    outcome: '',
    nextAction: '',
    meetingDate: '',
    meetingTime: '',
    location: '',
    agenda: ''
  });

  const emailTemplates = [
    { value: '', label: 'Select Template' },
    { value: 'introduction', label: 'Introduction Email' },
    { value: 'follow-up', label: 'Follow-up Email' },
    { value: 'proposal', label: 'Proposal Follow-up' },
    { value: 'maintenance', label: 'Maintenance Reminder' },
    { value: 'inspection', label: 'Inspection Schedule' }
  ];

  const callOutcomes = [
    { value: '', label: 'Select Outcome' },
    { value: 'connected', label: 'Connected - Productive' },
    { value: 'voicemail', label: 'Left Voicemail' },
    { value: 'no-answer', label: 'No Answer' },
    { value: 'busy', label: 'Line Busy' },
    { value: 'scheduled', label: 'Meeting Scheduled' }
  ];

  const meetingTypes = [
    { value: '', label: 'Select Meeting Type' },
    { value: 'discovery', label: 'Discovery Call' },
    { value: 'site-visit', label: 'Site Visit' },
    { value: 'proposal', label: 'Proposal Presentation' },
    { value: 'follow-up', label: 'Follow-up Meeting' },
    { value: 'maintenance', label: 'Maintenance Discussion' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(actionType, contact, formData);
  };

  const loadTemplate = (templateId) => {
    const templates = {
      introduction: {
        subject: `Introduction - Commercial Roofing Solutions for ${contact?.company}`,
        message: `Hi ${contact?.name},\n\nI hope this email finds you well. I'm reaching out to introduce our commercial roofing services and discuss how we can help ${contact?.company} with your roofing needs.\n\nWe specialize in:\n• Commercial roof inspections and maintenance\n• Energy-efficient roofing solutions\n• Emergency repair services\n• Preventive maintenance programs\n\nWould you be available for a brief call this week to discuss your current roofing situation?\n\nBest regards,\nSarah Johnson`
      },
      'follow-up': {
        subject: `Following up on our conversation - ${contact?.company}`,
        message: `Hi ${contact?.name},\n\nThank you for taking the time to speak with me earlier. As discussed, I'm following up with additional information about our commercial roofing services.\n\nBased on our conversation, I believe our maintenance program would be a great fit for ${contact?.company}. I've attached a detailed proposal for your review.\n\nI'd be happy to schedule a site visit at your convenience to provide a more detailed assessment.\n\nLooking forward to hearing from you.\n\nBest regards,\nSarah Johnson`
      },
      proposal: {
        subject: `Proposal Follow-up - Commercial Roofing Project for ${contact?.company}`,
        message: `Hi ${contact?.name},\n\nI wanted to follow up on the roofing proposal I sent last week for ${contact?.company}.\n\nOur proposal includes:\n• Comprehensive roof inspection\n• Detailed repair recommendations\n• 10-year warranty on all work\n• Flexible scheduling to minimize business disruption\n\nDo you have any questions about the proposal? I'd be happy to discuss any aspects in more detail.\n\nWhen would be a good time for a follow-up call?\n\nBest regards,\nSarah Johnson`
      }
    };

    if (templates?.[templateId]) {
      setFormData(prev => ({
        ...prev,
        subject: templates?.[templateId]?.subject,
        message: templates?.[templateId]?.message,
        template: templateId
      }));
    }
  };

  const renderEmailForm = () => (
    <div className="space-y-4">
      <Select
        label="Email Template"
        options={emailTemplates}
        value={formData?.template}
        onChange={(value) => {
          setFormData(prev => ({ ...prev, template: value }));
          if (value) loadTemplate(value);
        }}
      />
      
      <Input
        label="Subject"
        type="text"
        value={formData?.subject}
        onChange={(e) => setFormData(prev => ({ ...prev, subject: e?.target?.value }))}
        placeholder="Email subject"
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Message</label>
        <textarea
          value={formData?.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e?.target?.value }))}
          placeholder="Email message"
          rows={8}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          required
        />
      </div>
    </div>
  );

  const renderCallForm = () => (
    <div className="space-y-4">
      <Input
        label="Call Duration (minutes)"
        type="number"
        value={formData?.duration}
        onChange={(e) => setFormData(prev => ({ ...prev, duration: e?.target?.value }))}
        placeholder="15"
        min="1"
        max="120"
      />
      
      <Select
        label="Call Outcome"
        options={callOutcomes}
        value={formData?.outcome}
        onChange={(value) => setFormData(prev => ({ ...prev, outcome: value }))}
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Call Summary</label>
        <textarea
          value={formData?.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e?.target?.value }))}
          placeholder="Summarize the key points discussed during the call..."
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Next Action</label>
        <textarea
          value={formData?.nextAction}
          onChange={(e) => setFormData(prev => ({ ...prev, nextAction: e?.target?.value }))}
          placeholder="What's the next step? (e.g., Send proposal, Schedule site visit, Follow up in 1 week)"
          rows={2}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
      </div>
    </div>
  );

  const renderMeetingForm = () => (
    <div className="space-y-4">
      <Select
        label="Meeting Type"
        options={meetingTypes}
        value={formData?.template}
        onChange={(value) => setFormData(prev => ({ ...prev, template: value }))}
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date"
          type="date"
          value={formData?.meetingDate}
          onChange={(e) => setFormData(prev => ({ ...prev, meetingDate: e?.target?.value }))}
          required
        />
        
        <Input
          label="Time"
          type="time"
          value={formData?.meetingTime}
          onChange={(e) => setFormData(prev => ({ ...prev, meetingTime: e?.target?.value }))}
          required
        />
      </div>
      
      <Input
        label="Location"
        type="text"
        value={formData?.location}
        onChange={(e) => setFormData(prev => ({ ...prev, location: e?.target?.value }))}
        placeholder="Meeting location or 'Video Call'"
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Agenda</label>
        <textarea
          value={formData?.agenda}
          onChange={(e) => setFormData(prev => ({ ...prev, agenda: e?.target?.value }))}
          placeholder="Meeting agenda and objectives..."
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          required
        />
      </div>
    </div>
  );

  const getActionTitle = () => {
    switch (actionType) {
      case 'email': return 'Send Email';
      case 'call': return 'Log Call';
      case 'meeting': return 'Schedule Meeting';
      default: return 'Contact Action';
    }
  };

  const getActionIcon = () => {
    switch (actionType) {
      case 'email': return 'Mail';
      case 'call': return 'Phone';
      case 'meeting': return 'Calendar';
      default: return 'User';
    }
  };

  const renderForm = () => {
    switch (actionType) {
      case 'email': return renderEmailForm();
      case 'call': return renderCallForm();
      case 'meeting': return renderMeetingForm();
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={getActionIcon()} size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{getActionTitle()}</h2>
              <p className="text-sm text-muted-foreground">
                {contact?.name} • {contact?.role} at {contact?.company}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            iconSize={20}
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
          {renderForm()}
          
          <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName={getActionIcon()}
              iconSize={16}
            >
              {getActionTitle()}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactActions;