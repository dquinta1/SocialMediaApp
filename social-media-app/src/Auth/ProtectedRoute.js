import React from 'react';
import { Redirect, Route } from 'react-router';
import auth from './utils/auth';

const ProtectedRoute = ({children, ...rest}) => {

    // let test = <Route {...rest} render={children} />;
    // let redi = <Redirect to={{
    //                     pathname: '/'
    //                 }} />;

    return (
        <Route
         {...rest} 
         render= {
             ({ location }) => auth.isAuthenticated ? 
             (children) : 
             (
                 <Redirect 
                    to={{
                        pathname: '/',
                        state: { from: location }
                    }}
                />
             )
         }
         />

        // (auth.isAuthenticated() ? test : redi)
    )
}

// const ProtectedRoute = ({
//     component: Component,
//     ...rest
//   }) => {
//     return (
//       <Route
//         {...rest}
//         render={props => {
//           if (auth.isAuthenticated()) {
//             return <Component {...props} />;
//           } else {
//             return (
//               <Redirect
//                 to={{
//                   pathname: "/",
//                   state: {
//                     from: props.location
//                   }
//                 }}
//               />
//             );
//           }
//         }}
//       />
//     );
//   };
  

export default ProtectedRoute;
