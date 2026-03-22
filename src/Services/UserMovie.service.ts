
import type { RecommendationDetailType } from "../Types/movieTypes";

async function GetAllUserMovies(jwt: string){
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(API_URL + "/api/usermovie", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    });

    if(!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
}

export default GetAllUserMovies;

export async function GetRecommendationById(jwt: string, recommendationId: number): Promise<RecommendationDetailType> {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${API_URL}/api/usermovie/recommendations/${recommendationId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    });

    if (!res.ok) {
        const message = await res.text();
        throw new Error(message || `Request failed: ${res.status}`);
    }

    return res.json();
}

export async function UpdateRecommendation(
    jwt: string,
    recommendationId: number,
    payload: {
        recipientRating?: number | null;
        recipientNotes?: string | null;
        status?: number | null;
    }
): Promise<void> {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${API_URL}/api/usermovie/recommendations/${recommendationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const message = await res.text();
        throw new Error(message || `Request failed: ${res.status}`);
    }
}