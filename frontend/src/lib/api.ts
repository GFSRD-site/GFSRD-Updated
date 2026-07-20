const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:4000";

type ApiOptions = {
  method?: string;
  body?: unknown;
  token?: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  admin?: {
    id: number;
    email: string;
    role: string;
  };
};

export type DashboardSummary = {
  totalContacts: number;
  pendingContacts: number;
  totalSubscribers: number;
  totalInternships: number;
};

export type ContactQuery = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: "PENDING" | "RESPONDED";
  createdAt: string;
  updatedAt: string;
};

export type NewsletterSubscriber = {
  id: number;
  email: string;
  createdAt: string;
};

export type InternshipApplication = {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string | null;
  education: string | null;
  experience: string | null;
  motivation: string;
  createdAt: string;
  updatedAt: string;
};

const request = async <T>(
  path: string,
  options: ApiOptions = {},
): Promise<ApiResponse<T>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.token) {
    headers.authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!response.ok) {
    throw new Error(payload?.message || `Request failed (${response.status})`);
  }

  return payload || { success: true };
};

const submitContactQuery = (payload: {
  name: string;
  email: string;
  message: string;
}) => request<ContactQuery>("/contact", { method: "POST", body: payload });

const subscribeToNewsletter = (email: string) =>
  request<NewsletterSubscriber>("/newsletter/subscribe", {
    method: "POST",
    body: { email },
  });

const submitInternshipApplication = (payload: {
  name: string;
  email: string;
  phone: string;
  location?: string;
  education?: string;
  experience?: string;
  motivation: string;
}) => request<InternshipApplication>("/internships", { method: "POST", body: payload });

const adminLogin = (payload: { email: string; password: string }) =>
  request<never>("/admin/login", {
    method: "POST",
    body: payload,
  });

const adminLogout = (token: string) =>
  request<never>("/admin/logout", {
    method: "POST",
    token,
  });

const fetchAdminSummary = (token: string) => request<DashboardSummary>("/admin", { token });
const fetchAdminContacts = (token: string) => request<ContactQuery[]>("/admin/contacts", { token });
const deleteAdminContact = (token: string, id: number) =>
  request<never>(`/admin/contacts/${id}`, { method: "DELETE", token });

const fetchAdminSubscribers = (token: string) =>
  request<NewsletterSubscriber[]>("/admin/newsletters", { token });

const fetchAdminInternships = (token: string) =>
  request<InternshipApplication[]>("/admin/internships", { token });

const deleteAdminInternship = (token: string, id: number) =>
  request<never>(`/admin/internships/${id}`, { method: "DELETE", token });

export {
  adminLogin,
  adminLogout,
  deleteAdminContact,
  deleteAdminInternship,
  fetchAdminContacts,
  fetchAdminInternships,
  fetchAdminSubscribers,
  fetchAdminSummary,
  submitContactQuery,
  submitInternshipApplication,
  subscribeToNewsletter,
};
