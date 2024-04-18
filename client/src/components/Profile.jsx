import React from 'react';
import { makeStyles, Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    marginTop: theme.spacing(4),
    width: '100%',
  },
}));

const Profile = () => {
  const classes = useStyles();

  // Replace with actual data
  const friends = ['Friend 1', 'Friend 2', 'Friend 3'];
  const posts = ['Post 1', 'Post 2', 'Post 3'];

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5">
        Current Profile: Logged In
      </Typography>
      <div className={classes.section}>
        <Typography variant="h6" gutterBottom>
          My Friends
        </Typography>
        <List>
          {friends.map((friend, index) => (
            <ListItem key={index}>
              <ListItemText primary={friend} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className={classes.section}>
        <Typography variant="h6" gutterBottom>
          My Posts
        </Typography>
        <List>
          {posts.map((post, index) => (
            <ListItem key={index}>
              <ListItemText primary={post} />
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  );
};

export default Profile;