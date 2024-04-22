import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CreateQuiz from './CreateQuiz';


const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <>
            {isAuthenticated && (
                <>
                    <p style={{border: '2px solid red', padding: '5px'}}>User Id is {user.sub}</p>
                    <CreateQuiz userId={user.sub}/>
                </>
            )}
        </>
    );
};

export default Profile;
