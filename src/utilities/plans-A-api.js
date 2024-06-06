import sendRequest from "./send-request"

const BASE_URL = '/api/plan-a';

export async function createPlanA(wsurl, form) {
  return sendRequest(`${BASE_URL}/${wsurl}/create`, 'POST', form)
}

export async function getPlans(wsurl, customerId) {
  return sendRequest(`${BASE_URL}/${wsurl}/${customerId}`, 'GET')
}

export async function showPlan(wsurl, customerId, planId) {
  return sendRequest(`${BASE_URL}/${wsurl}/plan-a/${planId}`, 'GET')
}

export async function updatePlan(wsurl, plan, form) {
  return sendRequest(`${BASE_URL}/${wsurl}/update/${plan}`, 'PUT', form)
}

export async function deletePlanA(wsurl, plan) {
  return sendRequest(`${BASE_URL}/${wsurl}/delete/${plan}`, 'DELETE')
}