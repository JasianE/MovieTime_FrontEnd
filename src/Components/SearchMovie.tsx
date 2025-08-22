import { useState, useEffect } from "react";
import type { MovieType } from "../Types/movieTypes";
import { AddMovieToUser, QueryMovies } from "../Services/Movies.service";
import type { UserFullType } from "../Types/user";

type SearchMovieProps = {
    query: string
    changeQuery: (queried: string) => void,
}
const SearchMovie : React.FC<SearchMovieProps> = ({changeQuery, query}) =>{
    const [results, setResults] = useState<MovieType[]>([]);
    const [showDropDown, setShowDropDown] = useState(false);
    const [result, setResult] = useState('');

    useEffect(() => { // queries api on every search query change
        
        if(query.length < 2){
            setResults([]);
        } else {
            QueryMovies(query)
            .then((data) => {
                if(typeof data == "string"){
                    console.log("error")
                } else {
                    setResults(data ?? []) // if nothing, we don't set anything, done to bypass ts syntax (im evil)
                    setShowDropDown(true);
                }
            })
        }
    }, [query])

    return (
        <>
            {result ? result : null}
            <div style={{ position: "relative", width: "300px" }}>
            <input
                type="text"
                value={query}
                placeholder="Search movies..."
                onChange={(e) => changeQuery(e.target.value)}
                onFocus={() => query.length >= 2 && setShowDropDown(true)}
                onBlur={() => setTimeout(() => setShowDropDown(false), 200)} // delay so clicks register
                style={{ width: "100%", padding: "8px" }}
            />
        
            {showDropDown && results.length > 0 && (
                <ul
                style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "blue",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginTop: "4px",
                    listStyle: "none",
                    padding: 0,
                    maxHeight: "200px",
                    overflowY: "auto",
                    zIndex: 1000,
                }}
                >
                {results.map((movie) => (
                    <li
                    key={movie.title}
                    style={{
                        padding: "8px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                    }}
                    onMouseDown={() => {
                        changeQuery(movie.title);
                        setShowDropDown(false);
                    }}
                    >
                    {movie.title}
                    </li>
                ))}
                </ul>
            )}
            </div>
        </>
      );
    
    }

export default SearchMovie;