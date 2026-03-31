
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch  = async (endpoint: string, options : RequestInit = {})=>{
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred while fetching data.");
    }
    return response.json();

};