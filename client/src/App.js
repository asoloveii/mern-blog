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
import SettingsPage from './pages/settings/SettingsPage'
import PostPage from './pages/post/PostPage'
import UserProfilePage from './pages/userprofile/UserProfilePage'

function App() {
  const isAuth = useSelector(state => state.auth.isAuth)

  return (
    <BrowserRouter>
      <Navbar />
      {isAuth ? (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route path="/profile/settings" component={SettingsPage} />
          <Route path="/users/:username" component={UserProfilePage} />
          <Route path="/create" component={CreatePostPage} />
          <Route path="/posts/:postId" component={PostPage} />
          <Redirect to="/login" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route exact path="/" component={HomePage} />
          <Route path="/posts/:postId" component={PostPage} />
          <Route path="/users/:username" render={UserProfilePage} />
          <Redirect to="/" />
        </Switch>
      )}
      <Footer />
    </BrowserRouter>
  );
}

export default App
