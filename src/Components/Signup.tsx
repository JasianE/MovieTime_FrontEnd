import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

type SignUpProps = {
  changeJwt: (change: string) => void;
}

type errorResponse = {
    code: string,
    description: string
}

const SignUp : React.FC<SignUpProps> = ({changeJwt}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({username: "", password: "", email: ""});
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await fetch("http://localhost:5245/api/account/register", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formData)
        });

        if(!res.ok) {

          const msg = await res.json();
          const errors = msg.map((item: { description: any; }) => item.description)
          const error = errors.join(" ")
          setError(error); // creates an error message w/ all the errors
        } else {
          const data = await res.json();
          setError('');
          changeJwt(data.token);
          navigate("/dashboard")
        }
      } catch(err){
        setError("Error has occured.");
      }
    }
    return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Log in</h2>
    {error}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />


        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Join the movie pit
        </button>
      </form>
    </div>
    )
}

export default SignUp