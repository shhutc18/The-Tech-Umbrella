import { makeStyles, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, InputLabel, FormControl, Card, CardContent, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER, GET_ANONYMOUS_POSTS } from '../utils/queries';
import { ADD_POST, ADD_COMMENT } from '../utils/mutations';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(218, 159, 245, 0.9)',
  },
  section: {
    marginTop: theme.spacing(4),
    width: '100%',
  },
  createPostButton: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    padding: theme.spacing(2),
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#3f51b5',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  categoryHeader: {
    color: '#3f51b5',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  card: {
    marginTop: theme.spacing(2),
  },
  likeButton: {
    color: 'red',
  },
  commentSection: {
    marginTop: theme.spacing(2),
  },
  commentForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
}));

const Homepage = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [savePost] = useMutation(ADD_POST);
  const [saveComment] = useMutation(ADD_COMMENT);

  const handlePostDialogOpen = () => {
    setOpen(true);
  };

  const handlePostDialogClose = () => {
    setOpen(false);
  };

  // handle post creation
  const handleSave = async () => {
    try {
      const userId = Auth.getProfile().data._id;
      await savePost({
        variables: {
          userId: userId,
          title: title,
          body: body,
          category: category,
        },
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

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

  const categories = ['Software', 'Hardware', 'Coding'];

  useQuery(GET_USER, {
    variables: { username: Auth.getProfile().data.username },
    onCompleted: (data) => {
      setUser(data.user);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useQuery(GET_ANONYMOUS_POSTS, {
    onCompleted: (data) => {
      let posts = data.anonymousBrowse;
      setPosts(posts);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Paper className={classes.paper}>
      <Button variant="contained" color="primary" className={classes.createPostButton} onClick={handlePostDialogOpen}>
      Create Post
      </Button>
      {/* Create Post Dialog */}
      <Dialog open={open} onClose={handlePostDialogClose}>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
        autoFocus
        margin="dense"
        label="Title"
        type="text"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
        margin="dense"
        label="Body"
        type="text"
        fullWidth
        value={body}
        onChange={(e) => setBody(e.target.value)}
        />
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
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handlePostDialogClose} color="primary">
        Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
        Save
        </Button>
      </DialogActions>
      </Dialog>
      {/* Browsing Posts */}
      <Typography component="h1" variant="h5" className={classes.welcomeText}>
      Welcome to The Tech Umbrella! Explore all blog posts here.
      </Typography>
      <div style={{ width: '85%' }}>
      {posts.length > 0 && posts.map((post, index) => (
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
          <Typography variant="body2" color="textSecondary">
          Author: {post.author}
          </Typography>
          <IconButton className={classes.likeButton}>
          <FavoriteIcon />
          </IconButton>
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
            <form className={classes.commentForm} onSubmit={handleCommentSubmit(post)}>
              <TextField label="New Comment" className={classes.commentInput} />
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
          </Typography>
        </CardContent>
      </Card>
    ))}
    </div>
  </Paper>
  );
}

export default Homepage;