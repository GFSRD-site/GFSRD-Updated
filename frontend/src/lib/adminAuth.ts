const ADMIN_TOKEN_KEY = "gfsrd_admin_token";

const getAdminToken = (): string | null => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

const setAdminToken = (token: string): void => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

const clearAdminToken = (): void => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export { clearAdminToken, getAdminToken, setAdminToken };
