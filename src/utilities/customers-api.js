import sendRequest from "./send-request"

const BASE_URL = '/api/customers';

export async function listCustomers() {
    return sendRequest(BASE_URL, 'GET');
  }