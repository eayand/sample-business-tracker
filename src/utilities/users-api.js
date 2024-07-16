import sendRequest from "./send-request"
const BASE_URL = '/api/users'

export async function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData)
}

export async function createViaAdmin(form) {
    return sendRequest(`${BASE_URL}/create-via-admin`, 'POST', form)
}

export async function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
}

export async function listUsers(workspace) {
    return sendRequest(`${BASE_URL}/${workspace}`, 'GET');
}

export async function indexNotInThisWorkspace(workspace) {
    return sendRequest(`${BASE_URL}/index-not-in-this-workspace/${workspace}`, 'GET');
}

export async function listAllUsers() {
    return sendRequest(`${BASE_URL}/admin-page`, 'GET')
}

export async function addWorkspace(form) {
    return sendRequest(`${BASE_URL}/add-workspace`, 'POST', form)
}

export async function removeWorkspace(workspaceId, userId) {
    return sendRequest(`${BASE_URL}/remove-workspace/${workspaceId}`, 'POST', userId)
}

export async function indexNotThisCustomersAM(wsurl, id) {
    return sendRequest(`${BASE_URL}/${wsurl}/index-not-this-customers-am/${id}`, 'GET')
}

export async function indexNotThisPlanAsExpert(wsurl, id) {
    return sendRequest(`${BASE_URL}/${wsurl}/index-not-this-plan-as-expert/${id}`, 'GET')
}

export async function indexNotThisPlanBsExpert(wsurl, id) {
    return sendRequest(`${BASE_URL}/${wsurl}/index-not-this-plan-bs-expert/${id}`, 'GET')
}