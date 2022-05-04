import axios from "axios";

const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: {
    key:"AIzaSyB3EEHWlkJVgPrd9LkQWVIoXEQEDW2OXFg",
  },
});

export default authApi;
