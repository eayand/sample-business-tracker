import sendRequest from "./send-request"

const BASE_URL = '/api/workspaces';

export function saveWorkspace(form) {
return sendRequest(`${BASE_URL}/create`, 'POST', form)
}

export async function listWorkspaces() {
    return sendRequest(BASE_URL, 'GET');
  }

export async function showWorkspace(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'GET');
}