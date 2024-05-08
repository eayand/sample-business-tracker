import sendRequest from "./send-request"

const BASE_URL = '/api/plan-a';

export async function createPlanA(form) {
  return sendRequest(`${BASE_URL}/create`, 'POST', form)
}

export async function getPlans(customerId) {
  return sendRequest(`${BASE_URL}/${customerId}`, 'GET')
}

export async function showPlan(customerId, planId) {
  return sendRequest(`${BASE_URL}/plan-a/${planId}`, 'GET')
}

export async function updatePlan(plan, form) {
  return sendRequest(`${BASE_URL}/update/${plan}`, 'PUT', form)
}

export async function deletePlanA(plan) {
  return sendRequest(`${BASE_URL}/delete/${plan}`, 'DELETE')
}