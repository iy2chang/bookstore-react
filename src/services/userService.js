import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name
  });
}

export function me(user) {
  const userUrl = apiEndpoint + "/me";
  return http.get(userUrl, {
    user: user
  });
}
