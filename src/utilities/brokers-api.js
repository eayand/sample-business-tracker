import sendRequest from "./send-request"

const BASE_URL = '/api/brokers';

export async function createBroker(wsurl, form) {
  return sendRequest(`${BASE_URL}/${wsurl}/create`, 'POST', form)
}

export async function listBrokers(wsurl, page) {
  return sendRequest(`${BASE_URL}/${wsurl}?page=${page}`, 'GET');
}

export async function notAssocBrokers(wsurl, id) {
  return sendRequest(`${BASE_URL}/${wsurl}/no-ref/${id}`, 'GET');
}

export async function brokerDetail(wsurl, id) {
  return sendRequest(`${BASE_URL}/${wsurl}/${id}`, 'GET');
}

export async function updateBroker(wsurl, id, form) {
  return sendRequest(`${BASE_URL}/${wsurl}/${id}`, 'PUT', form);
}

export async function deleteBroker(wsurl, id) {
  return sendRequest(`${BASE_URL}/${wsurl}/${id}/delete`, 'DELETE');
}

export async function getAssocCustomers(wsurl, id) {
  return sendRequest(`${BASE_URL}/${wsurl}/customers/${id}`, 'GET')
}

export async function associateCustomer(wsurl, id, customer) {
  return sendRequest(`${BASE_URL}/${wsurl}/assoc/${id}`, 'PUT', customer);
}

export async function removeCustomer(wsurl, id, customer) {
  return sendRequest(`${BASE_URL}/${wsurl}/remove/${id}`, 'PUT', customer)
}
