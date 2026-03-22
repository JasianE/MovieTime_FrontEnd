import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Home: React.FC = () => {
    return (
        <div className="landing-page">
            <header className="landing-header">
                <div className="logo-mark">MovieTime</div>
                <nav className="landing-nav">
                    <Link className="text-link" to="/login">
                        Log in
                    </Link>
                    <Link className="btn btn-primary" to="/signup">
                        Sign up
                    </Link>
                </nav>
            </header>

            <section className="landing-hero">
                <div className="hero-copy">
                    <p className="eyebrow">Minimal movie recommendations</p>
                    <h1>Keep a clean queue. Send picks that actually land.</h1>
                    <p className="muted">
                        MovieTime is a focused space to share recommendations, track watched
                        titles, and keep movie night planning stress-free.
                    </p>
                    <div className="hero-actions">
                        <Link className="btn btn-primary" to="/signup">
                            Start recommending
                        </Link>
                        <Link className="btn btn-ghost" to="/login">
                            I already have an account
                        </Link>
                    </div>
                </div>
                <div className="hero-card">
                    <div className="hero-card-top">
                        <span className="pill">Weekly picks</span>
                        <span className="pill pill-light">Tonight</span>
                    </div>
                    <div className="hero-card-body">
                        <h3>Recommendation flow</h3>
                        <p className="muted">
                            Browse your queue, tap what you watched, and send a fresh pick
                            without leaving the page.
                        </p>
                        <div className="mini-stats">
                            <div>
                                <strong>2</strong>
                                <span>New picks</span>
                            </div>
                            <div>
                                <strong>6</strong>
                                <span>Watched</span>
                            </div>
                            <div>
                                <strong>3</strong>
                                <span>Sent</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-steps">
                <div className="step-card">
                    <span className="step-number">01</span>
                    <h3>Collect recommendations</h3>
                    <p className="muted">Keep every shared movie in a calm, sorted feed.</p>
                </div>
                <div className="step-card">
                    <span className="step-number">02</span>
                    <h3>Mark as watched</h3>
                    <p className="muted">Flip cards to mark what you have finished.</p>
                </div>
                <div className="step-card">
                    <span className="step-number">03</span>
                    <h3>Recommend back</h3>
                    <p className="muted">Send a pick to a friend in a single flow.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;