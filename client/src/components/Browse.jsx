import { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, Card, CardContent, IconButton, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../utils/queries';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(218, 159, 245, 0.9)',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  browseHeader: {
    color: '#3f51b5',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  card: {
    marginTop: theme.spacing(2),
  },
  commentField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginBottom: theme.spacing(2),
  },
  liked: {
    color: 'red',
  },
}));

const Browse = () => {
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const categories = ['Software', 'Hardware', 'Coding'];
  const [posts, setPosts] = useState([]);

  useQuery(GET_CATEGORY, {
    variables: { category },
    onCompleted: (data) => {
      let posts = data.category;
      setPosts(posts);
    },
    onError: (error) => {
      console.error(error);
    },
  }, [category]);

  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the comment submission logic
    console.log(comment);
    setComment('');
  };

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.browseHeader}>
        Welcome to The Tech Umbrella! Select a category to browse posts.
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <MenuItem value={category} key={index}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {posts.map((post, index) => (
        <Card className={classes.card} key={index}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography color="textSecondary">
              {post.category}
            </Typography>
            <Typography variant="body2" component="p">
              {post.body}
            </Typography>
            <IconButton className={classes.likeButton} onClick={handleLike}>
              <FavoriteIcon className={liked ? classes.liked : ''} />
            </IconButton>
            <form onSubmit={handleCommentSubmit}>
              <TextField
                className={classes.commentField}
                variant="outlined"
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                label="Add a comment"
              />
              <Button
                className={classes.submitButton}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      ))}
    </Paper>
  );
};

export default Browse;