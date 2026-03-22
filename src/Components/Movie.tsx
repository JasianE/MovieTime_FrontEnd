import type { MovieType } from "../Types/movieTypes";
import "../App.css"
import { ChangeMovieStatus } from "../Services/Movies.service";

type movieProps = {
    movie: MovieType,
    jwt: string,
    refresh ? : () => void // optional method for changing status, deals with changing state
    isOtherUserView ? : boolean
}

const Movie : React.FC<movieProps> = ({movie, jwt, refresh, isOtherUserView}) => {
    const imageUrl = `https://image.tmdb.org/t/p/w200${movie.posterPath}`;

    function handleClick(){
        ChangeMovieStatus(movie.title, jwt)
        .then(() => {
            if(refresh){
                refresh() // only occurs appears in your dashboard
            }
        })
    }

    return (
        <div className="movie-card">
            <div className="movie-card-inner">
                <div className="movie-card-front">
                    <img src={imageUrl} alt={movie.title} />
                    <div className="movie-card-meta">
                        <h3>{movie.title}</h3>
                        <span className="pill">Recommended</span>
                    </div>
                </div>

                <div className="movie-card-back">
                    <h3>{movie.title}</h3>
                    <p>{movie.overView}</p>
                    {movie.status === 0 && (
                        isOtherUserView ? null : (
                            <button className="btn btn-ghost" onClick={handleClick}>
                                Mark as watched
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Movie;