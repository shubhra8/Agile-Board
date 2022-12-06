import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { USER_BOARDS } from '../utils/queries';
import BoardList from '../components/BoardList';

function Home() {
  const { loading, data } = useQuery(USER_BOARDS);
  console.log(data);


  const userBoards = data?.userBoards || [];

  return (

    <main className="flex-row mb-4">

      {Auth.loggedIn() ? (
        <>
        <h3 className='text-white'>Welcome! {userBoards.username}</h3>
        <div className='w-100'>
          <div >
            <Link className='btn btn-lg btn-light m-2' to="/board">
              <span > Create Board </span>
            </Link>
          </div>
          {loading ? (
            <div> Loading...</div>
          ) : (

            <BoardList boards={userBoards.boards} />

          )}
        </div>
        </>
      ) : (
        <div className='landingPage'>
          <p className='LandingTitle'>Planning                       <span className='titleEmphasis'>simplified</span></p>
          <p className='LandingMessage'> Build, plan and manage projects from the ground up with our boards. Development awaits,                <span>Sign up or login to get started.</span> </p>
          <img className='LandingImage' src='https://api.beaconagency.co.uk/wp-content/uploads/2021/03/bigtechauth-e1616501916204.png' width={600} height={500}></img>
        </div>
      )}

    </main>
  );
};

export default Home;
