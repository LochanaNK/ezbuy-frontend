import Cookie from "js-cookie";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (endpoint: string, options: any = {}) => {

  const token = typeof window !== "undefined" ? localStorage.getItem("ezbuy_token") : null;
  const user = Cookie.get("ezbuy_user") ? JSON.parse(Cookie.get("ezbuy_user")!) : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && {"Authorization" : `Bearer ${token}`}),
    ...options.headers,
  };
  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const errorText = await response.text();

    let errorData = { message: "An error occurred" };
    if (errorText) {
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { message: errorText };
      }
    }

    throw new Error(errorData.message || `Error: ${response.status}`);
  }

  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return null;
  }

  return response.json();
};
