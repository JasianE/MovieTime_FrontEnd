import { useState, useEffect } from "react";
import type { MovieType } from "../Types/movieTypes";
import { AddMovieToUser, QueryMovies } from "../Services/Movies.service";
import type { UserFullType } from "../Types/user";

type SearchMovieProps = {
    user: UserFullType,
    jwt: string
}
const SearchMovie : React.FC<SearchMovieProps> = ({user, jwt}) =>{
    const [query, setQuery] = useState("");
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

    function handleSubmit(){
        //Ok so i guess pass in the user as props to this method
        //And then boom you pass that in and then this will work (just call the add movie to other user endpoint on .net)
        //And then we get a movie recommendation app!
        AddMovieToUser(user.userName, jwt, query)
        .then((data) => {
            if(typeof data == "string"){
                setResult(data);
            } else {
                setResult("Sucessfully added new movie.") // if its not a string it aint an error and i dont wanna deal with json types right now
             }
        })
    }
    return (
        <>
            {result ? result : null}
            <div style={{ position: "relative", width: "300px" }}>
            <input
                type="text"
                value={query}
                placeholder="Search movies..."
                onChange={(e) => setQuery(e.target.value)}
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
                        setQuery(movie.title);
                        setShowDropDown(false);
                    }}
                    >
                    {movie.title}
                    </li>
                ))}
                </ul>
            )}
            </div>
            <button onClick={handleSubmit}> {/*Ideally refactor this to have this outside of this component and into the otherUser page instead so this becomes more versatile */}
                Submit Request!
            </button>
        </>
      );
    
    }

export default SearchMovie;