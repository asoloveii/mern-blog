import { Container, CssBaseline, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import "./catnavigation.scss"
import axios from "axios"

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  link: {
    fontSize: "16px"
  }
})

export default function CatNavigation() {
  const classes = useStyles()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCats = async () => {
      try {
        let res = await axios.get("/categories/")
        setCategories(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchCats()
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container}>
      <CssBaseline />
      {categories.map((cat, index) => (
        <Link key={index} to={`?cat=${cat.name}`} className="link">
          <Typography variant="h6" className={classes.link}>{cat.name}</Typography>
        </Link>
      ))}
    </Container>
  )
}
