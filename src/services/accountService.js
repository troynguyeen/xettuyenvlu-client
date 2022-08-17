import axios from "axios";

const API_URL = `${process.env.REACT_APP_DOMAIN_API}/api/account/`;

export async function LoginAPI(request) {
  return await axios.post(API_URL + `Login`, request);
}

export async function CreateAccount(request) {
  return await axios.post(API_URL + `CreateAccount`, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function GetAllAccounts() {
  return await axios.get(API_URL + `GetAllAccounts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function GetAllRoles() {
  return await axios.get(API_URL + `GetAllRoles`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function GetAccountById(id) {
  return await axios.get(API_URL + `GetAccountById/` + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function EditAccount(request) {
  return await axios.put(API_URL + `EditAccount`, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function DeleteAccount(id) {
  return await axios.delete(API_URL + `DeleteAccount/` + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function GetAccountProfile() {
  return await axios.get(API_URL + `GetAccountProfile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function EditAccountProfile(request) {
  return await axios.put(API_URL + `EditAccountProfile`, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function ChangePassword(request) {
  return await axios.put(API_URL + `ChangePassword`, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
