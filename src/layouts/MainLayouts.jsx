import React, { useContext } from 'react';
import Home from '../pages/Home';
import { AuthContext } from '../provider/AuthProvider';
import Login from '../pages/Login';
import Navbar from '../components/Navbar';

const MainLayouts = () => {
     const { user } = useContext(AuthContext);
     return (
        <div>
            <Navbar></Navbar>
          {!user && <Login></Login>} 
          {user && <Home></Home>}
        </div>
      );
    };
    

export default MainLayouts;