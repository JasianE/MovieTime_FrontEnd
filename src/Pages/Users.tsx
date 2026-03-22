import { useEffect, useMemo, useState } from "react";
import Usercard from "../Components/Usercard";
import { GetAllUsers } from "../Services/Users.service";
import { useNavigate } from "react-router-dom";
import type { UserBasicType } from "../Types/user";
import '../App.css'

type UsersProps = {
    jwt: string
    currentUserName: string
}

const Users : React.FC<UsersProps> = ({jwt, currentUserName}) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserBasicType[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        GetAllUsers(jwt)
        .then((data) => {
            setUsers(data);
        })
    }, []);

    function handleClick(userId: string){
        navigate(`/OtherUser/${userId}`)
    }
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            if (user.userName === currentUserName) {
                return false;
            }
            return user.userName.toLowerCase().includes(query.toLowerCase());
        });
    }, [users, query, currentUserName]);

    return (
        <div className="recommend-page">
            <header className="page-header">
                <div>
                    <p className="eyebrow">Recommend a movie</p>
                    <h1>Pick who to send a movie to</h1>
                    <p className="muted">
                        Search for a friend, tap their card, then send a fresh movie pick.
                    </p>
                </div>
                <button className="btn btn-ghost" onClick={() => {navigate('/dashboard')}}>
                    Back to dashboard
                </button>
            </header>

            <div className="recommend-toolbar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search users"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <div className="pill">{filteredUsers.length} available</div>
            </div>

            <div className="user-grid">
                {filteredUsers.map((user) => (
                    <Usercard key={user.id} user={user} handle={handleClick} />
                ))}
            </div>
        </div>
    )
}

export default Users;