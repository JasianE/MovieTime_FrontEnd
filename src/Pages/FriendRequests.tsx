import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllUsers } from "../Services/Users.service";
import {
  AcceptFriendRequest,
  DeclineFriendRequest,
  GetFriends,
  GetIncomingRequests,
  GetOutgoingRequests,
  SendFriendRequest
} from "../Services/Friends.service";
import type { FriendRequestType } from "../Types/friend";
import type { UserBasicType } from "../Types/user";
import "../App.css";

type FriendRequestsProps = {
  jwt: string;
  currentUserName: string;
};

const FriendRequests: React.FC<FriendRequestsProps> = ({ jwt, currentUserName }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserBasicType[]>([]);
  const [friends, setFriends] = useState<UserBasicType[]>([]);
  const [incoming, setIncoming] = useState<FriendRequestType[]>([]);
  const [outgoing, setOutgoing] = useState<FriendRequestType[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const refreshAll = () => {
    Promise.all([
      GetAllUsers(jwt),
      GetFriends(jwt),
      GetIncomingRequests(jwt),
      GetOutgoingRequests(jwt)
    ])
      .then(([allUsers, friendList, incomingRequests, outgoingRequests]) => {
        setUsers(allUsers);
        setFriends(friendList);
        setIncoming(incomingRequests);
        setOutgoing(outgoingRequests);
        setError("");
      })
      .catch((err) => {
        setError(err?.message || "Could not load friend requests.");
      });
  };

  useEffect(() => {
    refreshAll();
  }, [jwt]);

  const blockedNames = useMemo(() => {
    const blocked = new Set<string>();
    friends.forEach((friend) => blocked.add(friend.userName));
    incoming.forEach((request) => blocked.add(request.senderUserName));
    outgoing.forEach((request) => blocked.add(request.receiverUserName));
    blocked.add(currentUserName);
    return blocked;
  }, [friends, incoming, outgoing, currentUserName]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (blockedNames.has(user.userName)) {
        return false;
      }
      return user.userName.toLowerCase().includes(query.toLowerCase());
    });
  }, [users, query, blockedNames]);

  const handleSendRequest = (userName: string) => {
    SendFriendRequest(jwt, userName)
      .then(() => refreshAll())
      .catch((err) => setError(err?.message || "Could not send request."));
  };

  const handleAccept = (requestId: number) => {
    AcceptFriendRequest(jwt, requestId)
      .then(() => refreshAll())
      .catch((err) => setError(err?.message || "Could not accept request."));
  };

  const handleDecline = (requestId: number) => {
    DeclineFriendRequest(jwt, requestId)
      .then(() => refreshAll())
      .catch((err) => setError(err?.message || "Could not decline request."));
  };

  return (
    <div className="friends-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Friend requests</p>
          <h1>Build your trusted circle</h1>
          <p className="muted">Send requests, accept invites, then recommend movies.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-ghost" onClick={() => {navigate('/users')}}>
            Back to recommendations
          </button>
          <button className="btn btn-ghost" onClick={() => {navigate('/dashboard')}}>
            Back to dashboard
          </button>
        </div>
      </header>

      {error && <p className="form-error">{error}</p>}

      <section className="section">
        <div className="section-header">
          <h2>Find people</h2>
          <span className="pill">{filteredUsers.length} available</span>
        </div>
        <div className="recommend-toolbar">
          <input
            className="search-input"
            type="text"
            placeholder="Search by username"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="friend-grid">
          {filteredUsers.length === 0 ? (
            <div className="empty-card">
              <h3>No one new right now</h3>
              <p className="muted">Try a different search or check incoming requests.</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.id} className="friend-card">
                <div>
                  <h3>{user.userName}</h3>
                  <p className="muted">Send a friend request</p>
                </div>
                <button className="btn btn-primary" onClick={() => handleSendRequest(user.userName)}>
                  Send request
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Incoming requests</h2>
          <span className="pill">{incoming.length} pending</span>
        </div>
        <div className="friend-grid">
          {incoming.length === 0 ? (
            <div className="empty-card">
              <h3>No incoming requests</h3>
              <p className="muted">Share your username so friends can add you.</p>
            </div>
          ) : (
            incoming.map((request) => (
              <div key={request.id} className="friend-card">
                <div>
                  <h3>{request.senderUserName}</h3>
                  <p className="muted">Wants to connect</p>
                </div>
                <div className="friend-actions">
                  <button className="btn btn-primary" onClick={() => handleAccept(request.id)}>
                    Accept
                  </button>
                  <button className="btn btn-ghost" onClick={() => handleDecline(request.id)}>
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Outgoing requests</h2>
          <span className="pill pill-light">{outgoing.length} waiting</span>
        </div>
        <div className="friend-grid">
          {outgoing.length === 0 ? (
            <div className="empty-card">
              <h3>No pending requests</h3>
              <p className="muted">Send a request to start recommending.</p>
            </div>
          ) : (
            outgoing.map((request) => (
              <div key={request.id} className="friend-card">
                <div>
                  <h3>{request.receiverUserName}</h3>
                  <p className="muted">Awaiting response</p>
                </div>
                <span className="pill">Pending</span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default FriendRequests;