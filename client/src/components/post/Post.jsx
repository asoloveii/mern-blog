import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import FavoriteIcon from '@material-ui/icons/Favorite'
import { useSelector } from 'react-redux'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { useDispatch } from 'react-redux';
import { likePostThunk } from './../../store/postsReducer';

const useStyles = makeStyles({
  card: {
    margin: "10px"
  },
  cardDesc: {
    overflow: 'hidden',
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    margin: "10px 0"
  },
  media: {
    height: "240px"
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between"
  }
})

export default function Post({ title, desc, photo, id, author, date, likes }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const [countLikes, setCountLikes] = useState(likes.length)

  const likePostHandler = () => {
    setCountLikes(likes.includes(user._id) ? countLikes - 1 : countLikes + 1)
    dispatch(likePostThunk(id, user._id))
  }

  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`/uploads/${photo}`}
          title={title}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>{title}</Typography>
          <Typography variant="subtitle1">{format(date, 'en_US')}</Typography>
          <Typography className={classes.cardDesc} variant="body1" component="p" >{desc}</Typography>
          <Link to={`/users/${author}`} className="link"><Typography color="primary">@{author}</Typography></Link>
        </CardContent>
        <CardActions>
          <div className={classes.wrapper}>
            <Button color="primary">
              <Link to={`/posts/${id}`} style={{ color: "inherit", textDecoration: "none" }}>Read more</Link>
            </Button>
            {user._id ? (
              <div>
                <Button color="secondary" onClick={likePostHandler}>
                  {likes.includes(user._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  <Typography variant="body1" color="secondary" style={{ margin: " 4px 10px" }}>
                    {countLikes}
                  </Typography>
                </Button>
              </div>
            ) : (
              <div>
                <Button color="secondary">
                  <FavoriteBorderIcon color="secondary" />
                  <Typography variant="body1" style={{ margin: " 4px 10px" }}>
                    {countLikes}
                  </Typography>
                </Button>
              </div>
            )}
          </div>
        </CardActions>
      </Card>
    </>
  )
}
