import sendRequest from "./send-request"

const BASE_URL = '/api/customers';

export async function saveCustomer(form) {
  return sendRequest(`${BASE_URL}/create`, 'POST', form)
}

export async function listCustomers() {
  return sendRequest(BASE_URL, 'GET');
}

export async function customerDetail(id) {
  return sendRequest(`${BASE_URL}/:id`, 'GET', id);
}