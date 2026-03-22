import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { GetUserById } from "../Services/Users.service";
import type { UserFullType } from "../Types/user";
import Movie from "../Components/Movie";
import type { MovieType } from "../Types/movieTypes";
import { AddMovieToUser } from "../Services/Movies.service";
import { useNavigate } from "react-router-dom";
import '../App.css'

type OtherUserProps = {
    jwt: string
}
const OtherUser : React.FC<OtherUserProps> = ({jwt}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [userData, setUserData] = useState<UserFullType>({
        userName: '',
        id: '',
        userMovies: []
    });
    const [query, setQuery] = useState(''); // selected movie title
    const [reason, setReason] = useState('');
    const [result, setResult] = useState('');
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if(typeof id == "string"){
            GetUserById(id, jwt)
            .then((data) => {
                console.log(data)
                setUserData(data)
            })
        }
    }, [result])

    useEffect(() => {
        const selectedTitle = searchParams.get("title") || "";
        if (selectedTitle) {
            setQuery(selectedTitle);
        }
    }, [searchParams])

    function handleSubmit(){
            //Ok so i guess pass in the user as props to this method
            //And then boom you pass that in and then this will work (just call the add movie to other user endpoint on .net)
            //And then we get a movie recommendation app!
            if(!pending){
                AddMovieToUser(userData.userName, jwt, query, reason)
            .then((data) => {
                if(typeof data == "string"){
                    setResult(data);
                } else {
                    setResult("Sucessfully added new movie.") // if its not a string it aint an error and i dont wanna deal with json types right now
                }
                setReason('');
                setPending(false);

            })
            }
            setPending(true)
        }

    function clearSelection(){
        setQuery("");
    }

    //Should i make an endpoint in my api for adding a movie thats like this?
    //if the movie exists in database, just add that directly, if not, scour the tmdb api to add that to our database
    //new endpoint --> no just populate the db w/ the top 100/1000 most popular movies and that will be fine for now, no point in allowing users to add to db
    const watched = useMemo(() => {
        return userData.userMovies.filter((movie: MovieType) => movie.status === 1);
    }, [userData.userMovies]);

    const unwatched = useMemo(() => {
        return userData.userMovies.filter((movie: MovieType) => movie.status === 0);
    }, [userData.userMovies]);

    return (
        <div className="other-user-page">
            <header className="page-header">
                <div>
                    <p className="eyebrow">Recommend a movie</p>
                    <h1>{userData.userName}</h1>
                    <p className="muted">See what they have already watched before you send a new pick.</p>
                </div>
                <button className="btn btn-ghost" onClick={() => {navigate('/users')}}>
                    Back to users
                </button>
            </header>

            <section className="recommend-panel">
                <div>
                    <h2>Send a recommendation</h2>
                    <p className="muted">
                        Choose a movie from the library, then send it straight to {userData.userName}.
                    </p>
                </div>
                <div className="recommend-form">
                    <div className="selected-movie">
                        <label>Selected movie</label>
                        <div className="selected-row">
                            <input
                                type="text"
                                readOnly
                                value={query || "None selected"}
                            />
                            <button className="btn btn-ghost" onClick={clearSelection} disabled={!query}>
                                Clear
                            </button>
                        </div>
                    </div>
                    <div className="selected-movie">
                        <label>Why recommend it? (optional)</label>
                        <input
                            type="text"
                            value={reason}
                            placeholder="A quick note for your friend"
                            onChange={(event) => setReason(event.target.value)}
                        />
                    </div>
                    <div className="recommend-actions">
                        <button
                            className="btn btn-ghost"
                            onClick={() => {navigate(`/movies?returnTo=/OtherUser/${id}`)}}
                        >
                            Browse movie library
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={!pending && query ? handleSubmit : (() => {})}
                            disabled={!query}
                        >
                            {!pending ? "Send recommendation" : "Sending..."}
                        </button>
                    </div>
                </div>
                {result && <p className="result-message">{result}</p>}
            </section>

            <section className="section">
                <div className="section-header">
                    <h2>Watched already</h2>
                    <span className="pill pill-light">{watched.length} watched</span>
                </div>
                <div className="movie-row">
                    {watched.map((movie: MovieType) => (
                        <Movie key={`${movie.title}-watched`} movie={movie} jwt={jwt} isOtherUserView={true} />
                    ))}
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <h2>Still unwatched</h2>
                    <span className="pill">{unwatched.length} waiting</span>
                </div>
                <div className="movie-row">
                    {unwatched.map((movie: MovieType) => (
                        <Movie key={`${movie.title}-unwatched`} movie={movie} jwt={jwt} isOtherUserView={true} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default OtherUser;