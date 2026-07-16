import Client from "../models/Client.js";

export const addClient = async (req, res) => {
  const { name, company, email, phone, status, notes } = req.body;

  // Validation
  if (!name || !company || !email || !phone) {
    return res.status(400).json({
      message: "Please fill all required fields",
    });
  }
// add client
  const newClient = await Client.create({
    name,
    company,
    email,
    phone,
    status,
    notes,
    createdBy: req.user.id,
  });

  res.status(201).json({
    message: "Client Added Successfully",
    client: newClient,
  });
};
//get all clients
export const getClients = async (req, res) => {
  const clients = await Client.find({
    createdBy: req.user.id,
  });

  res.json({
    clients,
  });
};

//get client by id
export const getClientById = async (req, res) => {
  const client = await Client.findOne({
  _id: req.params.id,
  createdBy: req.user.id,
});

  if (!client) {
    return res.status(404).json({
      message: "Client not found",
    });
  }

  res.json({
    client,
  });
};

//update client
export const updateClient = async (req, res) => {
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

  res.json({
    message: "Client Updated Successfully",
    client,
  });
};

export const deleteClient = async (req, res) => {
  const client = await Client.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!client) {
    return res.status(404).json({
      message: "Client not found",
    });
  }

  res.json({
    message: "Client Deleted Successfully",
  });
};