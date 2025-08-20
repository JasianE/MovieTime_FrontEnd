import React,{useEffect, useState} from "react";
import GetAllUserMovies from "../Services/UserMovie.service";

type DashboardProps = {
    jwt: string
}

const Dashboard : React.FC<DashboardProps> = ({jwt}) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const data = GetAllUserMovies(jwt)
        .then((stuff) => {
            setMovies(stuff);
        })
    }, [])

    console.log(movies);

    return(
        <div>
            <h1>Helldsaflsoo!!!</h1>
        </div>
    )
}

export default Dashboard;