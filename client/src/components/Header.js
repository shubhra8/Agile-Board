import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillHouseFill } from 'react-icons/bs';
import { FiUserPlus } from 'react-icons/fi';
import { GoSignOut, GoSignIn } from 'react-icons/go';
import Auth from '../utils/auth';



const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [create, setCreate] = useState(false);
  const handleCreate = (e) => {
    setCreate(true);
  };

  return (
    <header className="p-3 mb-2 headercolor text-white"  >
      <div className="container flex-row justify-space-between-lg justify-center align-center" >
        <div>
          <h1 className="m-0" style={{ fontSize: '2.5rem' }} >
            Agile Board
          </h1>
          <p className="m-0"> Manage Your Project </p>

        </div>
        <div>
          {Auth.loggedIn() ? (
            <>

              <Link className="btn btn-lg btn-light m-2" to="/">
                <BsFillHouseFill />
              </Link>


              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                <GoSignOut />
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-light m-2" to="/login">
                <GoSignIn />
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                <FiUserPlus />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
