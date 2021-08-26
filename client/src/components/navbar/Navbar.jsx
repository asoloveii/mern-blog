import React from 'react'
import { AppBar, Button, Container, CssBaseline, makeStyles, Toolbar, Typography } from "@material-ui/core"
import BookmarkIcon from '@material-ui/icons/Bookmark'
import PersonIcon from "@material-ui/icons/Person"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import CreateIcon from '@material-ui/icons/Create'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { logoutAC } from '../../store/authReducer'

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    color: "white",
    fontSize: "18px"
  },
  profilePic: {
    width: "40px",
    borderRadius: "50%"
  }
})

export default function Navbar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const isAuth = useSelector(state => state.auth.isAuth)
  const user = useSelector(state => state.auth.user)

  const handleLogout = () => {
    dispatch(logoutAC())
    localStorage.removeItem("token")
    history.push("/")
  }

  return (
    <AppBar position="static" style={{ background: "black" }}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar className={classes.wrapper}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit">
              <Link to="/" style={{ color: "inherit" }} className="link"><BookmarkIcon fontSize="large" /></Link>
            </Button>
          </div>
          <div>
            <Button color="inherit" style={{ textTransform: "none" }}>
              <Link to="/" className="link" style={{ color: "inherit" }}>
                <Typography variant="h5" >Blog</Typography></Link>
            </Button>
          </div>
          <div>
            {isAuth ? (
              <>
                <Link to="/create" style={{ color: "inherit" }}>
                  <Button color="inherit">
                    <CreateIcon fontSize="large" />
                  </Button>
                </Link>
                <Link to="/profile" className="link" style={{ color: "inherit" }}>
                  <Button color="inherit">
                    {user.profilePic
                      ? <img src={`/uploads/${user.profilePic}`} alt="Profile" className={classes.profilePic} />
                      : <PersonIcon fontSize="large" />}
                  </Button>
                </Link>
                <Button color="inherit" onClick={handleLogout}>
                  <ExitToAppIcon fontSize="large" />
                </Button>
              </>

            ) : <Link to="/login" className="link">
              <Button className={classes.button}>Login</Button>
            </Link>
            }
          </div>
        </Toolbar>
      </Container>

    </AppBar>
  )
}
