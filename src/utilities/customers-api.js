import sendRequest from "./send-request"

const BASE_URL = '/api/customers';

export async function createCustomer(form) {
  return sendRequest(`${BASE_URL}/create`, 'POST', form)
}

export async function listCustomers() {
  return sendRequest(BASE_URL, 'GET');
}

export async function customerDetail(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'GET');
}

export async function updateCustomer(id, form) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', form);
}

export async function deleteCustomer(id) {
  return sendRequest(`${BASE_URL}/${id}/delete`, 'DELETE');
}