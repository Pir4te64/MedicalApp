const BASE_URL = "http://69.164.214.201:8080/recetary";

export const API = {
  BASE_URL,
  REGISTER: `${BASE_URL}/user/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  PROFILE: `${BASE_URL}/auth/profile`,
  DEPENDIENTE: `${BASE_URL}/user/register/child`,
  UPDATE_DEPENDIENTE: `${BASE_URL}/user/update/rol`,
  UPDATE_PASSWORD: `${BASE_URL}/user/update/password`,
  UPDATE_USER: `${BASE_URL}/user/update`,
  DATA_REGISTER: `${BASE_URL}/user/data/register`,
  DATA_REGISTER_UPDATE: `${BASE_URL}/user/data/update`,
  DATA_REGISTER_UPDATE: `${BASE_URL}/user/data/update`,
  DATA_REGISTER_GET: `${BASE_URL}/user/data/`,
};
