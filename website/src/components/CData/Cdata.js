import React from 'react';
import {Redirect} from "react-router-dom";
export default function CData(props) {
    const {user} = props
    return(
        <div>
            {user ? (
                <h2>Data</h2>
    
            ) : (
                <Redirect to="/login" />
            )}
        </div>
    );
}