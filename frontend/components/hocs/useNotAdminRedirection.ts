import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { AuthContext } from '../stores/AuthContext';

const useNotAdminRedirection = () => {
    const {
        state: { isInitialized, isLoggedIn, user },
    } = useContext(AuthContext);

    useEffect(() => {
        if (isInitialized && (!isLoggedIn || (user && !user.isAdmin))) {
            Router.push('/login');
        }
    }, [isLoggedIn, isInitialized, user]);
};

export default useNotAdminRedirection;
