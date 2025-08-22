import type { MovieType } from "../Types/movieTypes";
import "../App.css"
import { ChangeMovieStatus } from "../Services/Movies.service";

type movieProps = {
    movie: MovieType,
    jwt: string
}

const Movie : React.FC<movieProps> = ({movie, jwt}) => {
    const imageUrl = `https://image.tmdb.org/t/p/w200${movie.posterPath}`;

    function handleClick(){
        ChangeMovieStatus(movie.title, jwt)
        .then((data) => {
            console.log(data)
        })
    }

    return (
        <div className="movie-card">
            <h3>{movie.title}</h3>
            <img src={imageUrl} alt={movie.title}/>
            <p>{movie.overView}</p>
            {movie.status == 0 ? <button onClick={handleClick}>Watched!</button> : null}
        </div>
    )
}

export default Movie