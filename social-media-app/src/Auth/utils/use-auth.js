import React, { createContext, useContext, useState } from "react";

// TODO: Add server credentials here

// firebase.initializeApp({
//     apiKey: "",
//     authDomain: "",
//     projectId: "",
//     appID: "",
//   });

const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };
  
  /** For more details on
   * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
   * refer to: https://usehooks.com/useAuth/
   */
  const authContext = createContext();
  
  export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
    );
  }
  
  export function useAuth() {
    return useContext(authContext);
  }
  
  export function useProvideAuth() {
    const [user, setUser] = useState(null);
  
    const signin = cb => {
      return fakeAuth.signin(() => {
        setUser("user");
        cb();
      });
    };
  
    const signout = cb => {
      return fakeAuth.signout(() => {
        setUser(null);
        cb();
      });
    };
  
    return {
      user,
      signin,
      signout
    };
  }