import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

function App() {
  const [jwt, setJwt] = useState('');

  function ChangeJwt(change: string){
    setJwt(change);
  }
  console.log(jwt)
  return (
    <>
      <Routes>
        <Route path="/" element = {<Home changeJwt={ChangeJwt} />} />
        <Route path = "/dashboard" element = { jwt ? <Dashboard jwt={jwt}/> : <Navigate to ="/"/>}/>
      </Routes>
    </>
  )
}

export default App
