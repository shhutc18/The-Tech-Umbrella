import { useEffect, useState } from 'react';
import { makeStyles, Paper, Typography, Card, CardContent, IconButton, List, ListItem, ListItemText, TextField, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import Auth from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '15px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
  },
  section: {
    marginTop: theme.spacing(4),
    width: '100%',
  },
  postCard: {
    marginTop: theme.spacing(2),
  },
  postHeader: {
    color: 'darkblue',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  card: {
    marginTop: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
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
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});

  useQuery(GET_USER, {
    variables: { username: Auth.getProfile().data.username },
    onCompleted: (data) => {
      setUser(data.user);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleCommentSubmit = (post) => (event) => {
    event.preventDefault();
    // handle comment submission
  };

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5">
        Welcome, {user.username}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Here are your posts. Feel free to interact with them!
      </Typography>
      <div className={classes.section}>
        {user.posts && user.posts.map((post, index) => (
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
};

export default Profile;