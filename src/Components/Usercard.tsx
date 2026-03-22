import type { UserBasicType } from "../Types/user";
import "../App.css"

type UserCardProps = {
    user: UserBasicType,
    handle: (userId : string) => void;
}

const Usercard: React.FC<UserCardProps> = ({user, handle}) => {
    const initial = user.userName.charAt(0).toUpperCase();

    return (
        <div className="user-card" onClick={() => {handle(user.id)}}>
            <div className="user-avatar">{initial}</div>
            <div>
                <h2>{user.userName}</h2>
                <p className="muted">Send a recommendation</p>
            </div>
        </div>
    )
}

export default Usercard;