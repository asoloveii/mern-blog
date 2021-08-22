import React from 'react'
import { AppBar, Button, Container, CssBaseline, makeStyles, Toolbar, Typography } from "@material-ui/core"
import BookmarkIcon from '@material-ui/icons/Bookmark'
import PersonIcon from "@material-ui/icons/Person"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CreateIcon from '@material-ui/icons/Create'

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
  const isAuth = useSelector(state => state.auth.isAuth)
  const user = useSelector(state => state.auth.user)

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
