// api.js

import axios from "axios";

const BASE_URL =
  "https://nfcmoneytransferwebapi20240614162418.azurewebsites.net/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/User/login", { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserAccounts = async (userId) => {
  try {
    const response = await api.get(`/Account/User/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllAccounts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Account`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const transferAmount = async (
  fromAccountIBAN,
  toAccountIBAN,
  amount
) => {
  try {
    const response = await api.post("/Transaction/Transfer", {
      senderiban: fromAccountIBAN,
      receiveriban: toAccountIBAN,
      amount: amount,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserTransactions = async (userId) => {
  try {
    const response = await api.get(`/Transaction/UserTransactions/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
