import axios from "axios";

const API_URL = `${process.env.REACT_APP_DOMAIN_API}/api/schedule/`;

export async function GetAllSchedules() {
  return await axios.get(API_URL + `GetAllSchedules`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function CreateSchedule(request) {
  return await axios.post(API_URL + `CreateSchedule`, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function ChangeStatusSchedule(id) {
  return await axios.put(
    API_URL + `ChangeStatusSchedule/` + id,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }
  );
}

export async function ValidateAllSchedulesWereExpired() {
  return await axios.get(API_URL + "ValidateAllSchedulesWereExpired", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function GetAllPhasesNotExpiry() {
  return await axios.get(API_URL + "GetAllPhasesNotExpiry", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function GetCategoriesForSchedule() {
  return await axios.get(API_URL + "GetCategoriesForSchedule", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}
