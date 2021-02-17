import React from 'react';
import {Redirect} from "react-router-dom";

export default function CTodo(props) {
    const {user} = props
    return(
        <div>
            {user ? (
                <h2>Todo</h2>
    
            ) : (
                <Redirect to="/login" />
            )}
        </div>
    );
}