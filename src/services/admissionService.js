import axios from "axios";

const API_URL = `${process.env.REACT_APP_DOMAIN_API}/api/admission/`;

export async function GetCityProvincesForHoKhau() {
  return await axios.get(API_URL + "GetCityProvincesForHoKhau");
}

export async function GetDistrictsForHoKhau(MaTinhTP) {
  return await axios.get(API_URL + `GetDistrictsForHoKhau/${MaTinhTP}`);
}

export async function GetWardsForHoKhau(MaQH) {
  return await axios.get(API_URL + `GetWardsForHoKhau/${MaQH}`);
}

export async function GetCityProvincesForSchool() {
  return await axios.get(API_URL + "GetCityProvincesForSchool");
}

export async function GetDistrictsForSchool(MaTinhTP) {
  return await axios.get(API_URL + `GetDistrictsForSchool/${MaTinhTP}`);
}

export async function GetSchools(MaTinhTP, MaQH) {
  return await axios.get(API_URL + `GetSchools/${MaTinhTP}/${MaQH}`);
}

export async function GetEthnics() {
  return await axios.get(API_URL + "GetEthnics");
}

export async function GetReligions() {
  return await axios.get(API_URL + "GetReligions");
}

export async function GetNationalities() {
  return await axios.get(API_URL + "GetNationalities");
}

export async function GetCertificateLanguages() {
  return await axios.get(API_URL + "GetCertificateLanguages");
}

export async function GetNganhXetTuyen() {
  return await axios.get(API_URL + "GetNganhXetTuyen");
}

export async function GetToHopXetTuyen(MaNganh) {
  return await axios.get(API_URL + `GetToHopXetTuyen/${MaNganh}`);
}

export async function ValidateCMND(cmnd) {
  return await axios.get(API_URL + `ValidateCMND/${cmnd}`);
}

export async function CreateAdmission(request) {
  return await axios.post(API_URL + `CreateAdmission`, request);
}

export async function GetPhase() {
  return await axios.get(API_URL + "GetPhase");
}

export async function ValidatePhaseIsExpired() {
  return await axios.get(API_URL + "ValidatePhaseIsExpired");
}

export async function GetNotificationForPhaseIsExpired() {
  return await axios.get(API_URL + "GetNotificationForPhaseIsExpired");
}

export async function GetScheduleForEditProfile() {
  return await axios.get(API_URL + "GetScheduleForEditProfile");
}
