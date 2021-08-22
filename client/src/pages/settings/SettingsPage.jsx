import React, { useState } from 'react'
import { Button, Container, FormControl, makeStyles, TextField } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { updateUserThunk } from '../../store/authReducer';

const useStyles = makeStyles({
  settings: {
    margin: "100px 0",
    textAlign: "center"
  },
  profilePic: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "50%",
    cursor: "pointer"
  },
  input: {
    margin: "10px 0",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  age: {
    width: "80px"
  },
  button: {
    height: "55px"
  }
})

export default function SettingsPage() {
  const user = useSelector(state => state.auth.user)
  const classes = useStyles()
  const dispatch = useDispatch()
  const [profilePic, setProfilePic] = useState(user.profilePic)
  const [username, setUsername] = useState(user.username)
  const [firstname, setFirstname] = useState(user.firstname)
  const [secondname, setSecondname] = useState(user.secondname)
  const [age, setAge] = useState(user.age)
  const [desc, setDesc] = useState(user.desc)

  const handleSubmit = () => {
    const formData = new FormData()

    formData.append("profilePic", profilePic)
    formData.append("username", username)
    formData.append("firstname", firstname)
    formData.append("secondname", secondname)
    formData.append("age", age)
    formData.append("desc", desc)

    try {
      dispatch(updateUserThunk(user._id, formData))
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className={classes.settings}>
      <Container maxWidth="md">
        <FormControl encType="multipart/form-data">
          <label htmlFor="profilePic">{
            profilePic
              ? <img src={`/uploads/${user.profilePic}`} alt="profile" className={classes.profilePic} />
              : <img src='/images/profileDefault.jpg' alt="profile" className={classes.profilePic} />
          }</label>
          <TextField
            type="file"
            id="profilePic"
            align="center"
            style={{ display: "none" }}
            onChange={e => setProfilePic(e.target.files[0])}
          />
          <TextField
            label="Username"
            value={username}
            variant="outlined"
            fullWidth
            className={classes.input}
            onChange={e => setUsername(e.target.value)}
          />
          <div className={classes.wrapper}>
            <TextField
              label="First name"
              value={firstname}
              variant="outlined"
              fullWidth
              className={classes.input}
              onChange={e => setFirstname(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Second name"
              value={secondname}
              variant="outlined"
              fullWidth
              className={classes.input}
              onChange={e => setSecondname(e.target.value)}
            />
          </div>
          <TextField
            label="Description"
            value={desc}
            variant="outlined"
            fullWidth
            className={classes.input}
            onChange={e => setDesc(e.target.value)}
            rows={6}
            multiline
          />
          <div className={classes.wrapper}>
            <TextField
              label="Age"
              value={age}
              variant="outlined"
              className={`${classes.input} ${classes.age}`}
              onChange={e => setAge(e.target.value)}
            />
            <Button onClick={handleSubmit} className={classes.button}>Update</Button>
          </div>
        </FormControl>
      </Container>
    </div>
  )
}
