import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Users from './Pages/Users';
import OtherUser from './Pages/OtherUser';

function App() {
  const [jwt, setJwt] = useState('');
  //TODO NOW! -- Features to be implemeneted
  //I need to make a feature to get ALL USERS and then make a user page, displaying that user's movies -- Done!
  //I ALSO need to add the feature of adding movies to another user
  // I ALSO need to add the feature of changing a movie's status to watched (i think imma need to change the api)
  //Thats it!

  //Refactors TODO
  //Need to refactor for keeping track of who recommended who what

  // Current bugs
  // In other users, the current user is also displayed
  function ChangeJwt(change: string){
    setJwt(change);
  }

  return (
    <>
      <Routes>
        <Route path="/" element = {<Home changeJwt={ChangeJwt} />} />
        <Route path = "/dashboard" element = { jwt ? <Dashboard jwt={jwt}/> : <Navigate to ="/"/>}/>
        <Route path = "/users" element = { jwt ? <Users jwt={jwt}/> : <Navigate to ="/"/>}/>
        <Route path = "/OtherUser/:id" element = {jwt ? <OtherUser jwt={jwt}/> : <Navigate to="/"/>}/>
      </Routes>
    </>
  )
}

export default App
