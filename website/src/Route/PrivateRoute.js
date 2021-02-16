import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth'

export default function PrivateRoute({component: Component, ...rest}) {
    const iSAuthenticated = useAuth();

    return (
        <Route 
        {...rest} 
        render={(props) => iSAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to="/login"/>
        )}
        />
    );
}