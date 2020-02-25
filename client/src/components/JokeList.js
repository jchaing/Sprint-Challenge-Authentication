import React, { useContext, useEffect } from 'react';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

// Contexts
import { JokeContext } from '../contexts/JokeContext';

// Authentication
import { axiosWithAuth } from '../axiosWithAuth';

const Dashboard = props => {
  const user_id = localStorage.getItem('user_id');
  const { jokes, setJokes } = useContext(JokeContext);

  useEffect(() => {
    axiosWithAuth()
      .get('http://localhost:3300/api/jokes')
      .then(res => {
        console.log('Dashboard res', res.data);
        setJokes(res.data.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)));
      })
      .catch(err => console.log(err));
  }, [setJokes]);


  console.log('List of jokes', jokes);
  console.log('Dashboard credentials', user_id);
  return (
    <Container className="w-75 mt-5">
      <h2>Welcome {user_id}</h2>
      <p>
        Here's your access to the full list of Dad Jokes
      </p>

      {jokes.map(joke => (
        <div key={joke.id}>{joke.joke} </div>
      ))}
    </Container>
  );
};

export default Dashboard;
