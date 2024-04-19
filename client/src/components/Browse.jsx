import { useState } from 'react';
import { makeStyles, Paper, Typography, Card, CardContent, IconButton, TextField, Button, Select, MenuItem, FormControl, InputLabel, List, ListItem, ListItemText } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../utils/queries';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
import { GET_USER } from '../utils/queries';
import Auth from '../utils/auth';

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
  const [user, setUser] = useState({});

  const [saveComment] = useMutation(ADD_COMMENT);

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

  useQuery(GET_USER, {
    variables: { username: Auth.getProfile().data.username },
    onCompleted: (data) => {
      setUser(data.user);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleCommentSubmit = (post) => async (e) => {
    e.preventDefault();
    const commentBody = e.target[0].value;
    await saveComment({
      variables: {
        postId: post._id,
        body: commentBody,
        username: user.username,
      },
      onCompleted: (data) => {
        console.log(data);
        e.target[0].value = '';
      },
      onError: (error) => {
        console.error(error);
      },
    });
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
            <form onSubmit={handleCommentSubmit(post)}>
              <TextField
                className={classes.commentField}
                variant="outlined"
                fullWidth
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
            <Typography variant="body2" component="div" className={classes.commentSection}>
            <Typography variant="h6">Comments</Typography>
            {post.comments.map((comment, index) => (
              <List key={index}>
              <ListItem>
                <ListItemText primary={comment.username} />
                <ListItemText primary={comment.body} />
              </ListItem>
              </List>
              ))}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Paper>
  );
};

export default Browse;