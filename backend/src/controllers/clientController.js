import Client from "../models/Client.js";

// Add Client
export const addClient = async (req, res) => {
  try {
    const { name, company, email, phone, status, notes } = req.body;

    // Validation
    if (!name || !company || !email || !phone) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Add Client
   const newClient = await Client.create({
  name,
  company,
  email,
  phone,
  status,
  checklist: [
    {
      label: "Docs Collected",
      done: false,
    },
    {
      label: "Training Completed",
      done: false,
    },
    {
      label: "Integration Setup",
      done: false,
    },
    {
      label: "Billing Setup",
      done: false,
    },
    {
      label: "Go-Live Approved",
      done: false,
    },
  ],
  notes,
  createdBy: req.user.id,
});
    res.status(201).json({
      message: "Client Added Successfully",
      client: newClient,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({
      createdBy: req.user.id,
    });

    res.status(200).json({
      clients,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Client By ID
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.status(200).json({
      client,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Client
export const updateClient = async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.status(200).json({
      message: "Client Updated Successfully",
      client,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Client
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.status(200).json({
      message: "Client Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};