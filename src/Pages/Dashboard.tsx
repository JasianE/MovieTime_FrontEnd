import React,{useEffect, useState} from "react";
import GetAllUserMovies from "../Services/UserMovie.service";
import Movie from "../Components/Movie";
import type { MovieType } from "../Types/movieTypes";
import { useNavigate } from "react-router-dom";

import "../App.css"

type DashboardProps = {
    jwt: string
}

const Dashboard : React.FC<DashboardProps> = ({jwt}) => {
    const navigate = useNavigate();
    
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
            <div className="recommended-container">
                {movies.map((movie : MovieType) => {
                    return(<Movie title={movie.title} posterPath={movie.posterPath} overView={movie.overView}/>)
                })}
            </div>
            Search For Other Users:
            <button onClick={() => {navigate('/Users')}}>Click me for other users</button>
        </div>
    )
}

export default Dashboard;