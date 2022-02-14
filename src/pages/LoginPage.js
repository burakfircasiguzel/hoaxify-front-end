import React, { Component } from 'react';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
import { login } from '../api/apiCalls';
import { connect } from 'react-redux';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import { loginSuccess } from '../redux/authActions';


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

        const { push } = this.props.history;

        this.setState({
            error: null
        });
        try {
            const response = await login(creds);
            push('/');

            const authState = {
                ...response.data,
                password
            };
            this.props.onLoginSuccess(authState);

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
                            pendingApiCall={pendingApiCall}
                            text={t('Login')}
                        />
                    </div>
                </form>
            </div>
        );
    }
}
const LoginPageApiProgress = withApiProgress(LoginPage, '/auth');
const LoginPageTranslation = withTranslation()(LoginPageApiProgress);

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginSuccess: function (authState) {
            return dispatch (loginSuccess(authState));
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginPageTranslation);