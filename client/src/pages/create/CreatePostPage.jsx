import { Button, Container, FormControl, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import { useDispatch, useSelector } from 'react-redux'
import { createPostThunk } from '../../store/postsReducer'

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

  useEffect(() => {
    const fetchCats = async () => {
      try {
        let res = await axios.get("/categories")
        setCategories(res.data)
      } catch (e) {
        setError(e.message)
      }
    }
    fetchCats()
  }, [])

  function handleSubmit(e) {
    // e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("author", author)
    formData.append("desc", desc)
    formData.append("category", category)
    formData.append("postPhoto", postPhoto)

    dispatch(createPostThunk(formData))
    history.push('/')
  }

  return (
    <div>
      <Container maxWidth="sm" className={classes.container}>
        {error && <Typography variant="h5" color="secondary">{error}</Typography>}
        <FormControl fullWidth onSubmit={handleSubmit}>
          <label htmlFor="postPhoto" style={{ alignSelf: "center" }}>
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
        </FormControl>
      </Container>
    </div>
  )
}
