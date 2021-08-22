import React, { useEffect } from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../../components/post/Post'
import { setPostsThunk } from './../../store/postsReducer'
import CatNavigation from './../../components/catnavigation/CatNavigation'
import "./homepage.scss"
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  heading: {
    margin: "10px 0"
  },
  gridContainer: {
    flexGrow: 1
  }
})

export default function HomePage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const location = useLocation()
  const category = location.search.split("=")[1]

  useEffect(() => {
    dispatch(setPostsThunk())
  }, [dispatch])

  const posts = useSelector(state => state.posts.posts)
  const catPosts = posts.filter(p => p.category === category)
  const mainposts = category ? catPosts : posts

  return (
    <div className="home">
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
