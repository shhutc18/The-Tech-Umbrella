import React, { useState } from 'react';
import { makeStyles, Paper, Typography, Button, Menu, MenuItem, Card, CardContent } from '@material-ui/core';

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
  postCard: {
    marginTop: theme.spacing(2),
  },
  postHeader: {
    color: 'darkblue',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const Profile = ({ username }) => {
  const classes = useStyles();

  // Replace with actual data
  const friends = ['Friend 1', 'Friend 2', 'Friend 3'];
  const posts = ['Post 1', 'Post 2', 'Post 3'];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5">
        Welcome, {username}
      </Typography>
      <div className={classes.section}>
        <Button color="primary" variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          My Friends
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {friends.map((friend, index) => (
            <MenuItem onClick={handleClose} key={index}>
              {friend}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className={classes.section}>
        <Typography variant="h6" gutterBottom className={classes.postHeader}>
          - Take a look at your most recent posts - 
        </Typography>
        {posts.map((post, index) => (
          <Card key={index} className={classes.postCard}>
            <CardContent>
              <Typography variant="body1">
                {post}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Paper>
  );
};

export default Profile;