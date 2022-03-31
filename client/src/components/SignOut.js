import React from 'react';
import { useNavigate, Redirect } from 'react-router-dom';

export default function UserSignOut({context}) {
    
    context.actions.signOut();
    return (useNavigate('/'));
}