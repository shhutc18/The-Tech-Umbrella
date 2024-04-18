import { useState } from 'react';
import { Button, TextField, Paper, Typography, makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(218, 159, 245, 0.9)',
  },
  form: {
    width: '70%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Logging in user:', email);
    console.log(':', password);
  };

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form className={classes.form} onSubmit={handleLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Login
        </Button>
      </form>
      <Typography variant="body2" color="textSecondary" align="center">
        New to The Tech Umbrella? <a href="/register">Register here!</a>
      </Typography>
    </Paper>
  );
};

export default Login;