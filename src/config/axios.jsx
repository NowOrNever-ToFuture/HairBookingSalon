import axios from "axios";
import { store } from "../redux/store";
import { selectUser } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const baseUrl = "http://14.225.218.229:8080/api/"; //oficial
// const baseUrl = "https://cyperstack.com/";

const config = {
  baseUrl: baseUrl,
};

const api = axios.create(config);
// const user = useSelector(selectUser);

api.defaults.baseURL = baseUrl;

// handle before call API
const handleBefore = (config) => {
  // handle hành động trước khi call API
  // lấy ra cái token và đính kèm theo cái request
  const state = store.getState();
  const user = selectUser(state);
  const token = user?.token;
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

api.interceptors.request.use(handleBefore, null);

export default api;
