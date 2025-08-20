import type { MovieType } from "../Types/movieTypes";

const Movie : React.FC<MovieType> = ({title, overView, posterPath}) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    return (
        <div>
            <h1>{title}</h1>
            <img src={imageUrl} alt={title}/>
            <h3>{overView}</h3>
        </div>
    )
}

export default Movie