import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth-context';

import Button from '../UI/button';

import styles from './home.module.scss';

const HomePage: React.FC = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  let comingUser: string;

  currentUser ? (comingUser = currentUser) : (comingUser = 'Guest');

  const logginOut = async () => {
    try {
      await logout();
      navigate('/Login');
    } catch (error: any) {
      alert(error.message);
    }
  };
  console.log(currentUser);

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <p>Welcome {comingUser}</p>
      {currentUser && <Button onClick={logginOut}> Logout </Button>}
    </div>
  );
};

export default HomePage;
