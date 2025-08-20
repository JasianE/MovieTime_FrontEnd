import React from "react";
import Login from "../Components/Login";
import SignUp from "../Components/Signup";

type HomeProps = {
    changeJwt: (change: string) => void;
}// gotta destructure the props ALWAYS
const Home: React.FC<HomeProps> = ({changeJwt}) => {

    return (
        <div>
            <h1>Hello, please log in or sign up.</h1>
            <Login changeJwt={changeJwt}/>
            <SignUp changeJwt={changeJwt}/>
        </div>
    )
}

export default Home;