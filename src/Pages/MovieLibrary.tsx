import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AddMovieToDatabase, GetAllMovies } from "../Services/Movies.service";
import type { LibraryMovieType } from "../Types/movieTypes";
import "../App.css";

type MovieLibraryProps = {
  jwt: string;
};

const MovieLibrary: React.FC<MovieLibraryProps> = ({ jwt }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/users";
  const [movies, setMovies] = useState<LibraryMovieType[]>([]);
  const [query, setQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 12;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    GetAllMovies(pageNumber, pageSize, query)
      .then((data) => {
        setMovies(data);
        setHasMore(data.length === pageSize);
      })
      .catch((err) => setMessage(err?.message || "Could not load movies."));
  }, [pageNumber, query]);

  const filteredMovies = useMemo(() => movies, [movies]);

  const handleAddMovie = () => {
    if (!newTitle.trim() || pending) {
      return;
    }
    setPending(true);
    AddMovieToDatabase(newTitle.trim(), jwt)
      .then((movie) => {
        setMovies((prev) => {
          const exists = prev.some((item) => item.title.toLowerCase() === movie.title.toLowerCase());
          if (exists) {
            return prev;
          }
          return [movie, ...prev];
        });
        setMessage("Added to the library. Select it below to recommend.");
        setNewTitle("");
      })
      .catch((err) => setMessage(err?.message || "Could not add movie."))
      .finally(() => setPending(false));
  };

  const handleSelectMovie = (title: string) => {
    const path = `${returnTo}?title=${encodeURIComponent(title)}`;
    navigate(path);
  };

  return (
    <div className="movies-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Movie library</p>
          <h1>Pick from the existing database</h1>
          <p className="muted">Choose a movie, then confirm it before sending a recommendation.</p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate(returnTo)}>
          Back
        </button>
      </header>

      {message && <p className="form-error">{message}</p>}

      <section className="section">
        <div className="section-header">
          <h2>Browse all movies</h2>
          <span className="pill">{filteredMovies.length} titles</span>
        </div>
        <div className="recommend-toolbar">
          <input
            className="search-input"
            type="text"
            placeholder="Search the library"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPageNumber(1);
            }}
          />
          <div className="pagination-controls">
            <button
              className="btn btn-ghost"
              onClick={() => setPageNumber((value) => Math.max(1, value - 1))}
              disabled={pageNumber === 1}
            >
              Previous
            </button>
            <span className="pill">Page {pageNumber}</span>
            <button
              className="btn btn-ghost"
              onClick={() => setPageNumber((value) => value + 1)}
              disabled={!hasMore}
            >
              Next
            </button>
          </div>
        </div>
        <div className="library-grid">
          {filteredMovies.length === 0 ? (
            <div className="empty-card">
              <h3>No matches</h3>
              <p className="muted">Try a different title or add it below.</p>
            </div>
          ) : (
            filteredMovies.map((movie) => (
              <div key={movie.title} className="library-card">
                <img
                  className="library-poster"
                  src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                  alt={movie.title}
                />
                <div className="library-meta">
                  <h3>{movie.title}</h3>
                  <p className="muted">{movie.runtime ? `${movie.runtime} min` : "Runtime unavailable"}</p>
                  <p className="library-overview">{movie.overView || "No overview available."}</p>
                </div>
                <button className="btn btn-primary" onClick={() => handleSelectMovie(movie.title)}>
                  Select movie
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Not in our database? add it here!</h2>
          <span className="pill pill-light">Manual add</span>
        </div>
        <div className="add-movie-panel">
          <input
            className="search-input"
            type="text"
            placeholder="Enter exact movie title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddMovie} disabled={pending}>
            {pending ? "Adding..." : "Add to library"}
          </button>
        </div>
        <p className="muted">Adding a movie only adds it to the library. You still need to select it before recommending.</p>
      </section>
    </div>
  );
};

export default MovieLibrary;