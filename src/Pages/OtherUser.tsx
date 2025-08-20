import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetUserById } from "../Services/Users.service";
import type { UserFullType } from "../Types/user";
import Movie from "../Components/Movie";
import type { MovieType } from "../Types/movieTypes";

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

    console.log(userData);
    return (
        <div>
            <h1>{userData.userName}</h1>
            {userData.userMovies.map((movie : MovieType) => {
                return(
                    <Movie title={movie.title} posterPath={movie.posterPath} overView={movie.overView}/>
                    //AHUSDHUFSHD IMMA busT look at that REUSABILITY (I LOVE SCALABLE CLEAN CODEE!!!)
                )
            })}
        </div>
    )
}

export default OtherUser;