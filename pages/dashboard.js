import React, { useContext, useEffect } from 'react';
import { UserContext } from './_app';
import { useRouter } from 'next/router';

const Dashboard = (props) => {
    const router = useRouter();
    const [user] = useContext(UserContext);

    useEffect(() => {
        if (!user.accesstoken) {
          router.push('/login')
        }
      }, [user])
// any time the [user] constant changes, runs the useEffect line
// Bc we don't have a user, we hit router.push to the login page

      const { firstName } = user; 

    return (
    <h1>Welcome back, {firstName}!</h1>
    ) 
};

export default Dashboard;