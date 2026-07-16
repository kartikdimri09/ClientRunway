import { mockClients } from "../data/mockClients";

export const getClients = async () => {
  return mockClients;
};

export const getClientById = async (id) => {
  return mockClients.find((client) => client._id === id);
};