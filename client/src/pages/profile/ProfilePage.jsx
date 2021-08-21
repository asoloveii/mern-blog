import { Button, Container, Grid, Link, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Post from '../../components/post/Post'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles({
  profile: {
    margin: "50px 0"
  },
  profilePic: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "50%",
    marginLeft: "40px"
  },
  user: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px"
  },
  info: {
    marginLeft: "50px",
    display: "flex",
    justifyContent: "space-between"
  }
})

export default function ProfilePage() {
  const user = useSelector(state => state.auth.user)
  const classes = useStyles()
  const posts = useSelector(state => state.posts.posts).filter(p => p.author === user.username)

  return (
    <div className={classes.profile}>
      <Container maxWidth="md">
        <div className={classes.user}>
          {user.profilePic ? (
            <img src={`/uploads/${user.profilePic}`} alt="profile" className={classes.profilePic} />
          ) : (
            <img src='/images/profileDefault.jpg' alt="profile" className={classes.profilePic} />
          )}
          <div className={classes.info}>
            <div>
              <Typography variant="h5">{user.firstname} {user.secondname}, {user.age}</Typography>
              <Typography>{user.desc}</Typography>
            </div>
            <Link to="/profile/settings" className="link">
              <Button style={{ marginLeft: "350px" }}>
                <SettingsIcon fontSize="large" />
              </Button>
            </Link>
          </div>
        </div>
        <Grid container spacing={1}>
          {posts.map((p, index) => (
            <Grid key={index} item xs={12} sm={12}>
              <Post
                id={p._id}
                title={p.title}
                desc={p.desc}
                photo={p.photo}
                date={p.createdAt}
                author={p.author}
              />
            </Grid>
          ))}
        </Grid>

      </Container>
    </div>
  )
}
