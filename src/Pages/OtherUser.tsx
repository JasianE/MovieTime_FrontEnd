import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetUserById } from "../Services/Users.service";
import type { UserFullType } from "../Types/user";
import Movie from "../Components/Movie";
import type { MovieType } from "../Types/movieTypes";
import MovieSearch from "../Components/SearchMovie";
import SearchMovie from "../Components/SearchMovie";

type OtherUserProps = {
    jwt: string
}
const OtherUser : React.FC<OtherUserProps> = ({jwt}) => {
    const { id } = useParams();
    const [userData, setUserData] = useState<UserFullType>({
        userName: '',
        id: '',
        userMovies: []
    });
    useEffect(() => {
        if(typeof id == "string"){
            GetUserById(id, jwt)
            .then((data) => {
                setUserData(data)
            })
        }
    }, [])

    //Should i make an endpoint in my api for adding a movie thats like this?
    //if the movie exists in database, just add that directly, if not, scour the tmdb api to add that to our database
    //new endpoint
    return (
        <div>
            <h1>{userData.userName}</h1>
            {userData.userMovies.map((movie : MovieType) => {
                return(
                    <Movie title={movie.title} posterPath={movie.posterPath} overView={movie.overView} status = {movie.status}/>
                    //AHUSDHUFSHD IMMA busT look at that REUSABILITY (I LOVE SCALABLE CLEAN CODEE!!!)
                )
            })}
            <h2>Add a movie recommendation to {userData.userName}!</h2>
            <SearchMovie user={userData} jwt={jwt}/>
        </div>
    )
}

export default OtherUser;