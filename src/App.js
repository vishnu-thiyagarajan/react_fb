import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Notification from './pages/Notification'
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
        <Route exact path='/'>
          <Home loggedInUser={loggedInUser} setSelectedProfile={setSelectedProfile} />
        </Route>
        <Route exact path='/login'>
          <Login loginHandler={setLoggedInUser} />
        </Route>
        <Route exact path='/signup' component={signup} />
        <Route exact path='/profile'>
          <Profile loggedInUser={loggedInUser} selectedProfile={selectedProfile} />
        </Route>
        <Route exact path='/notification'>
          <Notification loggedInUser={loggedInUser} />
        </Route>
        <Route exact path='/logout'>
          <Logout loginHandler={setLoggedInUser} />
        </Route>
        <Route path='*'>NotFound</Route>
      </Switch>
    </Router>
  )
}

export default App
