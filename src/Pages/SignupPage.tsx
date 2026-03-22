import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../Components/Signup";
import "../App.css";

type SignupPageProps = {
  changeJwt: (change: string) => void;
  changeUserName: (change: string) => void;
};

const SignupPage: React.FC<SignupPageProps> = ({ changeJwt, changeUserName }) => {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="logo-mark">
          MovieTime
        </Link>
        <Link to="/login" className="text-link">
          Log in
        </Link>
      </header>
      <div className="auth-body">
        <div className="auth-copy">
          <p className="eyebrow">Start recommending</p>
          <h1>Build a clean, shared queue with people you trust.</h1>
          <p className="muted">
            Create an account to send picks, track watched titles, and keep your
            movie night list in one place.
          </p>
          <div className="auth-cta">
            <span className="muted">Already have an account?</span>
            <Link to="/login" className="text-link">
              Log in
            </Link>
          </div>
        </div>
        <SignUp changeJwt={changeJwt} changeUserName={changeUserName} />
      </div>
    </div>
  );
};

export default SignupPage;
