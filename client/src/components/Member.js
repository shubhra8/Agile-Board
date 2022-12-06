import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { VIEW_MEMBER } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'
//const [member, setMember] = useState(false);


function Member({boardId}){
//  const { boardParam } = useParams();

 const { loading, data } = useQuery(VIEW_MEMBER, {
        variables: { boardId: boardId },
    });
        console.log(data); 

   const boardmember = data?.boardMember || [];


 return (
    
    <main className="flex-row mb-4">
      

        {/* {Auth.loggedIn() ? ( */}
          <div className='w-100'>
            <h3>Team Members</h3>
            {loading ? (
              <div> Loading...</div>
            ) : <div className='flex-column justify-space-between'>
          {
           boardmember.map((board) => (
            <><h4><FaUserCircle /> {(board.username)}</h4></>

            ))}
          </div>
}
          </div>
        
    
    </main>
  );
};

export default Member;
