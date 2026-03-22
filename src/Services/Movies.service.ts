import type { LibraryMovieType, MovieType } from "../Types/movieTypes";

export async function QueryMovies(query: string){
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    try { 
        const res = await fetch(`${API_URL}/api/movie/all?title=${query}`);
        if (res.ok){
            const data: MovieType[] = await res.json();
            return data;
        }
    } catch(err){
        return("Error");
    }
}

export async function AddMovieToUser(userName : string , jwt: string, movieName: string, reason?: string){
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    try {
        const res = await fetch(API_URL +  '/api/usermovie', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({
                userName: userName,
                movieName: movieName,
                reason: reason
            })
        })
        if(res.ok){
            return await res.json();
        } else {
            const contentType = res.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
                return await res.json();
            }
            return await res.text();
        }
    } catch(err){
        return("Error");
    }
}

export async function ChangeMovieStatus(movieName: string, jwt: string){
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
        const res = await fetch(`${API_URL}/api/usermovie/update/${movieName}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
        })
        if(res.ok){
            return await res.json();
        } else {
            return await res.json();
        }
    } catch(err){
        return("Error");
    }
}

export async function GetAllMovies(pageNumber = 1, pageSize = 12, title = ""): Promise<LibraryMovieType[]> {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const params = new URLSearchParams();
    params.set("pageNumber", String(pageNumber));
    params.set("pageSize", String(pageSize));
    if (title.trim()) {
        params.set("title", title.trim());
    }
    const res = await fetch(`${API_URL}/api/movie/all?${params.toString()}`);
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }
    return res.json();
}

export async function AddMovieToDatabase(movieTitle: string, jwt: string): Promise<LibraryMovieType> {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${API_URL}/api/movie/add?MovieTitle=${encodeURIComponent(movieTitle)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    });

    if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Could not add movie.");
    }

    return res.json();
}