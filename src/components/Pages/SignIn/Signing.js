import React from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user-slice';
import CreateAccount from './CreateAccount';

const Signing = () => {
    const dispatch = useDispatch()
    
    const onSignUpHandler = (newUser) => {
        dispatch(userActions.addUser(newUser));
    };

    return (
        <div>
            <CreateAccount onSignUp={onSignUpHandler}/>
        </div>
    );
};

export default Signing;