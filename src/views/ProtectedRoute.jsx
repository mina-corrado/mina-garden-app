import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/Context';

const ProtectedRoute = ({children}) => {
    const {user} = useContext(UserContext);
    let location = useLocation();

    if(!user || !user.isAdmin) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    return children

};

export default ProtectedRoute;