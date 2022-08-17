import axios from "axios";

const API_URL = `${process.env.REACT_APP_DOMAIN_API}/api/notification/`;

export async function GetAllNotifications() {
  return await axios.get(API_URL + `GetAllNotifications`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function CreateNotification(request) {
  return await axios.post(API_URL + `CreateNotification`, request, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function GetAllNotificationCategories() {
  return await axios.get(API_URL + `GetAllNotificationCategories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function GetNotificationById(id) {
  return await axios.get(API_URL + `GetNotificationById/` + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
}

export async function ChangeStatusNotification(id) {
  return await axios.put(
    API_URL + `ChangeStatusNotification/` + id,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }
  );
}
