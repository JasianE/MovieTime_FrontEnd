import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetUserById } from "../Services/Users.service";
import type { UserFullType } from "../Types/user";
import Movie from "../Components/Movie";
import type { MovieType } from "../Types/movieTypes";
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
    //new endpoint --> no just populate the db w/ the top 100/1000 most popular movies and that will be fine for now, no point in allowing users to add to db
    return (
        <div>
            <h1>{userData.userName}</h1>
            <h2>Movies they've watched</h2>
            {userData.userMovies.map((movie : MovieType) => {
                if(movie.status == 1){
                    return(
                        <Movie movie={movie} jwt={jwt}/>
                        //AHUSDHUFSHD IMMA busT look at that REUSABILITY (I LOVE SCALABLE CLEAN CODEE!!!)
                    )
                }
            })}
            <h2>Movies they've been recommened but HAVEN'T watched</h2>
            {userData.userMovies.map((movie : MovieType) => {
                if(movie.status == 0){
                    movie.status = 1; // overrides the status so that the card doesn't have the watched feature if unwatched for other user (im evil and it works, not super scalable though!)
                    return(
                        <Movie movie={movie} jwt={jwt}/>
                        //AHUSDHUFSHD IMMA busT look at that REUSABILITY (I LOVE SCALABLE CLEAN CODEE!!!)
                    )
                }
            })}
            
            <h2>Add a movie recommendation to {userData.userName}!</h2>
            <SearchMovie user={userData} jwt={jwt}/>
        </div>
             
    )
}

export default OtherUser;