import api from "../utils/axios";

export const login = async (email: string, password: string) => {
  // Backend sets both accessToken and refreshToken as HttpOnly cookies
  await api.post("/auth/login", { email, password });
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const refreshAccessToken = async () => {
  // Refresh token endpoint also sets a new access token cookie
  await api.post("/auth/refresh");
};
