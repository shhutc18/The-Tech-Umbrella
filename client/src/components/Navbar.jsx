import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <RouterLink to="/Home" className={classes.specialLink}>The Tech Umbrella</RouterLink>
          </Typography>
          <Button color="inherit">
            <RouterLink to="/Login" className={classes.link}>Sign In</RouterLink>
          </Button>
          <Button color="inherit">
            <RouterLink to="/Register" className={classes.link}>Register</RouterLink>
          </Button>
          <Button color="inherit">
            <RouterLink to="/Profile" className={classes.link}>My Profile</RouterLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
