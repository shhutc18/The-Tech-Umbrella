import { useEffect, useState } from 'react';
import { makeStyles, Paper, Typography, Button, Menu, MenuItem, Card, CardContent } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import Auth from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
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

const Profile = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [posts, setPosts] = useState([]);
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    

  return (
    <>
      <h1>Profile</h1>
    </>
    // <Paper className={classes.paper}>
    //   <Typography component="h1" variant="h5">
    //     Welcome, {username}
    //   </Typography>
    //   <div className={classes.section}>
    //     <Button color="primary" variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
    //       My Friends
    //     </Button>
    //     <Menu
    //       id="simple-menu"
    //       anchorEl={anchorEl}
    //       keepMounted
    //       open={Boolean(anchorEl)}
    //       onClose={handleClose}
    //     >
    //       {friends.map((friend, index) => (
    //         <MenuItem onClick={handleClose} key={index}>
    //           {friend}
    //         </MenuItem>
    //       ))}
    //     </Menu>
    //   </div>
    //   <div className={classes.section}>
    //     <Typography variant="h6" gutterBottom className={classes.postHeader}>
    //       - Take a look at your most recent posts - 
    //     </Typography>
    //     {posts.map((post, index) => (
    //       <Card key={index} className={classes.postCard}>
    //         <CardContent>
    //           <Typography variant="body1">
    //             {post}
    //           </Typography>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </div>
    // </Paper>
  );
};

export default Profile;