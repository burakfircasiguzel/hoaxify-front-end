import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    console.log(props);
    let message = 'We cannot edit';
    if(pathUsername === props.loggedInUsername){
        message = 'We can edit';
    }
    return (
        <div>
           <p>{message}</p> 
        </div>
    );
};
const mapsStateToProps = (store) =>{
    return {
        loggedInUsername: store.username
    }
}


export default connect(mapsStateToProps)(withRouter(ProfileCard));