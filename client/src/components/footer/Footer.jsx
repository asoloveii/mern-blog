import React from 'react'
import './footer.scss'
import { Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    color: "white",
    maxWidth: "700px",
    margin: "auto"
  },
  footerHeading: {
    color: "white"
  }
})

export default function Footer() {
  const classes = useStyles()

  return (
    <div className="footer">
      <Container>
        <Typography variant="h4" align="center" className={classes.footerHeading}>Footer</Typography>
        <Typography align="center" className={classes.text} >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita exercitationem error, dignissimos doloremque unde odit voluptate!</Typography>
      </Container>
    </div>
  )
}
