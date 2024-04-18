import { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, List, ListItem, ListItemText, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../utils/queries';

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
  categoryHeader: {
    color: '#3f51b5', // Change this to your preferred color
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  browseHeader: {
    color: '#3f51b5', // Change this to your preferred color
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
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

  // logs posts for testing can remove when done
  useEffect(() => {
    console.log(posts);
  }, [posts]);

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
    </Paper>
  );
};

export default Browse;