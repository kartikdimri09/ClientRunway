export const mockClients = [
    {
      _id: "1",
      name: "Rahul Sharma",
      company: "Acme Pvt Ltd",
      contactEmail: "rahul@acme.com",
      contactPhone: "+91 90000 00001",
      status: "In Progress",
      checklist: [
        { id: 1, label: "Docs Collected", done: true },
        { id: 2, label: "Training Completed", done: false },
        { id: 3, label: "Integration Setup", done: false },
        { id: 4, label: "Billing Setup", done: true },
        { id: 5, label: "Go-Live Approved", done: false }
      ],
      notes: [
        { id: 1, text: "Waiting for billing confirmation", createdAt: "2026-07-01" }
      ]
    },
    {
      _id: "2",
      name: "Priya Nair",
      company: "Nair Textiles",
      contactEmail: "priya@nairtextiles.com",
      contactPhone: "+91 90000 00002",
      status: "Stuck",
      checklist: [
        { id: 1, label: "Docs Collected", done: false },
        { id: 2, label: "Training Completed", done: false },
        { id: 3, label: "Integration Setup", done: false },
        { id: 4, label: "Billing Setup", done: false },
        { id: 5, label: "Go-Live Approved", done: false }
      ],
      notes: []
    },
    {
      _id: "3",
      name: "Amit Verma",
      company: "Verma Logistics",
      contactEmail: "amit@vermalogistics.com",
      contactPhone: "+91 90000 00003",
      status: "Live",
      checklist: [
        { id: 1, label: "Docs Collected", done: true },
        { id: 2, label: "Training Completed", done: true },
        { id: 3, label: "Integration Setup", done: true },
        { id: 4, label: "Billing Setup", done: true },
        { id: 5, label: "Go-Live Approved", done: true }
      ],
      notes: []
    },

    {
        _id: "4",
        name: "Sneha Kapoor",
        company: "Kapoor Foods",
        contactEmail: "sneha@kapoorfoods.com",
        contactPhone: "+91 90000 00004",
        status: "Just Started",
        checklist: [
          { id: 1, label: "Docs Collected", done: false },
          { id: 2, label: "Training Completed", done: false },
          { id: 3, label: "Integration Setup", done: false },
          { id: 4, label: "Billing Setup", done: false },
          { id: 5, label: "Go-Live Approved", done: false }
        ],
        notes: []
      }
      
  ];