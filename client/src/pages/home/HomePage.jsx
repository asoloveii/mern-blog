import React, { useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../../components/post/Post'
import { setPostsThunk } from './../../store/postsReducer'

const useStyles = makeStyles({
  heading: {
    margin: "10px 0"
  }
})

export default function HomePage() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPostsThunk())
  }, [dispatch])

  const posts = useSelector(state => state.posts.posts)

  return (
    <div>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" className={classes.heading}>Main Page</Typography>
        <div className="posts">
          {posts.map((p, index) => (
            <Post key={index} id={p._id} title={p.title} desc={p.desc} photo={p.photo} />
          ))}
        </div>
      </Container>
    </div>
  )
}
