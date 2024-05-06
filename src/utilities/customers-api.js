import sendRequest from "./send-request"

const BASE_URL = '/api/customers';

export async function createCustomer(form) {
  return sendRequest(`${BASE_URL}/create`, 'POST', form)
}

export async function listCustomers() {
  return sendRequest(BASE_URL, 'GET');
}

export async function notAssocCustomers(id) {
  return sendRequest(`${BASE_URL}/no-ref/${id}`, 'GET');
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

export async function associateBroker(id, broker) {
  return sendRequest(`${BASE_URL}/assoc/${id}`, 'PUT', broker);
}

export async function removeBroker(customerId, broker) {
  return sendRequest(`${BASE_URL}/remove/${customerId}`, 'PUT', broker);
}

export async function associateWithBroker(id, customer) {
  return sendRequest(`${BASE_URL}/associate-with/${id}`, 'PUT', customer)
}

export async function removeFromBroker(id, customer) {
  return sendRequest(`${BASE_URL}/remove-from/${id}`, 'PUT', customer);
}