import { getTokenWorkAround } from "@/app/Actions/authActions";

const baseUrl = "http://localhost:6001/";

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: await getHears(),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function post(url: string, body: {}) {
  const requestOptions = {
    method: "POST",
    headers: await getHears(),
    body: JSON.stringify(body),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function put(url: string, body: {}) {
  const requestOptions = {
    method: "PUT",
    headers: await getHears(),
    body: JSON.stringify(body),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function del(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: await getHears(),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function getHears() {
  const token = await getTokenWorkAround();
  const headers = { "Content-type": "application/json" } as any;
  if (token) {
    headers.Authorization = "Bearer " + token.access_token;
  }
  return headers;
}

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message: response.statusText,
    };
    return { error };
  }
}

export const fetchWrapper = { get, post, put, del };
