import type { FriendRequestType } from "../Types/friend";
import type { UserBasicType } from "../Types/user";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function GetFriends(jwt: string): Promise<UserBasicType[]> {
  const res = await fetch(`${API_URL}/api/friends/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export async function GetIncomingRequests(jwt: string): Promise<FriendRequestType[]> {
  const res = await fetch(`${API_URL}/api/friends/requests/incoming`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export async function GetOutgoingRequests(jwt: string): Promise<FriendRequestType[]> {
  const res = await fetch(`${API_URL}/api/friends/requests/outgoing`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export async function SendFriendRequest(jwt: string, userName: string): Promise<FriendRequestType> {
  const res = await fetch(`${API_URL}/api/friends/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    },
    body: JSON.stringify({
      userName
    })
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Could not send request.");
  }

  return res.json();
}

export async function AcceptFriendRequest(jwt: string, requestId: number): Promise<FriendRequestType> {
  const res = await fetch(`${API_URL}/api/friends/requests/${requestId}/accept`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Could not accept request.");
  }

  return res.json();
}

export async function DeclineFriendRequest(jwt: string, requestId: number): Promise<FriendRequestType> {
  const res = await fetch(`${API_URL}/api/friends/requests/${requestId}/decline`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Could not decline request.");
  }

  return res.json();
}