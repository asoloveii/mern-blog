import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Post from '../components/post/Post'
import { getUserAPI } from '../api/api'

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

export default function UserProfilePage({ match }) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = () => {
      try {
        let res = getUserAPI(match.params.username)
        setProfile(res.data)
      } catch (e) {
        alert(e.message)
      }
    }
    fetchProfile()
  }, [match.params.username])

  const classes = useStyles()
  const posts = useSelector(state => state.posts.posts).filter(p => p.author === profile.username)

  return (
    <div className={classes.profile}>
      <Container maxWidth="md">
        <div className={classes.user}>
          {profile.profilePic ? (
            <img src={`/uploads/${profile.profilePic}`} alt="profile" className={classes.profilePic} />
          ) : (
            <img src='/images/profileDefault.jpg' alt="profile" className={classes.profilePic} />
          )}
          <div className={classes.info}>
            <div>
              <Typography variant="h5">{profile.firstname} {profile.secondname}, {profile.age}</Typography>
              <Typography color="primary" variant="h6" >@{profile.username}</Typography>
              <Typography variant="body1">{profile.desc}</Typography>
            </div>
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
                likes={p.likes}
                author={p.author}
              />
            </Grid>
          ))}
        </Grid>

      </Container>
    </div>
  )
}
