import React, { useState } from 'react';
import { makeStyles, Paper, Typography, List, ListItem, ListItemText, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

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
  const posts = ['Post 1', 'Post 2', 'Post 3'];

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
      {category && (
        <div>
          <Typography variant="h6" gutterBottom className={classes.categoryHeader}>
            Posts in: {category}
          </Typography>
          <List>
            {posts.map((post, index) => (
              <ListItem key={index}>
                <ListItemText primary={post} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Paper>
  );
};

export default Browse;