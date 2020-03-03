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
import socketIOClient from 'socket.io-client'

function App () {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [notify, setNotify] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  useEffect(() => {
    const prevLogin = localStorage.getItem('loggedUser')
    if (prevLogin) {
      setLoggedInUser(JSON.parse(prevLogin))
    }
  }, [setLoggedInUser])
  const socket = socketIOClient('http://127.0.0.1:8000')
  useEffect(() => {
    if (loggedInUser) {
      socket.on('receive message', payload => {
        document.title = (notify.length + 1) + ' new notification'
        notify.unshift(payload)
        setNotify(notify)
      })
    }
  }, [loggedInUser, socket, notify, setNotify])
  const handleNewMessage = (newPost) => {
    socket.emit('new message', newPost)
  }
  const getNotifyLength = () => notify.length
  console.log(notify)
  return (
    <Router>
      <NavBar loggedIn={loggedInUser} setSelectedProfile={setSelectedProfile} getNotifyLength={getNotifyLength} />
      <Switch>
        <Route exact path='/'>
          <Home loggedInUser={loggedInUser} setSelectedProfile={setSelectedProfile} handleNewMessage={handleNewMessage} />
        </Route>
        <Route exact path='/login'>
          <Login loginHandler={setLoggedInUser} />
        </Route>
        <Route exact path='/signup' component={signup} />
        <Route exact path='/profile'>
          <Profile loggedInUser={loggedInUser} selectedProfile={selectedProfile} />
        </Route>
        <Route exact path='/notification'>
          <Notification loggedInUser={loggedInUser} notify={notify} />
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
