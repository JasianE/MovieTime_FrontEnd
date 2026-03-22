import React from "react";
import { Link } from "react-router-dom";
import Login from "../Components/Login";
import "../App.css";

type LoginPageProps = {
  changeJwt: (change: string) => void;
  changeUserName: (change: string) => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ changeJwt, changeUserName }) => {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="logo-mark">
          MovieTime
        </Link>
        <Link to="/signup" className="text-link">
          Create account
        </Link>
      </header>
      <div className="auth-body">
        <div className="auth-copy">
          <p className="eyebrow">Welcome back</p>
          <h1>Pick up your queue and keep the recommendations flowing.</h1>
          <p className="muted">
            Log in to see your latest picks, mark movies as watched, and send new
            recommendations in seconds.
          </p>
          <div className="auth-cta">
            <span className="muted">New here?</span>
            <Link to="/signup" className="text-link">
              Create an account
            </Link>
          </div>
        </div>
        <Login changeJwt={changeJwt} changeUserName={changeUserName} />
      </div>
    </div>
  );
};

export default LoginPage;
