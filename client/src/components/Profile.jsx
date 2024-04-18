import { useEffect, useState } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
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

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5">
        Welcome, {user.username}
      </Typography>
    </Paper>
  );
};

export default Profile;