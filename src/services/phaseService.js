import axios from "axios";

const API_URL = `${process.env.REACT_APP_DOMAIN_API}/api/phase/`;

export async function GetAllPhases() {
  return await axios.get(API_URL + `GetAllPhases`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function CreatePhase(request) {
  return await axios.post(API_URL + `CreatePhase`, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function ChangeStatusPhase(id) {
  return await axios.put(
    API_URL + `ChangeStatusPhase/` + id,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }
  );
}

export async function ValidateAllPhasesWereExpired() {
  return await axios.get(API_URL + "ValidateAllPhasesWereExpired", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
