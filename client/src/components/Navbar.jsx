import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import Auth from '../utils/auth';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: 'yellow', // change color
    fontFamily: 'Courier New', // change font
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  specialLink: {
    color: 'yellow', // change color
    textDecoration: 'none',
    fontFamily: 'Courier New', // change font
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const [user, setUser] = useState({});

  useEffect(() => {
    if (Auth.loggedIn()) {
      const token = decode(Auth.getToken());
      setUser(token.data);
    } else {
      console.log('User is not logged in: navbar');
    }
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <RouterLink to="/" className={classes.specialLink}>The Tech Umbrella</RouterLink>
          </Typography>
          <Button color="inherit">
            <RouterLink to="/Browse" className={classes.link}>Browse</RouterLink>
          </Button>
          <Button color="inherit">
            <RouterLink to="/" className={classes.link}>Home</RouterLink>
          </Button>
          {!user.username && 
            <Button color="inherit">
              <RouterLink to="/Login" className={classes.link}>Sign In</RouterLink>
            </Button>
          }
          {!user.username &&
            <Button color="inherit">
              <RouterLink to="/Register" className={classes.link}>Register</RouterLink>
            </Button>
          }
          {user.username && 
            <Button color="inherit">
              <RouterLink to="/Profile" className={classes.link}>My Profile</RouterLink>
            </Button>
          }
          {user.username && 
            <Button color="inherit" className={classes.link} onClick={() => Auth.logout()}>Logout</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
