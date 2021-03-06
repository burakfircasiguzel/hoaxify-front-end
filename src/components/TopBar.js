import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../assets/hoaxify.png';
import { connect } from 'react-redux';
import {logoutSuccess} from '../redux/authActions';


class TopBar extends Component {


    render() {
        //console.log(this.props);
        const { t, username, isLoggedIn, onLogoutSuccess } = this.props;
        
        let links = (<ul className="navbar-nav ms-auto">
            <li>
                <Link className='nav-link' to="/login">
                    {t('Login')}
                </Link>
            </li>

            <li>
                <Link className='nav-link' to="/signup">
                    {t('Sign Up')}
                </Link>
            </li>
        </ul>);
        if (isLoggedIn) {
            links = (
                <ul className="navbar-nav ms-auto">
                    <li >
                        <Link className='nav-link' to={`/user/${username}`}>
                            {username}
                        </Link>
                    </li>
                    <li className='nav-link' onClick={onLogoutSuccess} style={{cursor:'pointer'}}>
                        {t('Logout')}
                    </li>
                </ul>
            );
        }

        return (
            <div className="shadow-sm bg-light mb-2">
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} className="img" width="60" alt='logo'></img>
                        Hoaxify
                    </Link>

                    {links}


                </nav>
            </div>
        );
    }
}
const TopBarWithTranslation = withTranslation()(TopBar);

const mapsStateToProps = (store) =>{
    return {
        isLoggedIn: store.isLoggedIn,
        username: store.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutSuccess: () => {
            return dispatch(logoutSuccess());
        }
    };
}

export default connect(mapsStateToProps, mapDispatchToProps)(TopBarWithTranslation);
