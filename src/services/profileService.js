import axios from "axios";

const API_URL = `${process.env.REACT_APP_DOMAIN_API}/api/profile/`;

  export async function GetProfileByCMND(cmnd,dot) {
    return await axios.get(API_URL + `GetProfileByCMND/${cmnd}/${dot}`);
  }

  export async function GetBangDiem(maHoSo) {
    return await axios.get(API_URL + `GetBangDiem/${maHoSo}`);
  }

  export async function ValidateCMNDEdit(cmnd, currentcmnd) {
    return await axios.get(API_URL + `ValidateCMNDEdit/${cmnd}/${currentcmnd}`);
  }

  export async function EditProfile(request) {
    return await axios.put(API_URL + `EditProfile`, request);
  }
  export async function AddImgPathHocBa(request) {
    return await axios.post(API_URL + "AddImgPathHocBa", request,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  
