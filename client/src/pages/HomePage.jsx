import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Post from '../components/post/Post'
import CatNavigation from '../components/catnavigation/CatNavigation'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  heading: {
    margin: "10px 0"
  },
  gridContainer: {
    flexGrow: 1
  },
  home: {
    marginBottom: "100px",
  }
})

export default function HomePage() {
  const classes = useStyles()
  const location = useLocation()
  const category = location.search.split("=")[1]
  const posts = useSelector(state => state.posts.posts)
  const catPosts = posts.filter(p => p.category === category)
  const mainposts = category ? catPosts : posts

  return (
    <div className={classes.home}>
      <Container maxWidth="lg">
        <CatNavigation />
        <Typography variant="h2" align="center" className={classes.heading}>Main Page</Typography>
        <div className={classes.gridContainer}>
          <Grid container spacing={1} wrap="wrap">
            {mainposts.map((p, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <Post
                  id={p._id}
                  title={p.title}
                  desc={p.desc}
                  photo={p.photo}
                  date={p.createdAt}
                  author={p.author}
                  likes={p.likes}
                />
              </Grid>
            ))}
          </Grid>
        </div>

      </Container>
    </div>
  )
}
