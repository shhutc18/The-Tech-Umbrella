import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Hidden } from '@material-ui/core';


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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

        <Hidden smDown>
        {user.username && 
          <Button color="inherit">
            <RouterLink to="/" className={classes.link}>Home</RouterLink>
          </Button>
        }
        {user.username && 
          <Button color="inherit">
            <RouterLink to="/Browse" className={classes.link}>Browse</RouterLink>
          </Button>
        }
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
        </Hidden>

        <Hidden mdUp>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <RouterLink to="/Browse" className={classes.link}>Browse</RouterLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RouterLink to="/" className={classes.link}>Home</RouterLink>
            </MenuItem>
            {!user.username && 
              <MenuItem onClick={handleClose}>
                <RouterLink to="/Login" className={classes.link}>Sign In</RouterLink>
              </MenuItem>
            }
            {!user.username &&
              <MenuItem onClick={handleClose}>
                <RouterLink to="/Register" className={classes.link}>Register</RouterLink>
              </MenuItem>
            }
            {user.username && 
              <MenuItem onClick={handleClose}>
                <RouterLink to="/Profile" className={classes.link}>My Profile</RouterLink>
              </MenuItem>
            }
            {user.username && 
              <MenuItem onClick={() => Auth.logout()}>
                Logout
              </MenuItem>
            }
          </Menu>
        </Hidden>
      </Toolbar>
    </AppBar>
  </div>
);
}

export default Navbar;
