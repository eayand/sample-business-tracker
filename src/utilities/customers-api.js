import sendRequest from "./send-request"

const BASE_URL = '/api/customers';

export async function createCustomer(wsurl, form) {
  return sendRequest(`${BASE_URL}/${wsurl}/create`, 'POST', form)
}

export async function listCustomers(wsurl, page) {
  return sendRequest(`${BASE_URL}/${wsurl}?page=${page}`, 'GET');
}

export async function notAssocCustomers(wsurl, id) {
  return sendRequest(`${BASE_URL}/${wsurl}/no-ref/${id}`, 'GET');
}

export async function customerDetail(wsurl, id) {
  return sendRequest(`${BASE_URL}/${wsurl}/${id}`, 'GET');
}

export async function updateCustomer(wsurl, id, form) {
  return sendRequest(`${BASE_URL}/${wsurl}/${id}`, 'PUT', form);
}

export async function deleteCustomer(wsurl, id) {
  return sendRequest(`${BASE_URL}/${wsurl}/${id}/delete`, 'DELETE');
}

export async function associateBroker(wsurl, id, broker) {
  return sendRequest(`${BASE_URL}/${wsurl}/assoc/${id}`, 'PUT', broker);
}

export async function removeBroker(wsurl, customerId, broker) {
  return sendRequest(`${BASE_URL}/${wsurl}/remove/${customerId}`, 'PUT', broker);
}

export async function associateWithBroker(wsurl, id, customer) {
  return sendRequest(`${BASE_URL}/${wsurl}/associate-with/${id}`, 'PUT', customer)
}

export async function removeFromBroker(wsurl, id, customer) {
  return sendRequest(`${BASE_URL}/${wsurl}/remove-from/${id}`, 'PUT', customer);
}