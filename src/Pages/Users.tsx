import { useEffect, useMemo, useState } from "react";
import Usercard from "../Components/Usercard";
import { GetFriends } from "../Services/Friends.service";
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
        GetFriends(jwt)
        .then((data) => {
            setUsers(data);
        })
        .catch(() => {
            setUsers([]);
        });
    }, [jwt]);

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
                        Only friends can receive recommendations. Manage requests in the friends page.
                    </p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-ghost" onClick={() => {navigate('/friends')}}>
                        Friend requests
                    </button>
                    <button className="btn btn-ghost" onClick={() => {navigate('/dashboard')}}>
                        Back to dashboard
                    </button>
                </div>
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
                {filteredUsers.length === 0 ? (
                    <div className="empty-card">
                        <h3>No friends yet</h3>
                        <p className="muted">Send a friend request to unlock recommendations.</p>
                        <button className="btn btn-primary" onClick={() => {navigate('/friends')}}>
                            Find friends
                        </button>
                    </div>
                ) : (
                    filteredUsers.map((user) => (
                        <Usercard key={user.id} user={user} handle={handleClick} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Users;