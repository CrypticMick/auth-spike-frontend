import React, {useState} from 'react';
import '../styles/globals.css'

export const UserContext = React.createContext([]);


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="app">
        <Component {...pageProps}/>
      </div>

    </UserContext.Provider>
  )
};

export default MyApp
