import axios from "axios";

const API_URL = `${process.env.REACT_APP_DOMAIN_API}/api/mail/`;

export async function SendMail(request) {
  return await axios.post(API_URL + `SendMail`, request);
}
