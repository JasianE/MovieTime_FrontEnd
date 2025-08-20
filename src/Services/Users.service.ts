
export async function GetAllUsers(jwt: string){
    const res = await fetch("http://localhost:5245/api/users/all", {
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

export async function GetUserById(id: string, jwt: string){
    const res = await fetch(`http://localhost:5245/api/users/${id}`, {
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