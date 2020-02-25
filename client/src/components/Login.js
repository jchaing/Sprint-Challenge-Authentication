import React, { useContext } from 'react';
import axios from 'axios';
import { Container, Form, Input, Button } from 'reactstrap';

import { LoginContext } from '../contexts/LoginContext';

const Login = props => {
  const { credentials, setCredentials } = useContext(LoginContext);

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    axios
      .post('http://localhost:3300/api/auth/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_id', credentials.username);
        setCredentials({ username: '', password: '' });
        props.history.push('/jokelist');
        // props.history.goBack();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h2 className="mt-4">Welcome to the Login Page</h2>
      <Container className="w-25 mt-5">
        <Form className="" onSubmit={login}>
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
          <div>
            <div>
              <Button color="primary" className="mt-3">
                Login
              </Button>
            </div>
            <div>
              <Button
                color="success"
                className="mt-5"
                onClick={() => props.history.push('/register')}
              >
                Need an account? Click here
              </Button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
