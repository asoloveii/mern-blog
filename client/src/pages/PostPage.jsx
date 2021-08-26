import React, { useEffect, useState } from 'react'
import { Button, Container, FormControl, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { deletePostThunk, updatePostThunk } from '../store/postsReducer'
import axios from 'axios'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'

const useStyles = makeStyles({
  post: {
    margin: "70px 80px"
  },
  img: {
    width: "100%",
    height: "440px",
    borderRadius: "10px"
  },
  wrapper: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  likes: {
    margin: "0 10px"
  },
  desc: {
    margin: "20px 0"
  },
  inputDesc: {
    margin: "20px 0"
  },
  inputTitle: {
    margin: "10px 0"
  },
  selectCategory: {
    maringTop: "20px"
  },
  photo: {
    position: "relative"
  },
  photoIcon: {
    cursor: "pointer",
    position: "absolute",
    bottom: "220px",
    left: "48%",
    color: "white"
  }
})

export default function PostPage({ match, history }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const post = useSelector(state => state.posts.posts).filter(p => p._id === match.params.postId)[0]
  const [editMode, setEditMode] = useState(false)
  const [categories, setCategories] = useState([])

  const [title, setTitle] = useState(post.title)
  const [desc, setDesc] = useState(post.desc)
  const [category, setCategory] = useState(post.category)
  const [photo, setPhoto] = useState(post.photo)

  useEffect(() => {
    const fetchCats = async () => {
      try {
        let res = await axios.get("/categories/")
        setCategories(res.data)
      } catch (e) {
        alert(e)
      }
    }
    fetchCats()
  }, [])

  const handleDelete = () => {
    dispatch(deletePostThunk(post._id, post.author))
    history.push('/')
  }

  const handleUpdate = () => {
    const formData = new FormData()

    formData.append("title", title)
    formData.append("desc", desc)
    formData.append("category", category)
    formData.append("photo", photo)

    dispatch(updatePostThunk(post._id, formData, post.author))
  }

  return (
    <div className={classes.post}>
      <Container maxWidth="md">
        <FormControl fullWidth encType="multipart/form-data">
          <label htmlFor="photo" className={classes.photo} onChange={e => setPhoto(e.target.files[0])}>
            {editMode && <PhotoCameraIcon className={classes.photoIcon} />}
            <img src={`/uploads/${post.photo}`} alt="post" className={classes.img} />
          </label>
          <TextField filename="photo" onChange={e => setPhoto(e.target.files[0])} type="file" style={{ display: "none" }} id="photo" />
          <div className={classes.wrapper}>
            <div>
              <Link to={`/users/${post.author}`} className="link">
                <Typography variant="h6" color="primary">@{post.author}</Typography>
              </Link>
              {
                !editMode
                  ? <Typography variant="h5" >{post.title}</Typography>
                  : <TextField fullWidth className={classes.inputTitle} value={title} onChange={e => setTitle(e.target.value)} />
              }
              {editMode ? (
                <Select
                  onChange={e => setCategory(e.target.value)}
                  value={category}
                  variant="outlined"
                  className={classes.selectCategory}
                >
                  {categories.map((cat, index) => (
                    <MenuItem key={index} value={cat.name}>{cat.name}</MenuItem>
                  ))}
                </Select>
              ) : (
                <Typography variant="subtitle1" style={{ color: "gray" }} >{post.category}</Typography>
              )}
            </div>
            <div>
              {post.author === user.username ? (
                <>
                  <Button color="primary" onClick={e => setEditMode(!editMode)}>
                    <EditIcon />
                  </Button>
                  <Button color="secondary" onClick={handleDelete}>
                    <DeleteIcon />
                  </Button>
                </>
              ) : (
                <Button color="secondary">
                  {post.likes.includes(user._id) ? <FavoriteIcon /> : <FavoriteBorder />}
                  <Typography variant="h6" className={classes.likes}>{post.likes.length}</Typography>
                </Button>
              )}
            </div>
          </div>
          {editMode ? (
            <TextField
              value={desc}
              className={classes.inputDesc}
              multiline
              rows={10}
              onChange={e => setDesc(e.target.value)}
              fullWidth
              variant="filled"
            />
          ) : (
            <Typography variant="body1" className={classes.desc}>{post.desc}</Typography>
          )}
          <div className={classes.wrapper}>
            <Typography variant="subtitle1" style={{ color: "gray" }} >{format(post.createdAt, 'en_US')}</Typography>

            {editMode && <Button variant="outlined" onClick={handleUpdate} color="primary">Update</Button>}
          </div>
        </FormControl>

      </Container>
    </div>
  )
}
