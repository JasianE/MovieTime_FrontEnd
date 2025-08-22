import type { MovieType } from "../Types/movieTypes";

export async function QueryMovies(query: string){
    try { 
        const res = await fetch(`http://localhost:5245/api/movie/all?title=${query}`);
        if (res.ok){
            const data: MovieType[] = await res.json();
            return data;
        }
    } catch(err){
        return("Error");
    }
}

export async function AddMovieToUser(userName : string , jwt: string, movieName: string){
    try {
        const res = await fetch('http://localhost:5245/api/usermovie', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({
                userName: userName,
                movieName: movieName
            })
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

export async function ChangeMovieStatus(movieName: string, jwt: string){
    try {
        const res = await fetch(`http://localhost:5245/api/usermovie/update/${movieName}`, {
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