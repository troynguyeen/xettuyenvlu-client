import axios from "axios";

const API_URL = `${process.env.REACT_APP_DOMAIN_API}/api/AdmissionAdmin/`;

export async function GetDataForHoso() {
  return await axios.get(API_URL + "GetDataForHoso", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function GetAdmissionById(id) {
  return await axios.get(API_URL + `GetAdmissionById/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function DeleteDataForHosoThpt(Id) {
  return await axios.delete(API_URL + `DeleteDataForHosoThpt/${Id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function DeleteBangDiemForBangDiemThpt(MaHoSoThpt) {
  return await axios.delete(
    API_URL + `DeleteBangDiemForBangDiemThpt/${MaHoSoThpt}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }
  );
}

export async function EditAdmission(request) {
  return await axios.put(API_URL + `EditAdmission`, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function SendEmailForAdmission(request) {
  return await axios.post(API_URL + `SendEmailForAdmission`, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function GetMailBeforeSend() {
  return await axios.get(API_URL + "GetMailBeforeSend", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function ReceiveAdmissionProfileById(id) {
  return await axios.get(API_URL + `ReceiveAdmissionProfileById/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function GetPhase() {
  return await axios.get(API_URL + "GetPhase", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function DownloadAdmissionFiles(id) {
  return await axios.get(API_URL + `DownloadAdmissionFiles/${id}`);
}
