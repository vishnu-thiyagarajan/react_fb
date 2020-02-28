import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Profile from './pages/Profile'
import signup from './pages/signup'
import './App.css'

function App () {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [selectedProfile, setSelectedProfile] = useState(null)
  useEffect(() => {
    const prevLogin = localStorage.getItem('loggedUser')
    if (prevLogin) {
      setLoggedInUser(JSON.parse(prevLogin))
    }
  }, [setLoggedInUser])
  return (
    <Router>
      <NavBar loggedIn={loggedInUser} setSelectedProfile={setSelectedProfile} />
      <Switch>
        <Route exact path='/' component={() => <Home loggedInUser={loggedInUser} setSelectedProfile={setSelectedProfile} />} />
        <Route exact path='/login' component={() => <Login loginHandler={setLoggedInUser} />} />
        <Route exact path='/signup' component={signup} />
        <Route exact path='/profile' component={() => <Profile loggedInUser={loggedInUser} selectedProfile={selectedProfile} />} />
        <Route exact path='/notification' component={Login} />
        <Route exact path='/logout' component={() => <Logout loginHandler={setLoggedInUser} />} />
      </Switch>
    </Router>
  )
}

export default App
