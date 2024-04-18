import { useState } from 'react';
import { Button, TextField, Paper, Typography, makeStyles } from '@material-ui/core';

import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Translucent box
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Check if userFormData contains username, email, and password
    if (!userFormData.username || !userFormData.email || !userFormData.password) {
      console.error('Username, email, and password are required');
      setShowAlert(true);
      return;
    }

    try {
      const response = await addUser({
        variables: {
          username: userFormData.username.toString(),
          email: userFormData.email.toString(),
          password: userFormData.password.toString(),
        },
      });
      console.log(response.data);

      Auth.login(response.data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Typography variant="body1" gutterBottom>
        Ready to start posting? Please fill out the form below to create a new account.
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleFormSubmit} >
        <Typography variant="body1" gutterBottom>
          {showAlert ? '🚨 Something went wrong with your registration!' : ''}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={userFormData.email}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={userFormData.username}
          onChange={handleInputChange}
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
          value={userFormData.password}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          className={classes.submit}
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default Register;