const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (endpoint: string, options: any = {}) => {
  const headers = {
    "Content-Type": "application/json", // 👈 Tell .NET "This is JSON!"
    ...options.headers, // Allow individual calls to override headers if needed
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
