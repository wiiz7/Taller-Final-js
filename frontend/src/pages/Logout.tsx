import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.removeItem('username');
    navigate('/login');
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
