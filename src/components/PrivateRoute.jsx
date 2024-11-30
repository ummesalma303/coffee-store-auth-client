import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = () => {
    const {loader}=useContext(AuthContext)
    loader&&<h2 className='text-4xl'>Loading</h2>
    return (
        <div>
            
        </div>
    );
};

export default PrivateRoute;