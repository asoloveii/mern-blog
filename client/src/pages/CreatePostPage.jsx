import { Button, Container, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import { useDispatch, useSelector } from 'react-redux'
import { createPostThunk } from '../store/postsReducer'

const useStyles = makeStyles({
  input: {
    marginBottom: "20px"
  },
  container: {
    marginTop: "100px",
    marginBottom: "100px"
  },
  fileIcon: {
    cursor: "pointer",
    marginBottom: "50px"
  }
})

export default function CreatePostPage({ history }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const author = useSelector(state => state.auth.user.username)
  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("")
  const [postPhoto, setPostPhoto] = useState("")

  const fetchCats = async () => {
    try {
      let res = await axios.get("/categories")
      setCategories(res.data)
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    fetchCats()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("author", author)
    formData.append("desc", desc)
    formData.append("category", category)
    formData.append("postPhoto", postPhoto)
    try {
      dispatch(createPostThunk(formData))
    } catch (e) {
      setError(e.message)
    }

    !error && history.push('/')
  }

  return (
    <div>
      <Container maxWidth="sm" className={classes.container}>
        {error && <Typography variant="h5" color="secondary">{error}</Typography>}
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <label htmlFor="postPhoto" >
            <PhotoCameraIcon className={classes.fileIcon} />
          </label>
          <TextField
            id="postPhoto"
            type="file"
            style={{ display: "none" }}
            onChange={e => setPostPhoto(e.target.files[0])}
          />
          <TextField
            className={classes.input}
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            multiline
            rows={12}
            className={classes.input}
            fullWidth
            label="Description"
            variant="outlined"
            value={desc}
            onChange={e => setDesc(e.target.value)} />
          <TextField
            select
            fullWidth
            variant="outlined"
            className={classes.input}
            label="Category"
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map((option, index) => (
              <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" onClick={handleSubmit}>Post</Button>
        </form>
      </Container>
    </div>
  )
}
