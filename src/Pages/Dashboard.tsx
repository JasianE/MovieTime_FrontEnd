import React,{useEffect, useState} from "react";
import GetAllUserMovies from "../Services/UserMovie.service";
import Movie from "../Components/Movie";
import type { MovieType } from "../Types/movieTypes";

type DashboardProps = {
    jwt: string
}

type MovieProps = {
    title: string,
    overView: string,
    posterPath: string
}

const Dashboard : React.FC<DashboardProps> = ({jwt}) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        GetAllUserMovies(jwt)
        .then((stuff) => {
            setMovies(stuff);
        })
    }, [])

    return(
        <div>
            Movies recommended to you:
            {movies.map((movie : MovieType) => {
                return(<Movie title={movie.title} posterPath={movie.posterPath} overView={movie.overView}/>)
            })}
        </div>
    )
}

export default Dashboard;