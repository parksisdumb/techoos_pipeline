import React, { createContext, useContext, useState, useEffect } from 'react';

const ContactContext = createContext();

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  // Initialize with mock data
  useEffect(() => {
    const mockContacts = [
      {
        id: 1,
        name: "Michael Rodriguez",
        role: "Facilities Manager",
        company: "TechCorp Industries",
        accountId: 1,
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
          }
        ],
        projects: [],
        networkConnections: [],
        properties: []
      },
      {
        id: 2,
        name: "Sarah Chen",
        role: "Property Manager",
        company: "Global Manufacturing",
        accountId: 2,
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
        communicationHistory: [],
        projects: [],
        networkConnections: [],
        properties: []
      },
      {
        id: 3,
        name: "David Thompson",
        role: "Maintenance Director",
        company: "Metro Construction",
        accountId: null,
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
        communicationHistory: [],
        projects: [],
        networkConnections: [],
        properties: []
      },
      {
        id: 4,
        name: "Lisa Anderson",
        role: "Operations Manager",
        company: "Industrial Solutions",
        accountId: null,
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
        communicationHistory: [],
        projects: [],
        networkConnections: [],
        properties: []
      }
    ];

    setContacts(mockContacts);
  }, []);

  const addContact = (newContact) => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const updateContact = (contactId, updates) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId ? { ...contact, ...updates } : contact
      )
    );
  };

  const deleteContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

  const getContactsByAccount = (accountId) => {
    return contacts.filter(contact => contact.accountId === accountId);
  };

  const getContactCountByAccount = (accountId) => {
    return contacts.filter(contact => contact.accountId === accountId).length;
  };

  const value = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    getContactsByAccount,
    getContactCountByAccount
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;