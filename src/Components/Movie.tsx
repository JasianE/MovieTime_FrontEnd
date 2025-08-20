import type { MovieType } from "../Types/movieTypes";
import "../App.css"

const Movie : React.FC<MovieType> = ({title, overView, posterPath}) => {
    const imageUrl = `https://image.tmdb.org/t/p/w200${posterPath}`;
    return (
        <div className="movie-card">
            <h3>{title}</h3>
            <img src={imageUrl} alt={title}/>
            <p>{overView}</p>
        </div>
    )
}

export default Movie