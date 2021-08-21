import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import { format } from "timeago.js"
import { Link } from "react-router-dom"

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
  }
})

export default function Post({ title, desc, photo, id, author, date }) {
  const classes = useStyles()

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
          <Typography>{format(date, 'en_US')}</Typography>
          <Typography className={classes.cardDesc} variant="body1" component="p" >{desc}</Typography>
          <Link to={`/users/${author}`} className="link"><Typography color="primary">@{author}</Typography></Link>
        </CardContent>
        <CardActions>

          <Button color="primary">
            <Link to={`/posts/${id}`} style={{ color: "inherit", textDecoration: "none" }}>Read more</Link>
          </Button>
        </CardActions>
      </Card>
    </>
  )
}
