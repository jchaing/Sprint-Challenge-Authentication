import React, { useContext } from 'react';
import axios from 'axios';
import { Container, Form, Input, Button } from 'reactstrap';

// Contexts
import { LoginContext } from '../contexts/LoginContext';

const Register = props => {
  const { credentials, setCredentials } = useContext(LoginContext);

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = e => {
    e.preventDefault();
    axios
      .post('http://localhost:3300/api/auth/register', credentials)
      .then(res => {
        console.log('Register', res);
        localStorage.setItem('token', res.data.password);
        localStorage.setItem('user_id', credentials.username);
        setCredentials({ username: '', password: '' });
        props.history.push('/jokelist');
      })
      .catch(err => console.log(err));
  };
  console.log(credentials);
  return (
    <>
      <h2 className="mt-4">Register for an Account</h2>
      <Container className="w-25 mt-5">
        <Form onSubmit={registerUser}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button color="success" className="mt-3">
            Create account
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
