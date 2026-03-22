import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'

type LoginProps = {
  changeJwt: (change: string) => void;
  changeUserName: (change: string) => void;
}

const Login : React.FC<LoginProps> = ({changeJwt, changeUserName}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({username: "", password: ""});
    const [error, setError] = useState('');
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await fetch(API_URL + "/api/account/login", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          const contentType = res.headers.get("content-type") || "";
          let message = "Login failed. Please check your credentials.";

          if (contentType.includes("application/json")) {
            const payload = await res.json();
            if (typeof payload === "string") {
              message = payload;
            } else if (payload?.message) {
              message = payload.message;
            }
          } else {
            const text = await res.text();
            if (text) {
              message = text;
            }
          }

          setError(message);
          return;
        }

        const data = await res.json();
        setError("");
        changeJwt(data.token);
        changeUserName(formData.username);
        navigate("/dashboard");
      } catch(err){
        setError("Login failed. Please try again in a moment.");
      }
    }
    return (
      <div className="auth-card">
        <h2>Log in</h2>
        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="form-stack">
          <label className="field">
            <span>Username</span>
            <input
              type="text"
              name="username"
              placeholder="Your handle"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="btn btn-primary btn-block">
            Enter the movie pit
          </button>
        </form>
      </div>
    )
}

export default Login