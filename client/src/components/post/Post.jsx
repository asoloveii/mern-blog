import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Link, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    maxWidth: "49%"
  }
})

export default function Post({ title, desc, photo, id }) {
  const classes = useStyles()

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`/uploads/${photo}`}
          title={title}
        />
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2">{desc}</Typography>
        </CardContent>
        <CardActions>
          <Button><Link to={`/posts/${id}`}>Read more...</Link></Button>
        </CardActions>
      </Card>
    </div>
  )
}
