import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Users from './Pages/Users';
import OtherUser from './Pages/OtherUser';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';

function App() {
  const [jwt, setJwt] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);
  //TODO NOW! -- Features to be implemeneted (aug 20-22)
  //I need to make a feature to get ALL USERS and then make a user page, displaying that user's movies -- Done!
  //I ALSO need to add the feature of adding movies to another user --> Done!
  // I ALSO need to add the feature of changing a movie's status to watched (i think imma need to change the api) --> Done!

  //Todo (aug 22 - )
  //Redesign UI/ w/ css (chatgpt :P --> i hate css!!@!@!@#)
  //Create a docker file and hope shit doesn't break
  //Host locally on server
  //Done! :D

  //Refactors TODO
  //Need to refactor for keeping track of who recommended who what

  // Current bugs
  // In other users, the current user is also displayed --> Resolved!
  //In other users, if the movie is not watched you can also have them have it watched --> resolved! (w/ duct tape)
  //In your dashboard, it doesn't refresh, not a big deal but it would be nice to see it change IRL --> Finished! :D
  function ChangeJwt(change: string){
    setJwt(change);
    if (change) {
      localStorage.setItem('movietime.jwt', change);
    } else {
      localStorage.removeItem('movietime.jwt');
    }
  }

  function ChangeUserName(change : string){
    setCurrentUserName(change);
    if (change) {
      localStorage.setItem('movietime.username', change);
    } else {
      localStorage.removeItem('movietime.username');
    }
  }

  function handleLogout() {
    ChangeJwt('');
    ChangeUserName('');
  }

  useEffect(() => {
    const savedJwt = localStorage.getItem('movietime.jwt') || '';
    const savedUserName = localStorage.getItem('movietime.username') || '';
    if (savedJwt) {
      setJwt(savedJwt);
    }
    if (savedUserName) {
      setCurrentUserName(savedUserName);
    }
    setIsHydrated(true);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isHydrated && jwt ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage changeJwt={ChangeJwt} changeUserName={ChangeUserName} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isHydrated && jwt ? (
              <Navigate to="/dashboard" />
            ) : (
              <SignupPage changeJwt={ChangeJwt} changeUserName={ChangeUserName} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            !isHydrated ? (
              <div className="page-loading">Loading...</div>
            ) : jwt ? (
              <Dashboard jwt={jwt} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/users"
          element={
            !isHydrated ? (
              <div className="page-loading">Loading...</div>
            ) : jwt ? (
              <Users jwt={jwt} currentUserName={currentUserName} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/OtherUser/:id"
          element={
            !isHydrated ? (
              <div className="page-loading">Loading...</div>
            ) : jwt ? (
              <OtherUser jwt={jwt} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  )
}

export default App
