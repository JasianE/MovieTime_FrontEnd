
async function GetAllUserMovies(jwt: string){
    const res = await fetch("http://localhost:5245/api/usermovie", {
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