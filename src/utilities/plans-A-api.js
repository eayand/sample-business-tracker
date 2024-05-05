import sendRequest from "./send-request"

const BASE_URL = '/api/plan-a';

export async function createPlanA(id, form) {
  return sendRequest(`${BASE_URL}/${id}/create`, 'POST', form)
}

export async function getPlans(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'GET')
}