import { makeStyles, Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import decode from 'jwt-decode';
import { useEffect, useState } from 'react';

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
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token && token !== 'undefined') {
      const decoded = decode(token);
      setUser(decoded);
    } else {
      const anonUser = {
        username: 'Anonymous',
        email: 'Anonymous',
      };
      setUser(anonUser);
    }
    console.log(user);
  }, []);


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