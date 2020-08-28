import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './_app';
import { useRouter } from 'next/router'


const Login = () => {
   const [user, setUser] = useContext(UserContext);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const router = useRouter();

   // Will grab the token from our API
   const handleSubmit = async e => {
       e.preventDefault(); // want to handle sending form ourself
       const raw = await fetch('http://localhost:4000/login', {
           method: 'POST',
        //    credentials: 'include',
           headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*' 
           },
           body: JSON.stringify({
               email,
               password
           }),
       });
       const result = await raw.json();
       
       if (result.data) {
           setUser({
               accesstoken: result.data.accessToken,
               user: result.data.user,
               firstName: result.data.user.firstName,
           });
        //    navigate('/');
         router.push('/dashboard');
       } else {
           console.log(result.error);
       }
   };

   // When user changes, we create a dependency array with the user
   useEffect( () => {
       console.log(user);
   }, [user])

   // Allows us to type something into the input
   const handleChange = e => {
       if (e.currentTarget.name === 'email') {
           setEmail(e.currentTarget.value);
       } else {
           setPassword(e.currentTarget.value);
       }
   }

   return (
       <div className="login-wrapper">
           <form onSubmit={handleSubmit}>
               <h2>Login</h2>
               <div className="login-input">
                <input
                    value={email}
                    onChange={handleChange}
                    type="text"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                />
                <input
                    value={password}
                    onChange={handleChange}
                    type="text"
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                />
                <button type="submit">Login</button>

               </div>
               
           </form>

       </div>
   )

}


export default Login;