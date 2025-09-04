import React, { createContext, useContext, useState, useEffect } from 'react';

const AccountContext = createContext();

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccounts must be used within an AccountProvider');
  }
  return context;
};

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  // Initialize with mock data
  useEffect(() => {
    const initialAccounts = [
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
        contacts: 1, // Will be updated by contact context
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
          }
        ],
        keyContacts: [],
        projects: [],
        properties: []
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
        contacts: 1,
        lastActivity: 7,
        lastContactDate: "Nov 27, 2024",
        website: "https://riversideretail.com",
        phone: "(414) 555-0456",
        annualRevenue: "$10M - $25M",
        primaryContact: "Amanda Foster - Property Manager",
        territory: "North",
        accountOwner: "Sarah Johnson",
        totalProjectValue: "$75,000",
        recentActivities: [],
        keyContacts: [],
        projects: [],
        properties: []
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
        contacts: 0,
        lastActivity: 1,
        lastContactDate: "Dec 3, 2024",
        website: "https://techhub.com",
        phone: "(512) 555-0789",
        annualRevenue: "$25M - $50M",
        primaryContact: "Rachel Kim - Facilities Director",
        territory: "South",
        accountOwner: "Mark Thompson",
        totalProjectValue: "$95,000",
        recentActivities: [],
        keyContacts: [],
        projects: [],
        properties: []
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
        contacts: 0,
        lastActivity: 45,
        lastContactDate: "Oct 19, 2024",
        website: "https://centraldist.com",
        phone: "(816) 555-0234",
        annualRevenue: "$5M - $10M",
        primaryContact: "Robert Chen - Operations Manager",
        territory: "Central",
        accountOwner: "Jennifer Davis",
        totalProjectValue: "$45,000",
        recentActivities: [],
        keyContacts: [],
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
        contacts: 0,
        lastActivity: 5,
        lastContactDate: "Nov 29, 2024",
        website: "https://westsidemedical.com",
        phone: "(303) 555-0567",
        annualRevenue: "$50M - $100M",
        primaryContact: "Dr. Patricia Moore - Facility Administrator",
        territory: "West",
        accountOwner: "Alex Rivera",
        totalProjectValue: "$110,000",
        recentActivities: [],
        keyContacts: [],
        projects: [],
        properties: []
      }
    ];

    setAccounts(initialAccounts);
  }, []);

  const addAccount = (newAccount) => {
    setAccounts(prevAccounts => [...prevAccounts, newAccount]);
  };

  const updateAccount = (accountId, updates) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === accountId ? { ...account, ...updates } : account
      )
    );
  };

  const updateAccountContactCount = (accountId, contactCount) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === accountId ? { ...account, contacts: contactCount } : account
      )
    );
  };

  const deleteAccount = (accountId) => {
    setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== accountId));
  };

  const getAccountById = (accountId) => {
    return accounts.find(account => account.id === accountId);
  };

  const value = {
    accounts,
    addAccount,
    updateAccount,
    updateAccountContactCount,
    deleteAccount,
    getAccountById
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;