import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const QuickActions = ({ accounts, onScheduleFollowup, onSendTemplate, onSetReminder }) => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);

  const emailTemplates = [
    {
      id: 'initial_contact',
      name: 'Initial Contact',
      subject: 'Commercial Roofing Solutions for {{company}}',
      content: `Hi {{contact}},\n\nI hope this message finds you well. I'm reaching out because I noticed {{company}} might benefit from our commercial roofing expertise.\n\nWe specialize in:\n• Commercial membrane systems\n• Preventive maintenance programs\n• Emergency repair services\n• Energy-efficient solutions\n\nWould you be available for a brief 15-minute call this week to discuss your roofing needs?\n\nBest regards,\n{{signature}}`
    },
    {
      id: 'follow_up',name: 'Follow-up After Site Visit',subject: 'Roofing Assessment Results for {{company}}',
      content: `Hi {{contact}},\n\nThank you for allowing us to inspect your facility yesterday. Based on our assessment, I've prepared a detailed report outlining our findings and recommendations.\n\nKey observations:\n• Current roof condition assessment\n• Priority maintenance items\n• Long-term improvement suggestions\n• Cost-effective solution options\n\nI'll send the full report by end of day. Would you like to schedule a call to review the findings together?\n\nBest regards,\n{{signature}}`
    },
    {
      id: 'proposal_follow_up',name: 'Proposal Follow-up',subject: 'Following up on your roofing proposal',
      content: `Hi {{contact}},\n\nI wanted to follow up on the roofing proposal I sent last week for {{company}}. I hope you've had a chance to review it.\n\nI'm happy to answer any questions or discuss modifications to better meet your needs. Our team is ready to start as soon as you're ready to move forward.\n\nWould you prefer a quick call or meeting to discuss next steps?\n\nBest regards,\n{{signature}}`
    }
  ];

  const reminderTypes = [
    { value: 'call', label: 'Schedule Call', icon: 'Phone' },
    { value: 'email', label: 'Send Email', icon: 'Mail' },
    { value: 'visit', label: 'Site Visit', icon: 'MapPin' },
    { value: 'proposal', label: 'Send Proposal', icon: 'FileText' },
    { value: 'follow_up', label: 'Follow-up', icon: 'Clock' }
  ];

  const handleScheduleFollowup = () => {
    if (!selectedAccount) {
      alert('Please select an account first');
      return;
    }
    
    const followupDate = new Date();
    followupDate?.setDate(followupDate?.getDate() + 3); // Default to 3 days from now
    
    onScheduleFollowup({
      accountId: selectedAccount,
      type: 'follow_up',
      scheduledDate: followupDate,
      title: 'Follow-up call',
      notes: 'Scheduled via quick action'
    });
  };

  const handleSendTemplate = (template) => {
    if (!selectedAccount) {
      alert('Please select an account first');
      return;
    }
    
    onSendTemplate({
      accountId: selectedAccount,
      templateId: template?.id,
      subject: template?.subject,
      content: template?.content
    });
    
    setShowTemplateModal(false);
  };

  const handleSetReminder = (type) => {
    if (!selectedAccount) {
      alert('Please select an account first');
      return;
    }
    
    const reminderDate = new Date();
    reminderDate?.setHours(reminderDate?.getHours() + 24); // Default to 24 hours from now
    
    onSetReminder({
      accountId: selectedAccount,
      type: type,
      reminderDate: reminderDate,
      title: `Reminder: ${reminderTypes?.find(t => t?.value === type)?.label}`,
      notes: 'Set via quick action'
    });
    
    setShowReminderModal(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} color="var(--color-warning)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Fast-track common activities</p>
        </div>
      </div>
      {/* Account Selection */}
      <div className="mb-6">
        <Select
          label="Select Account"
          placeholder="Choose an account for quick actions"
          options={accounts?.map(account => ({
            value: account?.id,
            label: account?.name,
            description: account?.industry
          }))}
          value={selectedAccount}
          onChange={setSelectedAccount}
          searchable
        />
      </div>
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="h-20 flex-col space-y-2"
          disabled={!selectedAccount}
          onClick={handleScheduleFollowup}
        >
          <Icon name="Clock" size={24} color="var(--color-primary)" />
          <span className="text-sm font-medium">Schedule Follow-up</span>
        </Button>

        <Button
          variant="outline"
          className="h-20 flex-col space-y-2"
          disabled={!selectedAccount}
          onClick={() => setShowTemplateModal(true)}
        >
          <Icon name="Mail" size={24} color="var(--color-accent)" />
          <span className="text-sm font-medium">Send Template Email</span>
        </Button>

        <Button
          variant="outline"
          className="h-20 flex-col space-y-2"
          disabled={!selectedAccount}
          onClick={() => setShowReminderModal(true)}
        >
          <Icon name="Bell" size={24} color="var(--color-warning)" />
          <span className="text-sm font-medium">Set Reminder</span>
        </Button>
      </div>
      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Choose Email Template</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowTemplateModal(false)}
                />
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {emailTemplates?.map((template) => (
                <div
                  key={template?.id}
                  className="p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-shadow cursor-pointer"
                  onClick={() => handleSendTemplate(template)}
                >
                  <h4 className="font-medium text-foreground mb-2">{template?.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Subject: {template?.subject}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {template?.content?.substring(0, 150)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-md w-full">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Set Reminder</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowReminderModal(false)}
                />
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {reminderTypes?.map((type) => (
                <button
                  key={type?.value}
                  onClick={() => handleSetReminder(type?.value)}
                  className="w-full p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-shadow text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={type?.icon} size={20} color="var(--color-primary)" />
                    <span className="font-medium text-foreground">{type?.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Recent Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Recent Quick Actions</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">Follow-up scheduled with ABC Corp</span>
            </div>
            <span className="text-xs text-muted-foreground">2 min ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={14} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">Template email sent to XYZ Industries</span>
            </div>
            <span className="text-xs text-muted-foreground">15 min ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={14} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">Reminder set for site visit</span>
            </div>
            <span className="text-xs text-muted-foreground">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;