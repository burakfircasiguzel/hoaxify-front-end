import React, { Component } from 'react';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
import { login } from '../api/apiCalls';

import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';

class LoginPage extends Component {

    state = {
        username: null,
        password: null,
        error: null
    }


    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: null
        });
        // console.log(event.target.value);
    }

    onClickLogin = async event => {
        event.preventDefault();
        const { username, password } = this.state;
        const creds = {
            username,
            password
        }
        this.setState({
            error: null
        });
        try {
            await login(creds);
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            });
        }

    }

    render() {
        const { t, pendingApiCall } = this.props;
        const { username, password } = this.state;
        const buttonEnabled = username && password;

        return (
            <div className="container">
                <form>
                    <h1 className='text-center'>{t('Login')}</h1>
                    <Input label={t('Username')} name="username" onChange={this.onChange} />
                    <Input label={t('Password')} name="password" type="password" onChange={this.onChange} />
                    {this.state.error && <div className="alert alert-danger mt-2" role="alert">
                        {this.state.error}
                    </div>}
                    <div className="text-center mt-2">
                        <ButtonWithProgress 
                        disabled={!buttonEnabled || pendingApiCall} 
                        onClick={this.onClickLogin}
                        pendingApiCall = {pendingApiCall}
                        text = {t('Login')}
                        />
                    </div>
                </form>
            </div>
        );
    }
}
const LoginPageApiProgress = withApiProgress(LoginPage, '/auth');
const LoginPageTranslation = withTranslation()(LoginPageApiProgress);


export default LoginPageTranslation;