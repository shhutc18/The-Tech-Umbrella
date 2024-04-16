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

const Homepage = () => {
  const classes = useStyles();

  // Replace with actual data
  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const posts = ['Post 1', 'Post 2', 'Post 3'];

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5">
        Homepage
      </Typography>
      {categories.map((category, index) => (
        <div className={classes.section} key={index}>
          <Typography variant="h6" gutterBottom>
            Most liked posts in {category}
          </Typography>
          <List>
            {posts.map((post, index) => (
              <ListItem key={index}>
                <ListItemText primary={post} />
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </Paper>
  );
};

export default Homepage;