import React from 'react'
import auth from './utils/auth';

const MockMain = (props) => {

    let logout = () => {
        auth.logout( () => {
            props.history.push('/');
        })
    }

    return (
        <div>
            <h1>Fake Main</h1>
            <button id='btn-logout' className='logout-btn' onClick= { logout }>
                Sign Out
            </button>
        </div>
    )
}

export default MockMain;