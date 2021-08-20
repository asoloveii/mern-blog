import { Button, Container, FormControl, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.scss'
import { Input } from '@material-ui/core';
import { registerAPI } from '../../api/api';

const useStyles = makeStyles({
  input: {
    margin: '20px 0'
  },
  button: {
    width: "50%",
    margin: "auto",
    marginTop: "20px"
  },
  desc: {
    width: "70%"
  },
  age: {
    width: "27%"
  },
  profilePic: {
    margin: "auto",
    fontSize: "20px"
  }
})

export default function RegisterPage({ history }) {
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [firstname, setFirstname] = useState("")
  const [secondname, setSecondname] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpass, setConfirmpass] = useState("")
  const [age, setAge] = useState(0)
  const [desc, setDesc] = useState("")
  const [username, setUsername] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    if (password !== confirmpass) {
      setError("Invalid passwords")
    }

    const formdata = new FormData()
    formdata.append("email", email)
    formdata.append("password", password)
    formdata.append("firstname", firstname)
    formdata.append("secondname", secondname)
    formdata.append("age", age)
    formdata.append("desc", desc)
    formdata.append("username", username)
    formdata.append("profilePic", profilePic)

    try {
      await registerAPI(formdata)
    } catch (e) {
      setError(e.message)
    }

    history.push("/login")
  }

  return (
    <div className="register">
      <Container maxWidth="sm">
        {error && <Typography>{error}</Typography>}
        <Typography variant="h4" align="center">Register</Typography>
        <FormControl fullWidth onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="profilePic">
            {profilePic ? (
              <img
                src={profilePic}
                className={classes.profilePic}
                alt="profile"
              />
            ) : (
              <img src="/images/profileDefault.jpg" alt="profile" className="profilePic" />
            )}

          </label>
          <Input
            onChange={e => setProfilePic(e.target.files[0])}
            type="file"
            id="profilePic"
            style={{ display: "none" }} />
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            label="Email"
            type="email"
            className={classes.input}
            fullWidth />
          <TextField
            value={username}
            onChange={e => setUsername(e.target.value)}
            variant="outlined"
            label="Username"
            className={classes.input}
            fullWidth />
          <div className="register__wrapper">
            <TextField
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              style={{ marginRight: "15px" }}
              variant="outlined"
              label="First name"
              className={classes.input} fullWidth />
            <TextField
              value={secondname}
              onChange={e => setSecondname(e.target.value)}
              variant="outlined"
              label="Second name"
              className={classes.input} fullWidth />
          </div>
          <div>
            <TextField
              value={desc}
              onChange={e => setDesc(e.target.value)}
              style={{ marginRight: "15px" }}
              variant="outlined" label="Tell about yourself"
              className={`${classes.input} ${classes.desc}`}
            />
            <TextField
              value={age}
              onChange={e => setAge(e.target.value)}
              variant="outlined" label="Age"
              className={`${classes.input} ${classes.age}`} />
          </div>
          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            variant="outlined"
            label="Password"
            className={classes.input} />
          <TextField
            value={confirmpass}
            onChange={e => setConfirmpass(e.target.value)}
            type="password"
            variant="outlined"
            label="Confirm assword"
            className={classes.input} />
          <Button variant="contained" onClick={handleSubmit} size="large" className={classes.button}>Register</Button>
        </FormControl>
        <Typography align="center" style={{ marginTop: "20px" }}>Already have an account? <Link to="/login" style={{ color: "black" }}>Login</Link></Typography>
      </Container>
    </div>
  )
}
