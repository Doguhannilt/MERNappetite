import { useAuth0 } from '@auth0/auth0-react'
import axios, { Axios } from 'axios'
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const HeaderUsernameMenu = () => {
    const {user, logout, getAccessTokenSilently} = useAuth0()
    const {email,sub} = user
    const hasCreatedUser = useRef(false)
    console.log(getAccessTokenSilently)
    const token = getAccessTokenSilently()
    const header = {
      "Authorization" : `Bearer ${token}`
    }
    useEffect(() => {
      const fetchData = async () => {
          try {
              const token = await getAccessTokenSilently();
              const header = { "Authorization": `Bearer ${token}` };
              const response = await axios.post('http://localhost:7000/api/my/user', { email, sub }, { headers: header });
              console.log('User data sent successfully:', response.data);
          } catch (error) {
              console.error('Error sending user data:', error);
          }
      };

      if (email && sub && !hasCreatedUser.current) {
          fetchData();
          hasCreatedUser.current = true;
      }
  }, [email, sub, getAccessTokenSilently, hasCreatedUser]);



  return (
    <div>
        <details className="dropdown flex items-center px-3 font-bold ">
            <summary className="m-1 font-bold text-2xl font-sans ml-40 cursor-pointer">{user?.email}</summary>
            <ul className="p-2 ml-40 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li>
                    <Link to={`/user-profile/${user?.email}`} className='font-bold hover:text-red-400'>User Profile</Link>
                </li>
                <li>
                    <button onClick={() => logout({ returnTo: window.location.origin })} className='flex flex-1 font-bold bg-red-500'>
                        Log out
                    </button>
                </li>
            </ul>
        </details>
    </div>
);
}

export default HeaderUsernameMenu

