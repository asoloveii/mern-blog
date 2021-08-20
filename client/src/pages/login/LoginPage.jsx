import { Button, Container, FormControl, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { loginThunk } from '../../store/authReducer'

const useStyles = makeStyles({
  input: {
    margin: '20px 0'
  },
  button: {
    width: "50%",
    margin: "auto",
    marginTop: "20px"
  },
  loginDesc: {
    maxWidth: "500px",
    margin: "auto",
    color: "gray"
  }
})

export default function LoginPage() {
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault()
    dispatch(loginThunk(email, password))
  }

  return (
    <div className="register">
      <Container maxWidth="sm">
        <Typography variant="h4" align="center">Login</Typography>
        <Typography variant="h6" align="center" className={classes.loginDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ratione, fugiat dignissimos aliquam vel aliquid alias earum eum ipsum eos necessitatibus quas possimus expedita. Voluptatem eius nam eveniet id voluptates. </Typography>
        <FormControl fullWidth onSubmit={handleSubmit}>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            label="Email"
            type="email"
            className={classes.input}
            fullWidth />
          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            variant="outlined"
            label="Password"
            className={classes.input} />

          <Button onClick={handleSubmit} variant="contained" type="submit" size="large" className={classes.button}>Login</Button>
        </FormControl>
        <Typography align="center" style={{ marginTop: "20px" }}>Don't have an account? <Link to="/register" style={{ color: "black" }}>Register</Link></Typography>
      </Container>
    </div>
  )
}
