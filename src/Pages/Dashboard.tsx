import React, { useEffect, useMemo, useRef, useState } from "react";
import GetAllUserMovies from "../Services/UserMovie.service";
import RecommendationCard from "../Components/RecommendationCard";
import type { MovieType } from "../Types/movieTypes";
import { useNavigate } from "react-router-dom";

import "../App.css"

type DashboardProps = {
    jwt: string
    onLogout: () => void
}

const Dashboard : React.FC<DashboardProps> = ({jwt, onLogout}) => {
    const navigate = useNavigate();
    
    const [movies, setMovies] = useState<MovieType[]>([])
    const [forceResetCounter, setForceResetCounter] = useState(0);
    const requestIdRef = useRef(0);

    useEffect(() => {
        let isActive = true;
        const currentRequestId = ++requestIdRef.current;

        GetAllUserMovies(jwt)
        .then((stuff) => {
            if (isActive && currentRequestId === requestIdRef.current) {
                setMovies(stuff);
            }
        })
        .catch(() => {
            // Optional: surface error state later if needed.
        });

        return () => {
            isActive = false;
        };
    }, [forceResetCounter, jwt])

    function refresh(){
        setForceResetCounter((value) => value + 1);
    }

    const unwatched = useMemo(() => movies.filter((movie) => movie.status === 0), [movies]);
    const watched = useMemo(() => movies.filter((movie) => movie.status === 1), [movies]);

    return(
        <div className="dashboard-page">
            <header className="page-header">
                <div>
                    <p className="eyebrow">Your queue</p>
                    <h1>Recommendations made for you</h1>
                </div>
                <div className="header-actions">
                    <button className="btn btn-ghost" onClick={() => {onLogout(); navigate('/')}}>
                        Log out
                    </button>
                    <button className="btn btn-ghost" onClick={() => {navigate('/friends')}}>
                        Friend requests
                    </button>
                    <button className="btn btn-primary" onClick={() => {navigate('/Users')}}>
                        Recommend to a friend
                    </button>
                </div>
            </header>

            <section className="section">
                <div className="section-header">
                    <h2>New to watch</h2>
                    <span className="pill">{unwatched.length} picks</span>
                </div>
                <div className="recommendation-list">
                    {unwatched.map((movie) => (
                        <RecommendationCard key={`${movie.title}-new`} recommendation={movie} />
                    ))}
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <h2>Watched and done</h2>
                    <span className="pill pill-light">{watched.length} watched</span>
                </div>
                <div className="recommendation-list">
                    {watched.map((movie) => (
                        <RecommendationCard key={`${movie.title}-watched`} recommendation={movie} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Dashboard;