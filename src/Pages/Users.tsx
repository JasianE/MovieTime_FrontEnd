import { useEffect, useState } from "react";
import Usercard from "../Components/Usercard";
import { GetAllUsers } from "../Services/Users.service";
import { useNavigate } from "react-router-dom";

type UsersProps = {
    jwt: string
}

const Users : React.FC<UsersProps> = ({jwt}) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        GetAllUsers(jwt)
        .then((data) => {
            setUsers(data);
        })
    }, []);

    function handleClick(userId: string){
        navigate(`/OtherUser/${userId}`)
    }
    return (
        <div>
            {users.map((user) => {
                return (
                    <Usercard user={user} handle={handleClick}/> // Maps all users in card for redirecting
                )
            })}
        </div>
    )
}

export default Users;