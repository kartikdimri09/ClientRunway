import api from "./api";

export const getClients = async () => {
  const response = await api.get("/clients");
  return response.data.clients;
};

export const getClientById = async (id) => {
  const response = await api.get(`/clients/${id}`);
  return response.data.client;
};