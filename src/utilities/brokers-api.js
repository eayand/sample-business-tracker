import sendRequest from "./send-request"

const BASE_URL = '/api/brokers';

export async function createBroker(form) {
  return sendRequest(`${BASE_URL}/create`, 'POST', form)
}

export async function listBrokers() {
  return sendRequest(BASE_URL, 'GET');
}

export async function brokerDetail(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'GET');
}

export async function updateBroker(id, form) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', form);
}