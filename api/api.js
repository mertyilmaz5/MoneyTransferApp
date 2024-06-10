import axios from "axios";

// Base URL of the backend API
const BASE_URL = "https://example.com/api";

// Function to get recipients
export const getRecipients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recipients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipients:", error);
    throw error;
  }
};

// Function to send transfer request
export const sendTransferRequest = async (transferData) => {
  try {
    const response = await axios.post(`${BASE_URL}/transfer`, transferData);
    return response.data;
  } catch (error) {
    console.error("Error sending transfer request:", error);
    throw error;
  }
};

// Function to confirm transfer
export const confirmTransfer = async (transferId) => {
  try {
    const response = await axios.post(`${BASE_URL}/transfer/confirm`, {
      transferId,
    });
    return response.data;
  } catch (error) {
    console.error("Error confirming transfer:", error);
    throw error;
  }
};

// Function to reject transfer
export const rejectTransfer = async (transferId) => {
  try {
    const response = await axios.post(`${BASE_URL}/transfer/reject`, {
      transferId,
    });
    return response.data;
  } catch (error) {
    console.error("Error rejecting transfer:", error);
    throw error;
  }
};
