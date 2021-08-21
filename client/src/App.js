import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/home/HomePage'
import ProfilePage from './pages/profile/ProfilePage'
import RegisterPage from './pages/register/RegisterPage'
import LoginPage from './pages/login/LoginPage'
import { useSelector } from 'react-redux'
import CreatePostPage from './pages/create/CreatePostPage'

function App() {
  const isAuth = useSelector(state => state.auth.isAuth)

  return (
    <BrowserRouter>
      <Navbar />
      {isAuth ? (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/create" component={CreatePostPage} />
          {/* <Route path="/posts/:postId" component={<div>Loading......</div>} />
          <Route path="/users/:username" component={<div>Loading......</div>} /> */}
          <Redirect to="/login" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route exact path="/" component={HomePage} />
          <Redirect to="/" />
        </Switch>
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App
