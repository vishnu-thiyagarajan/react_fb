import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import home from './pages/home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import signup from './pages/signup'
import './App.css'

function App () {
  const [loggedInUser, setLoggedInUser] = useState(null)
  return (
    <Router>
      <NavBar loggedIn={loggedInUser} />
      <Switch>
        <Route exact path='/' component={home} />
        <Route exact path='/login' render={() => (<Login loginHandler={setLoggedInUser} />)} />
        <Route exact path='/signup' component={signup} />
        <Route exact path='/profile' component={home} />
        <Route exact path='/notification' component={Login} />
        <Route exact path='/logout' render={() => (<Logout loginHandler={setLoggedInUser} />)} />
      </Switch>
    </Router>
  )
}

export default App
