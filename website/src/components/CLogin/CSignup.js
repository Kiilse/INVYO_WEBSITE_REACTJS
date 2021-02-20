import React/*, { useState }*/ from 'react';
import { Link  } from 'react-router-dom';

import './authForm.css'

export default function Signup() {
  return(
    <div className="card">
      <div className="form">
      </div>
      <Link to="/login">Already have an account?</Link>
    </div>
  );
}