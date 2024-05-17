import sendRequest from "./send-request"
const BASE_URL = '/api/users'

export async function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData)
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

export async function listAvailableUsers(workspace) {
    return sendRequest(`${BASE_URL}/no-ref/${workspace}`, 'GET');
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